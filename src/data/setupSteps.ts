import type { Goal, SetupStep, TeamSize } from '../types'

// Shown in the card subtitle so the user can see why these steps were picked.
export const GOAL_LABELS: Record<Goal, string> = {
  'see-what-is-working': "see what's working",
  'capture-website-leads': 'capture leads from your website',
  'follow-up-faster': 'follow up faster',
  'organise-pipeline': 'organise your pipeline',
  'team-working-together': 'get your team working together',
}

export const TEAM_SIZE_LABELS: Record<TeamSize, string> = {
  'just-me': 'Just me',
  '2-5': '2–5 people',
  '6-20': '6–20 people',
  '21-50': '21–50 people',
  '50+': 'More than 50',
}

// The full LeadZam guide has 22 steps. These are the few that matter first
// for each goal. Everything else stays behind "See all setup steps".
export const STEPS_BY_GOAL: Record<Goal, SetupStep[]> = {
  'see-what-is-working': [
    {
      id: 'add-lead',
      title: 'Add your first lead',
      reason: 'Reports need at least one lead to show anything',
      outcome: '1 lead added',
      minutes: 2,
      actionLabel: 'Add your first lead',
      action: 'add-lead',
    },
    {
      id: 'connect-source',
      title: 'Connect a lead source',
      reason: 'Bring in leads from Meta, Google or your website',
      outcome: 'Website form connected',
      minutes: 5,
      actionLabel: 'Connect a source',
      action: 'simulated',
    },
    {
      id: 'set-stages',
      title: 'Set your pipeline stages',
      reason: 'Tells reports where each lead stands',
      outcome: 'Pipeline stages set',
      minutes: 3,
      actionLabel: 'Set up stages',
      action: 'simulated',
    },
    {
      id: 'assign-lead',
      title: 'Assign a lead to a teammate',
      reason: 'See which rep is working which lead',
      outcome: 'Lead assigned',
      minutes: 2,
      actionLabel: 'Assign a lead',
      action: 'simulated',
      teamOnly: true,
    },
    {
      id: 'save-view',
      title: 'Save your first report view',
      reason: 'See your key numbers in one click',
      outcome: '1 view saved',
      minutes: 2,
      actionLabel: 'Create a view',
      action: 'simulated',
    },
  ],
  'capture-website-leads': [
    {
      id: 'create-form',
      title: 'Create a form',
      reason: 'Collect name, phone and the questions you care about',
      outcome: 'Form created',
      minutes: 4,
      actionLabel: 'Create a form',
      action: 'simulated',
    },
    {
      id: 'embed-form',
      title: 'Put it on your website',
      reason: 'Copy one snippet into your site',
      outcome: 'Form added to website',
      minutes: 3,
      actionLabel: 'Get the snippet',
      action: 'simulated',
    },
    {
      id: 'test-submission',
      title: 'Send a test submission',
      reason: 'Check a lead lands in LeadZam',
      outcome: 'Test lead received',
      minutes: 1,
      actionLabel: 'Send a test',
      action: 'simulated',
    },
    {
      id: 'auto-assign',
      title: 'Set who gets new leads',
      reason: 'New leads go straight to the right rep',
      outcome: 'Auto-assignment on',
      minutes: 2,
      actionLabel: 'Set up assignment',
      action: 'simulated',
      teamOnly: true,
    },
  ],
  'follow-up-faster': [
    {
      id: 'add-lead',
      title: 'Add your first lead',
      reason: 'You need a lead to follow up with',
      outcome: '1 lead added',
      minutes: 2,
      actionLabel: 'Add your first lead',
      action: 'add-lead',
    },
    {
      id: 'set-reminder',
      title: 'Set a follow-up reminder',
      reason: 'Never miss a callback',
      outcome: 'Reminder set',
      minutes: 1,
      actionLabel: 'Set a reminder',
      action: 'simulated',
    },
    {
      id: 'connect-whatsapp',
      title: 'Connect WhatsApp',
      reason: 'Reply to leads where they already are',
      outcome: 'WhatsApp connected',
      minutes: 5,
      actionLabel: 'Connect WhatsApp',
      action: 'simulated',
    },
    {
      id: 'install-calls',
      title: 'Install the calls app',
      reason: 'Log calls and recordings automatically',
      outcome: 'Calls app installed',
      minutes: 4,
      actionLabel: 'Get the app',
      action: 'simulated',
    },
  ],
  'organise-pipeline': [
    {
      id: 'review-stages',
      title: 'Review your stages',
      reason: 'Match the pipeline to how you actually sell',
      outcome: 'Stages reviewed',
      minutes: 3,
      actionLabel: 'Review stages',
      action: 'simulated',
    },
    {
      id: 'add-lead',
      title: 'Add your first lead',
      reason: 'Put a real lead into the pipeline',
      outcome: '1 lead added',
      minutes: 2,
      actionLabel: 'Add your first lead',
      action: 'add-lead',
    },
    {
      id: 'move-lead',
      title: 'Move a lead to the next stage',
      reason: 'See how progress is tracked',
      outcome: 'Lead moved',
      minutes: 1,
      actionLabel: 'Move a lead',
      action: 'simulated',
    },
    {
      id: 'save-view',
      title: 'Save a pipeline view',
      reason: 'Open your pipeline in one click',
      outcome: '1 view saved',
      minutes: 2,
      actionLabel: 'Save a view',
      action: 'simulated',
    },
  ],
  'team-working-together': [
    {
      id: 'invite-teammate',
      title: 'Invite a teammate',
      reason: 'Work leads together in one place',
      outcome: 'Teammate invited',
      minutes: 2,
      actionLabel: 'Invite a teammate',
      action: 'simulated',
    },
    {
      id: 'set-roles',
      title: 'Set roles',
      reason: 'Control who can see and change what',
      outcome: 'Roles set',
      minutes: 3,
      actionLabel: 'Set roles',
      action: 'simulated',
    },
    {
      id: 'add-lead',
      title: 'Add your first lead',
      reason: 'Give the team something to work on',
      outcome: '1 lead added',
      minutes: 2,
      actionLabel: 'Add your first lead',
      action: 'add-lead',
    },
    {
      id: 'auto-assign',
      title: 'Turn on auto-assignment',
      reason: 'Spread new leads across the team',
      outcome: 'Auto-assignment on',
      minutes: 2,
      actionLabel: 'Turn it on',
      action: 'simulated',
    },
  ],
}

export const FULL_GUIDE_STEP_COUNT = 22

// Picks the steps for this user: their goal decides the list,
// and team-only steps are dropped when they work alone.
export function getStepsFor(goal: Goal, teamSize: TeamSize): SetupStep[] {
  return STEPS_BY_GOAL[goal].filter((step) => !(step.teamOnly && teamSize === 'just-me'))
}
