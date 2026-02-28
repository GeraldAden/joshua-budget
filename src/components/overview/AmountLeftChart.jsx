import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { useBudget } from '../../hooks/useBudget'
import { useDerivedTotals } from '../../hooks/useDerivedTotals'
import { formatCurrency } from '../../utils/formatCurrency'

ChartJS.register(ArcElement, Tooltip, Legend)

const centerTextPlugin = {
  id: 'centerText',
  afterDraw(chart) {
    const { ctx, width, height } = chart
    const meta = chart.getDatasetMeta(0)
    if (!meta.data.length) return

    const remaining = chart.config.data.datasets[0].data[4] ?? 0
    const currency = chart.config.options.plugins.centerText?.currency ?? 'USD'

    ctx.save()
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    ctx.font = 'bold 18px Inter, system-ui, sans-serif'
    ctx.fillStyle = remaining >= 0 ? '#059669' : '#dc2626'
    ctx.fillText(formatCurrency(remaining, currency), width / 2, height / 2 - 8)

    ctx.font = '12px Inter, system-ui, sans-serif'
    ctx.fillStyle = '#7c3aed'
    ctx.fillText('Remaining', width / 2, height / 2 + 12)

    ctx.restore()
  },
}

ChartJS.register(centerTextPlugin)

export default function AmountLeftChart() {
  const { monthData, settings } = useBudget()
  const totals = useDerivedTotals(monthData)

  const spent = [
    totals.bills.actual,
    totals.expenses.actual,
    totals.savings.actual,
    totals.debt.actual,
  ]
  const remaining = Math.max(totals.remaining.actual, 0)

  const data = {
    labels: ['Bills', 'Expenses', 'Savings', 'Debt', 'Remaining'],
    datasets: [
      {
        data: [...spent, remaining],
        backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#6366f1', '#ddd6fe'],
        borderWidth: 0,
      },
    ],
  }

  const options = {
    cutout: '65%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      centerText: { currency: settings.currency },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${formatCurrency(ctx.raw, settings.currency)}`,
        },
      },
    },
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-lavender-100 p-4">
      <h3 className="font-semibold text-lavender-800 mb-3">Amount Left</h3>
      <div className="h-56">
        <Doughnut data={data} options={options} />
      </div>
      <div className="flex flex-wrap justify-center gap-3 mt-3">
        {data.labels.map((label, i) => (
          <div key={label} className="flex items-center gap-1 text-xs text-lavender-600">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: data.datasets[0].backgroundColor[i] }}
            />
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}
