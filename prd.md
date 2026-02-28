# Joshua Budget Dashboard - Implementation Plan

## Context
Building a personal monthly budget dashboard from scratch based on a screenshot the user provided. The app tracks Income, Expenses, Bills, Savings, and Debt with planned vs actual amounts, progress bars, and charts. Tech: **React + Vite + TailwindCSS + Chart.js**, with **Local Storage** for persistence.

---

## 1. Project Setup
1. Scaffold with `npm create vite@latest . -- --template react`
2. Install: `tailwindcss @tailwindcss/vite chart.js react-chartjs-2 uuid lucide-react`
3. Configure Vite with Tailwind v4 plugin
4. Set up lavender theme via `@theme` in `index.css`

## 2. Data Model
```
BudgetStore {
  settings: { currency, currencySymbol }
  months: { "YYYY-MM": { income[], bills[], expenses[], savings[], debt[] } }
}
LineItem { id, label, planned, actual }
```
All totals, progress, and chart data are **derived** (never stored).

## 3. File Structure
```
src/
  context/BudgetContext.jsx       # Central state + Local Storage sync
  hooks/
    useBudget.js                  # Context convenience hook
    useLocalStorage.js            # Generic LS hook
    useDerivedTotals.js           # Computes all summaries/chart data
  components/
    layout/Header.jsx             # Title, month picker, import/export
    summary/SummaryBar.jsx        # 5 top summary cards
    summary/SummaryCard.jsx
    overview/FinancialOverview.jsx # Planned vs Actual table
    overview/AmountLeftChart.jsx   # Doughnut chart
    overview/CashFlowCharts.jsx    # Bar chart + Pie chart
    tables/CategoryTable.jsx       # Reusable table (used 5x)
    tables/LineItemRow.jsx         # Inline-editable row
    tables/ProgressBar.jsx
    shared/MonthPicker.jsx
    shared/CurrencyInput.jsx
    shared/ImportExportButtons.jsx
  utils/
    constants.js                   # Category keys, colors, defaults
    defaults.js                    # createEmptyMonth(), defaultSettings
    formatCurrency.js              # Intl.NumberFormat wrapper
    calculations.js                # Sum helpers, progress %
    storage.js                     # Export/import JSON helpers
```

## 4. Implementation Order

### Phase 1: Foundation
- Project scaffold + dependencies
- `constants.js`, `defaults.js`, `formatCurrency.js`, `calculations.js`
- `useLocalStorage.js` hook
- `BudgetContext.jsx` + `useBudget.js`

### Phase 2: Layout Shell
- `App.jsx` with BudgetProvider wrapper and grid layout
- `Header.jsx` + `MonthPicker.jsx` (month navigation)
- Lavender theme in `index.css`

### Phase 3: Data Entry Tables
- `ProgressBar.jsx`, `CurrencyInput.jsx`
- `LineItemRow.jsx` (inline editing: double-click to edit, blur to save)
- `CategoryTable.jsx` (renders header, rows, add button, totals footer)
- Wire all 5 tables into the bottom grid row

### Phase 4: Summary & Overview
- `useDerivedTotals.js` hook
- `SummaryCard.jsx` + `SummaryBar.jsx` (5 top cards)
- `FinancialOverview.jsx` (6-row Planned vs Actual table)

### Phase 5: Charts
- Register Chart.js components
- `AmountLeftChart.jsx` (Doughnut with center text)
- `CashFlowCharts.jsx` (grouped Bar + Pie chart)

### Phase 6: Polish
- `ImportExportButtons.jsx` + `storage.js`
- Responsive breakpoints (`grid-cols-1 md:grid-cols-2 lg:grid-cols-5`)
- Empty states, edge cases (zero division), final styling

## 5. Key Design Decisions
- **Inline editing** in tables (double-click cell to edit) instead of modal forms
- **Single React Context** for all state; no Redux needed for this scale
- **`useDerivedTotals`** hook as single source of truth for all computed values
- **CategoryTable** is one reusable component rendered 5 times with different props
- Income table uses `showProgress={false}` (no progress bar, matches screenshot)
- Progress bar colors: purple < 75%, yellow 75-90%, red > 90%

## 6. Verification
1. `npm run dev` - app starts without errors
2. Add line items to each category, verify they persist after page reload
3. Change months, verify data is separate per month
4. Check all 5 summary cards update when line items change
5. Verify Financial Overview table matches category totals
6. Verify all 3 charts (Doughnut, Bar, Pie) render and update reactively
7. Test export: download JSON, clear storage, import JSON, verify data restored
8. Test responsive layout at various breakpoints
