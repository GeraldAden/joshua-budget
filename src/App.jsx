import { BudgetProvider } from './context/BudgetContext'
import Header from './components/layout/Header'
import CategoryTable from './components/tables/CategoryTable'
import { CATEGORIES } from './utils/constants'

function App() {
  return (
    <BudgetProvider>
      <div className="min-h-screen bg-lavender-50">
        <Header />
        <main className="max-w-[1600px] mx-auto px-6 py-6">
          {/* Summary bar will go here */}
          {/* Overview section will go here */}

          {/* Category Tables */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <CategoryTable
                key={cat.key}
                categoryKey={cat.key}
                label={cat.label}
                color={cat.color}
                showProgress={cat.key !== 'income'}
              />
            ))}
          </div>
        </main>
      </div>
    </BudgetProvider>
  )
}

export default App
