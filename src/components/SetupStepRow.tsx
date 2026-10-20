import { useState } from 'react'
import type { StepWithStatus } from '../hooks/useSetupGuide'
import { Button } from './Button'
import { ChevronDown, ChevronRight, Clock, StatusDone, StatusPending, StatusRecommended } from './icons'

interface SetupStepRowProps {
  step: StepWithStatus
  expanded: boolean
  onToggle: () => void
  onAction: (step: StepWithStatus) => Promise<void> | void
  onMarkDone: (id: string) => void
}

// Matches the Figma "Setup step" component: Status = Recommended | Not started | Done.
// The whole header is one button, so the click target is the full row.
export function SetupStepRow({ step, expanded, onToggle, onAction, onMarkDone }: SetupStepRowProps) {
  const [busy, setBusy] = useState(false)
  const isDone = step.status === 'done'
  const isRecommended = step.status === 'recommended'
  const panelId = `step-panel-${step.id}`

  async function handleAction() {
    setBusy(true)
    try {
      await onAction(step)
    } finally {
      setBusy(false)
    }
  }

  const rowStyle = isRecommended
    ? 'bg-primary-light border-primary-border'
    : 'bg-surface border-border'

  if (isDone) {
    return (
      <li className={`flex items-start gap-3 rounded-[10px] border p-4 ${rowStyle}`}>
        <span className="mt-0.5 shrink-0"><StatusDone /></span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-text-muted">
            {step.title}
            <span className="sr-only"> (done)</span>
          </p>
          <p className="mt-1 text-[13px] text-text-muted">{step.outcome}</p>
        </div>
        <span className="shrink-0 rounded-full bg-success-light px-2 py-0.5 text-xs font-medium text-success-text" aria-hidden="true">
          Done
        </span>
      </li>
    )
  }

  return (
    <li className={`rounded-[10px] border ${rowStyle}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={panelId}
        className="flex w-full cursor-pointer items-start gap-3 rounded-[10px] p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span className="mt-0.5 shrink-0">{isRecommended ? <StatusRecommended /> : <StatusPending />}</span>
        <span className="min-w-0 flex-1">
          {isRecommended && (
            <span className="mb-1 block text-[11px] font-semibold tracking-wide text-primary uppercase">
              Recommended next
            </span>
          )}
          <span className="block text-sm font-medium text-text">{step.title}</span>
          <span className="mt-1 block text-[13px] text-text-muted">{step.reason}</span>
          <span className="mt-1 flex items-center gap-1 text-xs font-medium text-text-muted">
            <Clock size={14} />
            {step.minutes} min
          </span>
        </span>
        <span className="mt-0.5 shrink-0 text-text-muted">
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </span>
      </button>

      {expanded && (
        <div id={panelId} className="flex flex-wrap items-center gap-2 px-4 pb-4 pl-12">
          <Button variant={isRecommended ? 'primary' : 'secondary'} loading={busy} onClick={handleAction}>
            {step.actionLabel}
          </Button>
          <Button variant="text" onClick={() => onMarkDone(step.id)} disabled={busy}>
            Already done? Mark as done
          </Button>
        </div>
      )}
    </li>
  )
}
