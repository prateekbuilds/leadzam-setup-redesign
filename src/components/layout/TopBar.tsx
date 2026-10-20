import { Bell, Clock, Home, Menu, Moon, Sparkle } from '../icons'

interface TopBarProps {
  doneCount: number
  total: number
  showSetupPill: boolean
  onOpenSetup: () => void
}

// The setup pill always keeps its label ("Setup · 1 of 4"), unlike today's bare "0/22" on mobile.
export function TopBar({ doneCount, total, showSetupPill, onOpenSetup }: TopBarProps) {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-border bg-surface px-4 md:h-16 md:px-8">
      <div className="flex items-center gap-2 text-sm">
        <button type="button" aria-label="Open menu" className="grid size-10 place-items-center rounded-md text-[#344054] md:hidden">
          <Menu size={22} />
        </button>
        <span className="hidden items-center gap-2 md:flex">
          <Home size={16} className="text-text-muted" />
          <span className="text-text-muted" aria-hidden="true">›</span>
          <span className="font-medium">Admin Dashboard</span>
        </span>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        {showSetupPill && (
          <button
            type="button"
            onClick={onOpenSetup}
            className="flex cursor-pointer items-center gap-1.5 rounded-full border border-primary-border bg-primary-light px-3 py-1.5 text-xs font-medium text-primary hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Sparkle size={14} />
            Setup · {doneCount} of {total}
          </button>
        )}
        <span className="hidden text-[#475467] md:inline"><Moon size={20} /></span>
        <span className="hidden text-[#475467] md:inline"><Clock size={20} /></span>
        <button type="button" aria-label="Notifications" className="grid size-10 place-items-center rounded-md text-[#475467]">
          <Bell size={20} />
        </button>
      </div>
    </header>
  )
}
