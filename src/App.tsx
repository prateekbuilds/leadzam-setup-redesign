import { useRef, useState } from 'react'
import { AddLeadDialog } from './components/AddLeadDialog'
import { DemoControls } from './components/DemoControls'
import { HiddenSetupBar } from './components/HiddenSetupBar'
import { Clock } from './components/icons'
import { Sidebar } from './components/layout/Sidebar'
import { TopBar } from './components/layout/TopBar'
import { SetupCard } from './components/SetupCard'
import { Toast } from './components/Toast'
import { useSetupGuide, type StepWithStatus } from './hooks/useSetupGuide'
import type { Persona } from './types'

export default function App() {
  // Default persona matches the audit: "See what is working" + "Just me".
  const [persona, setPersona] = useState<Persona>({ goal: 'see-what-is-working', teamSize: 'just-me' })
  const [simulateCheckError, setSimulateCheckError] = useState(false)
  const [addLeadOpen, setAddLeadOpen] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const guide = useSetupGuide({ persona, simulateCheckError })
  const addLeadStep = guide.steps.find((s) => s.action === 'add-lead')

  // Clicking a step's main button does the real action.
  // Here "Add your first lead" opens a real form; other actions are simulated.
  async function handleStepAction(step: StepWithStatus) {
    if (step.action === 'add-lead') {
      setAddLeadOpen(true)
      return
    }
    await new Promise((resolve) => setTimeout(resolve, 900))
    guide.completeStep(step.id, 'auto')
  }

  // A lead added from anywhere (sidebar or the guide) ticks the step automatically.
  function handleLeadAdded() {
    setAddLeadOpen(false)
    if (addLeadStep && addLeadStep.status !== 'done') guide.completeStep(addLeadStep.id, 'auto')
  }

  function openSetup() {
    guide.show()
    requestAnimationFrame(() => {
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      cardRef.current?.querySelector<HTMLElement>('h2')?.focus()
    })
  }

  return (
    <div className="flex min-h-screen">
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-surface px-3 py-2 focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      <Sidebar onAddLead={() => setAddLeadOpen(true)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          doneCount={guide.doneCount}
          total={guide.steps.length}
          showSetupPill={!guide.removed}
          onOpenSetup={openSetup}
        />

        <main id="main" className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 pb-24 md:px-10 md:py-8 md:pb-24">
          <div ref={cardRef} className="scroll-mt-20 [&_h2]:outline-none">
            {!guide.removed &&
              (guide.hidden ? (
                <HiddenSetupBar doneCount={guide.doneCount} total={guide.steps.length} onUndo={guide.show} />
              ) : (
                <SetupCard
                  goal={persona.goal}
                  steps={guide.steps}
                  doneCount={guide.doneCount}
                  totalMinutes={guide.totalMinutes}
                  allDone={guide.allDone}
                  checkStatus={guide.checkStatus}
                  onRetryCheck={guide.retryCheck}
                  onAction={handleStepAction}
                  onMarkDone={(id) => guide.completeStep(id, 'manual')}
                  onHide={guide.hide}
                  onRemove={guide.remove}
                />
              ))}
          </div>

          <DashboardContext />
        </main>
      </div>

      <AddLeadDialog open={addLeadOpen} onClose={() => setAddLeadOpen(false)} onAdded={handleLeadAdded} />
      <Toast toast={guide.toast} onDismiss={guide.dismissToast} />
      <DemoControls
        persona={persona}
        onPersonaChange={setPersona}
        simulateCheckError={simulateCheckError}
        onSimulateCheckErrorChange={setSimulateCheckError}
        onReset={guide.reset}
      />
    </div>
  )
}

// The rest of LeadZam's dashboard, unchanged in this redesign.
function DashboardContext() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-text-muted">Good afternoon, Prateek. Your team's key reports at a glance.</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-lg border border-primary-border bg-primary-light px-3.5 py-2 text-xs font-medium text-primary">
          <Clock size={16} />
          CRM trial · 14 days left
        </span>
      </div>
      <section
        aria-label="Reports (existing, unchanged)"
        className="grid min-h-48 place-items-center rounded-xl border border-dashed border-border-strong bg-surface p-6 text-center"
      >
        <div>
          <p className="text-sm font-medium">Pin the reports you check most</p>
          <p className="mt-1 text-[13px] text-text-muted">Existing LeadZam reports area, unchanged in this redesign</p>
        </div>
      </section>
    </>
  )
}
