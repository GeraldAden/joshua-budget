# Implementation Status

## Phase 1: Foundation
- [x] Project scaffold + dependencies
- [x] `constants.js` - Category keys, colors, defaults
- [x] `defaults.js` - createEmptyMonth(), defaultSettings
- [x] `formatCurrency.js` - Intl.NumberFormat wrapper
- [x] `calculations.js` - Sum helpers, progress %
- [x] `useLocalStorage.js` hook
- [x] `BudgetContext.jsx` + `useBudget.js`

## Phase 2: Layout Shell
- [x] `App.jsx` with BudgetProvider wrapper and grid layout
- [x] `Header.jsx` + `MonthPicker.jsx` (month navigation)
- [x] Lavender theme in `index.css`

## Phase 3: Data Entry Tables
- [x] `ProgressBar.jsx` - Color-coded progress bar
- [x] `CurrencyInput.jsx` - Inline number editing
- [x] `LineItemRow.jsx` - Double-click to edit, blur to save, delete button
- [x] `CategoryTable.jsx` - Reusable table with header, rows, add button, totals footer
- [x] Wired all 5 tables into App.jsx grid

## Phase 4: Summary & Overview
- [x] `useDerivedTotals.js` - Computes all category summaries and remaining
- [x] `SummaryCard.jsx` - Individual card with actual, planned, and difference
- [x] `SummaryBar.jsx` - 5 top summary cards in responsive grid
- [x] `FinancialOverview.jsx` - 6-row Planned vs Actual table with differences
- [x] Wired into App.jsx

## Phase 5: Charts
- [x] `AmountLeftChart.jsx` - Doughnut chart with center text plugin showing remaining
- [x] `CashFlowCharts.jsx` - Grouped bar (Planned vs Actual) + Pie (Spending Breakdown)
- [x] Registered Chart.js components (ArcElement, BarElement, scales, etc.)
- [x] Wired into App.jsx with responsive grid layout

## Phase 6: Polish
- [x] `ImportExportButtons.jsx` - Export JSON download + import from file
- [x] Wired import/export into Header
- [x] Responsive breakpoints (padding, font sizes for mobile)
- [x] Page title set to "Joshua Budget"
- [x] Edge cases: zero-division guards, empty state handling
