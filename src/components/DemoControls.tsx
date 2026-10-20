import { useState } from 'react'
import { GOAL_LABELS, TEAM_SIZE_LABELS } from '../data/setupSteps'
import type { Goal, Persona, TeamSize } from '../types'
import { Settings } from './icons'

interface DemoControlsProps {
  persona: Persona
  onPersonaChange: (persona: Persona) => void
  simulateCheckError: boolean
  onSimulateCheckErrorChange: (value: boolean) => void
  onReset: () => void
}

// Prototype-only panel so reviewers can try other onboarding answers and edge states.
// Not part of the product design.
export function DemoControls(props: DemoControlsProps) {
  const [open, setOpen] = useState(false)
  const { persona } = props

  return (
    <div className="fixed bottom-4 left-4 z-40 md:left-[126px]">
      {open && (
        <div
          id="demo-panel"
          className="mb-2 flex w-72 flex-col gap-3 rounded-xl border border-dashed border-border-strong bg-surface p-4 text-sm shadow-lg"
        >
          <p className="text-xs font-semibold tracking-wide text-text-muted uppercase">Prototype controls</p>
          <label className="flex flex-col gap-1">
            <span className="font-medium">Onboarding goal</span>
            <select
              value={persona.goal}
              onChange={(e) => props.onPersonaChange({ ...persona, goal: e.target.value as Goal })}
              className="rounded-lg border border-border-strong px-2 py-2"
            >
              {(Object.keys(GOAL_LABELS) as Goal[]).map((goal) => (
                <option key={goal} value={goal}>
                  {GOAL_LABELS[goal].charAt(0).toUpperCase() + GOAL_LABELS[goal].slice(1)}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-medium">Team size</span>
            <select
              value={persona.teamSize}
              onChange={(e) => props.onPersonaChange({ ...persona, teamSize: e.target.value as TeamSize })}
              className="rounded-lg border border-border-strong px-2 py-2"
            >
              {(Object.keys(TEAM_SIZE_LABELS) as TeamSize[]).map((size) => (
                <option key={size} value={size}>{TEAM_SIZE_LABELS[size]}</option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={props.simulateCheckError}
              onChange={(e) => props.onSimulateCheckErrorChange(e.target.checked)}
              className="size-4 accent-primary"
            />
            Simulate a failed progress check
          </label>
          <button
            type="button"
            onClick={props.onReset}
            className="cursor-pointer rounded-lg border border-border-strong px-3 py-2 font-medium hover:bg-background"
          >
            Reset setup progress
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="demo-panel"
        className="flex cursor-pointer items-center gap-2 rounded-full border border-dashed border-border-strong bg-surface px-3 py-2 text-xs font-medium text-text-muted shadow-sm hover:text-text focus-visible:outline-2 focus-visible:outline-primary"
      >
        <Settings size={14} />
        {open ? 'Close controls' : 'Prototype controls'}
      </button>
    </div>
  )
}
