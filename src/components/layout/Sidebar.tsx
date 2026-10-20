import { Chart, Check, Clock, Flow, Home, LinkIcon, Message, Phone, Plus, Settings, Users } from '../icons'

// LeadZam's existing sidebar, recreated only for context. Not part of the redesign.
const NAV = [
  { label: 'Dashboard', Icon: Home, active: true },
  { label: 'All Leads', Icon: Users },
  { label: 'Follow-ups', Icon: Clock },
  { label: 'Calls', Icon: Phone },
  { label: 'WhatsApp', Icon: Message },
  { label: 'Reports', Icon: Chart },
  { label: 'Lead Sources', Icon: LinkIcon },
  { label: 'Automations', Icon: Flow },
  { label: 'Settings', Icon: Settings },
]

export function Sidebar({ onAddLead }: { onAddLead: () => void }) {
  return (
    <aside className="sticky top-0 hidden h-screen w-[110px] shrink-0 flex-col items-center justify-between border-r border-border bg-surface py-5 md:flex">
      <nav aria-label="Main" className="flex flex-col items-center gap-3.5">
        <Check size={28} className="text-primary" />
        <button
          type="button"
          onClick={onAddLead}
          className="flex cursor-pointer flex-col items-center gap-1 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <span className="rounded-lg bg-primary px-3.5 py-1.5 text-white"><Plus size={18} /></span>
          <span className="text-xs font-medium text-primary">Add Lead</span>
        </button>
        {NAV.map(({ label, Icon, active }) => (
          <a
            key={label}
            href="#"
            onClick={(e) => e.preventDefault()}
            aria-current={active ? 'page' : undefined}
            className="flex flex-col items-center gap-1 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span className={`rounded-lg px-3.5 py-1.5 ${active ? 'bg-primary-light text-primary' : 'text-[#475467]'}`}>
              <Icon size={18} />
            </span>
            <span className={`text-xs font-medium ${active ? 'text-primary' : 'text-text-muted'}`}>{label}</span>
          </a>
        ))}
      </nav>
      <span className="grid size-9 place-items-center rounded-full bg-primary text-[11px] font-semibold text-white" aria-hidden="true">
        PR
      </span>
    </aside>
  )
}
