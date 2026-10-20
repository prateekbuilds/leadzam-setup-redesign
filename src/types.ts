// Answers from LeadZam's onboarding screen ("What do you want to get done first?")
export type Goal =
  | 'see-what-is-working'
  | 'capture-website-leads'
  | 'follow-up-faster'
  | 'organise-pipeline'
  | 'team-working-together'

// Answers from "How many people will work leads here?"
export type TeamSize = 'just-me' | '2-5' | '6-20' | '21-50' | '50+'

export interface Persona {
  goal: Goal
  teamSize: TeamSize
}

// How a step gets done when the user clicks its main button.
// 'add-lead' opens the Add lead dialog; 'simulated' fakes the real action
// (in production this would navigate to the real page).
export type StepAction = 'add-lead' | 'simulated'

export interface SetupStep {
  id: string
  title: string
  reason: string // why this step matters, shown while pending
  outcome: string // what was achieved, shown once done
  minutes: number
  actionLabel: string
  action: StepAction
  teamOnly?: boolean // hidden when the user works alone
}

// Status of the check that finds out which steps are already done.
export type CheckStatus = 'loading' | 'ready' | 'error'

// The row's visual state. "recommended" is not stored: it is derived as
// the first step that isn't done, so there is only ever one.
export type StepStatus = 'recommended' | 'pending' | 'done'

export interface ToastMessage {
  id: number
  text: string
}
