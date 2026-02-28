import { useBudget } from '../../hooks/useBudget'
import MonthPicker from '../shared/MonthPicker'

export default function Header() {
  const { currentMonth, setCurrentMonth } = useBudget()

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-lavender-200 px-6 py-4">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-lavender-800">
          Joshua Budget
        </h1>
        <MonthPicker currentMonth={currentMonth} onChange={setCurrentMonth} />
      </div>
    </header>
  )
}
