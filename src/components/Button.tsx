import type { ButtonHTMLAttributes } from 'react'
import { Spinner } from './icons'

// Matches the Figma "Button" component: Type = Primary | Secondary | Text
type Variant = 'primary' | 'secondary' | 'text'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  loading?: boolean
}

const base =
  'inline-flex items-center justify-center gap-1.5 rounded-lg text-sm font-medium transition-colors ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ' +
  'disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer'

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-white px-4 py-2.5 hover:bg-primary-hover',
  secondary: 'bg-surface text-text px-4 py-2.5 border border-border-strong hover:bg-background',
  // min-h-11 gives the small text button a 44px tap target without looking bigger
  text: 'text-primary px-2 min-h-11 hover:underline underline-offset-4',
}

export function Button({ variant = 'primary', loading = false, className = '', children, disabled, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <Spinner />}
      {children}
    </button>
  )
}
