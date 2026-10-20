import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getStepsFor } from '../data/setupSteps'
import type { CheckStatus, Persona, SetupStep, StepStatus, ToastMessage } from '../types'

const STORAGE_KEY = 'leadzam-setup-guide'

interface SavedState {
  completedIds: string[]
  hidden: boolean
  removed: boolean
}

const EMPTY: SavedState = { completedIds: [], hidden: false, removed: false }

// localStorage can throw (private mode, blocked storage), so every access is guarded.
function loadSaved(): SavedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY
  } catch {
    return EMPTY
  }
}

function save(state: SavedState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Not critical: the guide still works for this session.
  }
}

export interface StepWithStatus extends SetupStep {
  status: StepStatus
}

interface Options {
  persona: Persona
  simulateCheckError: boolean
}

// All setup-guide state and actions live here, so the UI components
// only render what they are given.
export function useSetupGuide({ persona, simulateCheckError }: Options) {
  const [saved, setSaved] = useState<SavedState>(loadSaved)
  const [checkStatus, setCheckStatus] = useState<CheckStatus>('loading')
  const [toast, setToast] = useState<ToastMessage | null>(null)
  const toastTimer = useRef<number | undefined>(undefined)

  useEffect(() => save(saved), [saved])

  // In production this asks the server which steps are already done
  // (lead count > 0, source connected, ...). Here it is simulated.
  const runCheck = useCallback(() => {
    setCheckStatus('loading')
    const timer = window.setTimeout(() => {
      setCheckStatus(simulateCheckError ? 'error' : 'ready')
    }, 700)
    return () => window.clearTimeout(timer)
  }, [simulateCheckError])

  useEffect(() => runCheck(), [runCheck, persona.goal, persona.teamSize])

  const steps: StepWithStatus[] = useMemo(() => {
    const list = getStepsFor(persona.goal, persona.teamSize)
    const firstPendingId = list.find((s) => !saved.completedIds.includes(s.id))?.id
    return list.map((step) => ({
      ...step,
      status: saved.completedIds.includes(step.id)
        ? 'done'
        : step.id === firstPendingId
          ? 'recommended'
          : 'pending',
    }))
  }, [persona.goal, persona.teamSize, saved.completedIds])

  const doneCount = steps.filter((s) => s.status === 'done').length
  const totalMinutes = steps.reduce((sum, s) => sum + s.minutes, 0)
  const allDone = steps.length > 0 && doneCount === steps.length

  const showToast = useCallback((text: string) => {
    window.clearTimeout(toastTimer.current)
    setToast({ id: Date.now(), text })
    toastTimer.current = window.setTimeout(() => setToast(null), 4000)
  }, [])

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  const completeStep = useCallback(
    (id: string, how: 'auto' | 'manual') => {
      const step = steps.find((s) => s.id === id)
      if (!step || step.status === 'done') return
      setSaved((prev) => ({ ...prev, completedIds: [...prev.completedIds, id] }))
      showToast(
        how === 'auto'
          ? `${step.outcome}. “${step.title}” is complete.`
          : `“${step.title}” marked as done.`,
      )
    },
    [steps, showToast],
  )

  const hide = useCallback(() => setSaved((prev) => ({ ...prev, hidden: true })), [])
  const show = useCallback(() => setSaved((prev) => ({ ...prev, hidden: false, removed: false })), [])
  const remove = useCallback(() => setSaved((prev) => ({ ...prev, removed: true })), [])
  const reset = useCallback(() => {
    setSaved(EMPTY)
    setToast(null)
  }, [])

  return {
    steps,
    doneCount,
    totalMinutes,
    allDone,
    checkStatus,
    retryCheck: runCheck,
    hidden: saved.hidden,
    removed: saved.removed,
    toast,
    dismissToast: () => setToast(null),
    completeStep,
    hide,
    show,
    remove,
    reset,
  }
}
