import { useBudget } from '../../hooks/useBudget'
import { useDerivedTotals } from '../../hooks/useDerivedTotals'
import { formatCurrency } from '../../utils/formatCurrency'

export default function FinancialOverview() {
  const { monthData, settings } = useBudget()
  const totals = useDerivedTotals(monthData)
  const fmt = (v) => formatCurrency(v, settings.currency)

  const rows = [
    { label: 'Income', planned: totals.income.planned, actual: totals.income.actual },
    { label: 'Bills', planned: totals.bills.planned, actual: totals.bills.actual },
    { label: 'Expenses', planned: totals.expenses.planned, actual: totals.expenses.actual },
    { label: 'Savings', planned: totals.savings.planned, actual: totals.savings.actual },
    { label: 'Debt', planned: totals.debt.planned, actual: totals.debt.actual },
    { label: 'Remaining', planned: totals.remaining.planned, actual: totals.remaining.actual, highlight: true },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-lavender-100 overflow-hidden">
      <div className="px-4 py-3 border-b border-lavender-200">
        <h3 className="font-semibold text-lavender-800">Financial Overview</h3>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-xs text-lavender-400 uppercase tracking-wider border-b border-lavender-100">
            <th className="text-left py-2 px-4 font-medium">Category</th>
            <th className="text-right py-2 px-4 font-medium">Planned</th>
            <th className="text-right py-2 px-4 font-medium">Actual</th>
            <th className="text-right py-2 px-4 font-medium">Difference</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const diff = row.planned - row.actual
            return (
              <tr
                key={row.label}
                className={`border-b border-lavender-50 ${row.highlight ? 'bg-lavender-50 font-semibold' : ''}`}
              >
                <td className="py-2.5 px-4 text-sm">{row.label}</td>
                <td className="py-2.5 px-4 text-sm text-right">{fmt(row.planned)}</td>
                <td className="py-2.5 px-4 text-sm text-right">{fmt(row.actual)}</td>
                <td className={`py-2.5 px-4 text-sm text-right ${diff < 0 ? 'text-red-500' : 'text-green-600'}`}>
                  {fmt(Math.abs(diff))} {diff < 0 ? 'over' : 'under'}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
