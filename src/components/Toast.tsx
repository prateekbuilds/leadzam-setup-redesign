import type { ToastMessage } from '../types'
import { StatusDone, X } from './icons'

interface ToastProps {
  toast: ToastMessage | null
  onDismiss: () => void
}

// The live region stays mounted so screen readers announce each new message.
export function Toast({ toast, onDismiss }: ToastProps) {
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex justify-center sm:inset-x-auto sm:right-6 sm:bottom-6">
      {toast && (
        <div
          key={toast.id}
          className="pointer-events-auto flex max-w-md items-center gap-3 rounded-[10px] border border-success bg-success-light py-2 pr-2 pl-4 shadow-lg"
        >
          <StatusDone />
          <p className="flex-1 text-sm font-medium">{toast.text}</p>
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss message"
            className="grid size-9 cursor-pointer place-items-center rounded-md text-text-muted hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-primary"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
