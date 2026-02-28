import { Bar, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { useBudget } from '../../hooks/useBudget'
import { useDerivedTotals } from '../../hooks/useDerivedTotals'
import { formatCurrency } from '../../utils/formatCurrency'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend)

export default function CashFlowCharts() {
  const { monthData, settings } = useBudget()
  const totals = useDerivedTotals(monthData)

  const categories = ['Income', 'Bills', 'Expenses', 'Savings', 'Debt']
  const colors = ['#8b5cf6', '#ef4444', '#f59e0b', '#10b981', '#6366f1']
  const planned = [
    totals.income.planned,
    totals.bills.planned,
    totals.expenses.planned,
    totals.savings.planned,
    totals.debt.planned,
  ]
  const actual = [
    totals.income.actual,
    totals.bills.actual,
    totals.expenses.actual,
    totals.savings.actual,
    totals.debt.actual,
  ]

  const barData = {
    labels: categories,
    datasets: [
      {
        label: 'Planned',
        data: planned,
        backgroundColor: colors.map((c) => c + '66'),
        borderColor: colors,
        borderWidth: 1,
      },
      {
        label: 'Actual',
        data: actual,
        backgroundColor: colors,
        borderWidth: 0,
      },
    ],
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11 } } },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${formatCurrency(ctx.raw, settings.currency)}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (v) => formatCurrency(v, settings.currency),
          font: { size: 10 },
        },
        grid: { color: '#ede9fe' },
      },
      x: {
        ticks: { font: { size: 10 } },
        grid: { display: false },
      },
    },
  }

  const pieData = {
    labels: ['Bills', 'Expenses', 'Savings', 'Debt'],
    datasets: [
      {
        data: [
          totals.bills.actual,
          totals.expenses.actual,
          totals.savings.actual,
          totals.debt.actual,
        ],
        backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#6366f1'],
        borderWidth: 0,
      },
    ],
  }

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${formatCurrency(ctx.raw, settings.currency)}`,
        },
      },
    },
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white rounded-xl shadow-sm border border-lavender-100 p-4">
        <h3 className="font-semibold text-lavender-800 mb-3">Planned vs Actual</h3>
        <div className="h-56">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-lavender-100 p-4">
        <h3 className="font-semibold text-lavender-800 mb-3">Spending Breakdown</h3>
        <div className="h-56">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  )
}
