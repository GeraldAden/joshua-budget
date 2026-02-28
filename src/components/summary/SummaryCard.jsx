import { formatCurrency } from '../../utils/formatCurrency'

export default function SummaryCard({ label, planned, actual, color, currency = 'USD' }) {
  const diff = planned - actual
  const isOver = diff < 0

  return (
    <div className="bg-white rounded-xl shadow-sm border border-lavender-100 p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
        <h3 className="text-sm font-medium text-lavender-600">{label}</h3>
      </div>
      <div className="text-xl font-bold text-lavender-900">
        {formatCurrency(actual, currency)}
      </div>
      <div className="text-xs text-lavender-400 mt-1">
        of {formatCurrency(planned, currency)} planned
      </div>
      <div className={`text-xs font-medium mt-1 ${isOver ? 'text-red-500' : 'text-green-600'}`}>
        {isOver ? 'Over by ' : 'Under by '}
        {formatCurrency(Math.abs(diff), currency)}
      </div>
    </div>
  )
}
