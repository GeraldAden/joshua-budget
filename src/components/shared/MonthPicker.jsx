import { ChevronLeft, ChevronRight } from 'lucide-react'

function parseMonthKey(key) {
  const [year, month] = key.split('-').map(Number)
  return { year, month }
}

function formatMonthKey(year, month) {
  return `${year}-${String(month).padStart(2, '0')}`
}

function formatDisplay(key) {
  const { year, month } = parseMonthKey(key)
  const date = new Date(year, month - 1)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export default function MonthPicker({ currentMonth, onChange }) {
  const navigate = (delta) => {
    const { year, month } = parseMonthKey(currentMonth)
    const d = new Date(year, month - 1 + delta)
    onChange(formatMonthKey(d.getFullYear(), d.getMonth() + 1))
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => navigate(-1)}
        className="p-1.5 rounded-lg hover:bg-lavender-200 transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <span className="text-lg font-semibold min-w-[180px] text-center">
        {formatDisplay(currentMonth)}
      </span>
      <button
        onClick={() => navigate(1)}
        className="p-1.5 rounded-lg hover:bg-lavender-200 transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  )
}
