import { progressPercent, progressColor } from '../../utils/calculations'

export default function ProgressBar({ actual, planned }) {
  const pct = progressPercent(actual, planned)
  const color = progressColor(pct)

  return (
    <div className="w-full bg-lavender-100 rounded-full h-2.5">
      <div
        className={`h-2.5 rounded-full transition-all duration-300 ${color}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
