import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Button } from './Button'
import { X } from './icons'

interface AddLeadDialogProps {
  open: boolean
  onClose: () => void
  onAdded: () => void
}

interface Errors {
  name?: string
  contact?: string
  email?: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Also fixes audit finding 2: a lead needs a name AND a way to reach them,
// and errors appear next to the field instead of a toast far from the form.
function validate(name: string, phone: string, email: string): Errors {
  const errors: Errors = {}
  if (!name.trim()) errors.name = 'Enter the lead’s name.'
  if (!phone.trim() && !email.trim()) errors.contact = 'Add a phone number or an email so your team can reach this lead.'
  if (email.trim() && !EMAIL_PATTERN.test(email.trim())) errors.email = 'Enter an email like name@company.com.'
  return errors
}

export function AddLeadDialog({ open, onClose, onAdded }: AddLeadDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [saving, setSaving] = useState(false)

  // The native <dialog> gives us focus trapping and Esc-to-close for free.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  function resetForm() {
    setName('')
    setPhone('')
    setEmail('')
    setErrors({})
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const found = validate(name, phone, email)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const firstInvalid = found.name ? 'lead-name' : found.contact ? 'lead-phone' : 'lead-email'
      document.getElementById(firstInvalid)?.focus()
      return
    }
    setSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 600)) // simulated save
    setSaving(false)
    resetForm()
    onAdded()
  }

  const inputClass = (invalid: boolean) =>
    `w-full rounded-lg border bg-surface px-3 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
      invalid ? 'border-red-600 focus-visible:border-red-600' : 'border-border-strong focus-visible:border-primary'
    }`

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="add-lead-title"
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-xl border border-border bg-surface p-0 text-text shadow-xl backdrop:bg-black/40"
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="add-lead-title" className="text-lg font-semibold">Add a lead</h2>
            <p className="mt-1 text-sm text-text-muted">Use dummy details. This is a prototype.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-9 cursor-pointer place-items-center rounded-md text-text-muted hover:bg-background focus-visible:outline-2 focus-visible:outline-primary"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="lead-name" className="text-sm font-medium">
            Full name <span className="text-text-muted">(required)</span>
          </label>
          <input
            id="lead-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'lead-name-error' : undefined}
            autoComplete="off"
            className={inputClass(!!errors.name)}
          />
          {errors.name && <p id="lead-name-error" className="text-[13px] text-red-700">{errors.name}</p>}
        </div>

        <fieldset className="flex flex-col gap-3" aria-describedby="contact-hint">
          <legend className="mb-1 text-sm font-medium">How to reach them</legend>
          <p id="contact-hint" className="-mt-1 text-[13px] text-text-muted">Phone or email, at least one.</p>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="lead-phone" className="text-sm">Phone</label>
            <input
              id="lead-phone"
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-invalid={!!errors.contact}
              aria-describedby={errors.contact ? 'lead-contact-error' : undefined}
              placeholder="+91 98765 43210"
              className={inputClass(!!errors.contact)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="lead-email" className="text-sm">Email</label>
            <input
              id="lead-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!errors.contact || !!errors.email}
              aria-describedby={errors.email ? 'lead-email-error' : errors.contact ? 'lead-contact-error' : undefined}
              placeholder="name@company.com"
              className={inputClass(!!errors.contact || !!errors.email)}
            />
            {errors.email && <p id="lead-email-error" className="text-[13px] text-red-700">{errors.email}</p>}
          </div>
          {errors.contact && <p id="lead-contact-error" className="text-[13px] text-red-700">{errors.contact}</p>}
        </fieldset>

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose} disabled={saving}>Cancel</Button>
          <Button type="submit" loading={saving}>Add lead</Button>
        </div>
      </form>
    </dialog>
  )
}
