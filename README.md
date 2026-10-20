# LeadZam · First-run setup guide redesign

UI/UX & Frontend Intern assignment for Team Variance, by Prateek Chauhan.

A working React + TypeScript prototype of one redesigned area of LeadZam: the setup guide a new trial user sees on their first visit.

- **Live demo:** _add Vercel link_
- **Figma:** _add Figma link_
- **UI/UX audit:** _add audit link_
- **Walkthrough video:** _add video link_

## The problem

When a new user finishes onboarding, LeadZam asks what they want to do first and promises to open the setup guide on that goal. Then:

- The dashboard checklist says **0 of 6 done**, while the header button says **0/22**. Two guides, two counts, no explanation.
- The checklist *is* tailored to the onboarding answer, but nothing on screen says so. I only noticed by making a second trial account.
- All steps look the same, so there's no clear first move, and the big sidebar "Add Lead" button competes with the list.
- Steps don't tick themselves. I added a pipeline stage in Settings and the guide still said 0.
- The X hides the checklist with no undo, and it comes back after a reload.

Full findings and priorities are in the audit.

## The redesign

One short setup card on the dashboard that:

- starts from the onboarding goal and **says so** ("Because you want to see what's working, start here")
- shows **one progress count**, the same in the card and the header pill
- highlights **one recommended next step** with its own button; the rest stay one click away
- shows **why each step matters** and **how long it takes**
- **ticks steps automatically** when the real action happens, with "Mark as done" as a fallback
- can be **hidden with Undo**, and reopened from the header pill
- has a clear **"You're all set"** end state
- keeps the full guide behind **"See all setup steps (22)"**

## Try it

| What to try | How |
| --- | --- |
| Main interaction | Click **Add your first lead**, submit the empty form to see inline errors, then add a dummy lead. The step ticks itself and the next one becomes recommended. |
| Auto-complete from elsewhere | Use the sidebar **Add Lead** button instead. The setup step still ticks, because adding a lead is what completes it. |
| Hide with undo | Click **Hide**, then **Undo**, or reopen from **Setup · x of 4** in the header. |
| All done | Finish every step, then **Remove this card**. |
| Other onboarding answers | Open **Prototype controls** (bottom left) and change the goal or team size. Team-only steps appear when you're not working alone. |
| Edge states | Loading skeleton shows on every load. In Prototype controls, tick **Simulate a failed progress check**. |
| Mobile | Resize to ~390 px. |

Progress is saved in `localStorage`. Use **Reset setup progress** in Prototype controls to start again.

## Run locally

Requires Node 20+.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check and production build
```

## How the code is organised

```
src/
  types.ts                 Goal, TeamSize, SetupStep, StepStatus types
  data/setupSteps.ts       Steps for each onboarding goal (mock data)
  hooks/useSetupGuide.ts   All guide state: progress, hide/undo, toast, loading/error check
  components/
    SetupCard.tsx          The card: header, progress, step list, all-done state
    SetupStepRow.tsx       One step (Recommended / Not started / Done), same as the Figma component
    ProgressBar.tsx        Accessible progress bar
    HiddenSetupBar.tsx     Hidden state with Undo
    AddLeadDialog.tsx      Add a lead, with inline validation
    Button.tsx             Primary / Secondary / Text, same as the Figma component
    Toast.tsx              Confirmation message (aria-live)
    DemoControls.tsx       Prototype-only controls, not part of the design
    layout/                Sidebar and top bar, recreated for context only
```

Decisions worth knowing:

- **"Recommended" is derived, not stored.** It's always the first step that isn't done, so there can only ever be one.
- **State lives in one hook.** Components only render what they're given, which keeps them easy to test and reuse.
- **Design tokens match Figma.** The colours in `src/index.css` use the same names as the Figma variables.
- **Real completion is simulated.** In production, "done" would come from workspace data (lead count above zero, a source connected, a saved view existing). Here, finishing a step's action marks it done.

## Accessibility

- Every step header is a real `<button>` with `aria-expanded`, so it works with keyboard and screen readers.
- The progress bar uses `role="progressbar"` with a text value ("1 of 4 setup steps done").
- Confirmations are announced through an `aria-live` region.
- Status isn't shown by colour alone: "Recommended next" and "Done" are written out.
- The add-lead form shows errors next to each field, links them with `aria-describedby`, and moves focus to the first problem.
- The dialog uses native `<dialog>`, which traps focus and closes on Esc.
- Primary blue was darkened from LeadZam's `#1677FF` to `#1570EF` so white button text passes WCAG AA (about 4.6:1).
- Visible focus outlines, a skip link, 44 px tap targets on small text buttons, and reduced motion respected.

## Explaining my thinking

**What is the biggest UX problem you found, and why?**
The first-run setup. It's the first thing every new user sees, and it decides whether they reach value during a 14-day trial. Two conflicting counts (6 and 22), invisible tailoring, no clear first step, and steps that don't track real progress make setup feel bigger and less trustworthy than it is.

**Why did you choose this problem over the others?**
It affects every new user, right on the trial-to-paid path. My second finding, Add Lead saving leads with no phone or email, is also high priority, but it mainly hurts teams already using the product, and its fix is a well-known validation pattern. I still applied that fix inside the prototype's Add lead dialog, since the first step uses it.

**What did you intentionally NOT redesign?**
The sidebar, header, reports area, onboarding questions, the Settings pages that steps link to, and the full 22-step guide. The sidebar and header are recreated only to show the card in context.

**What trade-offs did you make?**
- Showing 4 steps instead of 22 makes setup feel doable, but power users see less up front. The full guide stays one click away.
- One recommended step gives a clear path but suggests an order. Users can still open and do any step.
- In the prototype, "done" is simulated. A real version needs a backend check per step.

**How does your redesign improve the user's task?**
A new user immediately knows what to do first, why it matters, and how long it takes. Progress reflects what they actually did, the count never contradicts itself, and hiding the guide is safe and reversible.

**What would you validate with users or data before shipping?**
- A quick usability test with five new users: do they know what to do within the first minute, without help?
- Today's baseline for the share of new users who complete a first step in their first session, and time from signup to first lead.
- After shipping, an A/B test on the same metrics plus trial-to-paid conversion. I'd track `setup_card_viewed`, `setup_step_clicked`, `setup_step_completed` (auto or manual), `setup_card_hidden`, `setup_card_restored` and `setup_all_steps_viewed`.

**What would you improve with another two hours?**
- Component tests for the hook (recommended step, completion, hide/undo) with Vitest and Testing Library.
- A way to change the onboarding goal from the card.
- A "Skipped" status for steps that don't apply.

## AI usage notes

**Which AI tools did I use?**
Claude (Anthropic).

**How did AI help?**
- **Audit:** I explored LeadZam myself and shared screenshots. Claude helped turn my observations into structured findings and priorities.
- **Design:** Claude built the Figma file through the Figma connection from a spec we agreed on (components, variants, colour variables, five screens). The design decisions came from my audit.
- **Code:** Claude helped write the React + TypeScript components and the README. I reviewed and tested every state in the browser.

**One AI suggestion I changed or rejected, and why**
Early on, the audit draft said LeadZam *ignores* the onboarding answers, because the checklist looked the same to me. I made a second trial account with different answers and found the list does change. So I rewrote the finding to "the tailoring works but is invisible", which is more accurate and led directly to the "Because you want to…" line in the design.

I also changed the button colour: the design first used LeadZam's brand blue `#1677FF`, but white text on it only reaches about 4.1:1 contrast, which fails WCAG AA. I darkened the primary token to `#1570EF`.

**What did I personally verify instead of trusting the AI?**
Every finding, by reproducing it in the live product: the 6 vs 22 counts, the stage not ticking the step, the X coming back after a reload, a lead saving with only a name, and the 400 response behind the empty-form error. I checked the contrast numbers, and in the prototype I tested each state (loading, error, validation, step done, hidden, all done) on desktop and at 390 px.

## Assumptions and limitations

- I tested LeadZam as an Admin on a fresh trial workspace, with dummy data only. Other roles may see different screens.
- I couldn't confirm LeadZam's exact font, so the design uses DM Sans as the closest match.
- Step lists for goals other than "See what is working" are my proposals, not LeadZam's real data.
- No backend: step completion, the progress check and saving a lead are simulated.
- Not tested with real users.
