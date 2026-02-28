import { useBudget } from '../../hooks/useBudget'
import { useDerivedTotals } from '../../hooks/useDerivedTotals'
import { CATEGORY_MAP } from '../../utils/constants'
import SummaryCard from './SummaryCard'

export default function SummaryBar() {
  const { monthData, settings } = useBudget()
  const totals = useDerivedTotals(monthData)

  const cards = [
    { key: 'income', label: 'Income', data: totals.income },
    { key: 'bills', label: 'Bills', data: totals.bills },
    { key: 'expenses', label: 'Expenses', data: totals.expenses },
    { key: 'savings', label: 'Savings', data: totals.savings },
    { key: 'debt', label: 'Debt', data: totals.debt },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((card) => (
        <SummaryCard
          key={card.key}
          label={card.label}
          planned={card.data.planned}
          actual={card.data.actual}
          color={CATEGORY_MAP[card.key].color}
          currency={settings.currency}
        />
      ))}
    </div>
  )
}
