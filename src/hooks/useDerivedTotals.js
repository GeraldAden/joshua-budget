import { useMemo } from 'react'
import { sumPlanned, sumActual } from '../utils/calculations'

export function useDerivedTotals(monthData) {
  return useMemo(() => {
    const income = {
      planned: sumPlanned(monthData.income),
      actual: sumActual(monthData.income),
    }
    const bills = {
      planned: sumPlanned(monthData.bills),
      actual: sumActual(monthData.bills),
    }
    const expenses = {
      planned: sumPlanned(monthData.expenses),
      actual: sumActual(monthData.expenses),
    }
    const savings = {
      planned: sumPlanned(monthData.savings),
      actual: sumActual(monthData.savings),
    }
    const debt = {
      planned: sumPlanned(monthData.debt),
      actual: sumActual(monthData.debt),
    }

    const totalSpending = {
      planned: bills.planned + expenses.planned,
      actual: bills.actual + expenses.actual,
    }

    const totalOutgoing = {
      planned: totalSpending.planned + savings.planned + debt.planned,
      actual: totalSpending.actual + savings.actual + debt.actual,
    }

    const remaining = {
      planned: income.planned - totalOutgoing.planned,
      actual: income.actual - totalOutgoing.actual,
    }

    return {
      income,
      bills,
      expenses,
      savings,
      debt,
      totalSpending,
      totalOutgoing,
      remaining,
    }
  }, [monthData])
}
