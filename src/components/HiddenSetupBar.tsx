import { Button } from './Button'
import { EyeOff } from './icons'

interface HiddenSetupBarProps {
  doneCount: number
  total: number
  onUndo: () => void
}

// Replaces today's X, which hides setup with no undo and no hint where it went.
export function HiddenSetupBar({ doneCount, total, onUndo }: HiddenSetupBarProps) {
  return (
    <div
      role="status"
      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface px-5 py-3"
    >
      <p className="flex items-center gap-2.5 text-sm">
        <EyeOff size={18} className="shrink-0 text-text-muted" />
        <span>
          Setup guide hidden. Reopen it anytime from “Setup · {doneCount} of {total}” in the header.
        </span>
      </p>
      <Button variant="secondary" onClick={onUndo} className="py-1.5">
        Undo
      </Button>
    </div>
  )
}
