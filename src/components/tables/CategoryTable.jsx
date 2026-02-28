import { Plus } from 'lucide-react'
import { useBudget } from '../../hooks/useBudget'
import { sumPlanned, sumActual } from '../../utils/calculations'
import { formatCurrency } from '../../utils/formatCurrency'
import LineItemRow from './LineItemRow'

export default function CategoryTable({
  categoryKey,
  label,
  color = '#8b5cf6',
  showProgress = true,
}) {
  const { monthData, settings, addItem, updateItem, removeItem } = useBudget()
  const items = monthData[categoryKey] || []
  const totalPlanned = sumPlanned(items)
  const totalActual = sumActual(items)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-lavender-100 overflow-hidden">
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{ borderBottom: `3px solid ${color}` }}
      >
        <h3 className="font-semibold text-sm uppercase tracking-wide" style={{ color }}>
          {label}
        </h3>
        <button
          onClick={() => addItem(categoryKey)}
          className="text-lavender-500 hover:text-lavender-700 hover:bg-lavender-100 rounded-lg p-1 transition-colors"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Table */}
      <table className="w-full">
        <thead>
          <tr className="text-xs text-lavender-400 uppercase tracking-wider">
            <th className="text-left py-2 px-3 font-medium">Item</th>
            <th className="text-right py-2 px-3 font-medium">Planned</th>
            <th className="text-right py-2 px-3 font-medium">Actual</th>
            {showProgress && <th className="py-2 px-3 font-medium">Progress</th>}
            <th className="w-8"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <LineItemRow
              key={item.id}
              item={item}
              showProgress={showProgress}
              currencySymbol={settings.currencySymbol}
              onUpdate={(changes) => updateItem(categoryKey, item.id, changes)}
              onRemove={() => removeItem(categoryKey, item.id)}
            />
          ))}
          {items.length === 0 && (
            <tr>
              <td
                colSpan={showProgress ? 5 : 4}
                className="text-center text-lavender-300 text-sm py-6"
              >
                No items yet. Click + to add one.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Totals Footer */}
      {items.length > 0 && (
        <div className="bg-lavender-50/50 px-3 py-2 flex justify-between text-sm font-medium border-t border-lavender-100">
          <span className="text-lavender-600">Total</span>
          <div className="flex gap-6">
            <span>{formatCurrency(totalPlanned, settings.currency)}</span>
            <span>{formatCurrency(totalActual, settings.currency)}</span>
          </div>
        </div>
      )}
    </div>
  )
}
