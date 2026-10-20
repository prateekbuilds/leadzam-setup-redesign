import { useState } from 'react'
import { FULL_GUIDE_STEP_COUNT, GOAL_LABELS } from '../data/setupSteps'
import type { StepWithStatus } from '../hooks/useSetupGuide'
import type { CheckStatus, Goal } from '../types'
import { Button } from './Button'
import { AlertCircle, StatusDone } from './icons'
import { ProgressBar } from './ProgressBar'
import { SetupStepRow } from './SetupStepRow'

interface SetupCardProps {
  goal: Goal
  steps: StepWithStatus[]
  doneCount: number
  totalMinutes: number
  allDone: boolean
  checkStatus: CheckStatus
  onRetryCheck: () => void
  onAction: (step: StepWithStatus) => Promise<void> | void
  onMarkDone: (id: string) => void
  onHide: () => void
  onRemove: () => void
}

export function SetupCard(props: SetupCardProps) {
  const { goal, steps, doneCount, totalMinutes, allDone, checkStatus } = props
  const recommendedId = steps.find((s) => s.status === 'recommended')?.id

  // The recommended step is open by default. If the user opens another row,
  // that choice only lasts until the recommendation moves on.
  const [opened, setOpened] = useState<{ forRecommended?: string; id: string | null }>({ id: null })
  const expandedId = opened.forRecommended === recommendedId ? opened.id : (recommendedId ?? null)

  function toggle(id: string) {
    setOpened({ forRecommended: recommendedId, id: expandedId === id ? null : id })
  }

  return (
    <section
      aria-labelledby="setup-card-title"
      className="flex flex-col gap-5 rounded-xl border border-border bg-surface p-5 sm:p-6"
    >
      <header className="flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <h2 id="setup-card-title" className="flex items-center gap-2 text-lg font-semibold">
            {allDone && <StatusDone size={22} />}
            {allDone ? "You're all set" : 'Get started with LeadZam'}
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            {allDone
              ? `All ${steps.length} steps are done. Your reports will fill in as leads come in.`
              : `Because you want to ${GOAL_LABELS[goal]}, start here. ${steps.length} short steps, about ${totalMinutes} minutes.`}
          </p>
        </div>
        {!allDone && (
          <Button variant="text" onClick={props.onHide} className="-mt-2 -mr-2 shrink-0">
            Hide
          </Button>
        )}
      </header>

      {checkStatus === 'loading' ? (
        <LoadingRows count={steps.length || 4} />
      ) : (
        <>
          <ProgressBar done={doneCount} total={steps.length} complete={allDone} />

          {checkStatus === 'error' && (
            <div role="alert" className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-border bg-background px-4 py-3 text-sm">
              <AlertCircle size={18} className="shrink-0 text-text-muted" />
              <span className="min-w-0 flex-1">
                We couldn't check your progress automatically. You can still mark steps as done.
              </span>
              <Button variant="text" onClick={props.onRetryCheck}>Try again</Button>
            </div>
          )}

          <ul className="flex flex-col gap-2" aria-label="Setup steps">
            {steps.map((step) => (
              <SetupStepRow
                key={step.id}
                step={step}
                expanded={expandedId === step.id}
                onToggle={() => toggle(step.id)}
                onAction={props.onAction}
                onMarkDone={props.onMarkDone}
              />
            ))}
          </ul>
        </>
      )}

      {allDone ? (
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" onClick={props.onRemove}>Remove this card</Button>
          <Button variant="text">Invite a teammate when you're ready</Button>
        </div>
      ) : (
        <div>
          <Button variant="text" className="-ml-2">
            See all setup steps ({FULL_GUIDE_STEP_COUNT}) →
          </Button>
        </div>
      )}
    </section>
  )
}

function LoadingRows({ count }: { count: number }) {
  return (
    <div role="status" aria-live="polite" className="flex flex-col gap-2">
      <span className="sr-only">Checking your setup progress…</span>
      <div className="h-4 w-24 animate-pulse rounded bg-border" />
      <div className="h-1.5 w-full animate-pulse rounded-full bg-border" />
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="flex items-start gap-3 rounded-[10px] border border-border p-4">
          <div className="size-5 shrink-0 animate-pulse rounded-full bg-border" />
          <div className="flex flex-1 flex-col gap-2">
            <div className="h-3.5 w-1/3 animate-pulse rounded bg-border" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-border" />
          </div>
        </div>
      ))}
    </div>
  )
}
