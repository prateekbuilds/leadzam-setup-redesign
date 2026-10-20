interface ProgressBarProps {
  done: number
  total: number
  complete?: boolean
}

// One honest count: the label and the bar always show the same number.
export function ProgressBar({ done, total, complete = false }: ProgressBarProps) {
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium" id="setup-progress-label">
        {done} of {total} done
      </p>
      <div
        role="progressbar"
        aria-labelledby="setup-progress-label"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
        aria-valuetext={`${done} of ${total} setup steps done`}
        className="h-1.5 w-full overflow-hidden rounded-full bg-border"
      >
        <div
          className={`h-full rounded-full transition-[width] duration-500 ${complete ? 'bg-success' : 'bg-primary'}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
