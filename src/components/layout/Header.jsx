import { useBudget } from '../../hooks/useBudget'
import MonthPicker from '../shared/MonthPicker'
import ImportExportButtons from '../shared/ImportExportButtons'

export default function Header() {
  const { currentMonth, setCurrentMonth } = useBudget()

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-lavender-200 px-4 sm:px-6 py-3 sm:py-4">
      <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-lavender-800">
          Joshua Budget
        </h1>
        <div className="flex items-center gap-3">
          <MonthPicker currentMonth={currentMonth} onChange={setCurrentMonth} />
          <ImportExportButtons />
        </div>
      </div>
    </header>
  )
}
