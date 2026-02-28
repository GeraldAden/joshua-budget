import { createContext, useState, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEY } from '../utils/constants'
import { getDefaultStore, createEmptyMonth } from '../utils/defaults'

export const BudgetContext = createContext(null)

function getCurrentMonthKey() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

export function BudgetProvider({ children }) {
  const [store, setStore] = useLocalStorage(STORAGE_KEY, getDefaultStore())
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonthKey)

  const getMonthData = useCallback(
    (monthKey = currentMonth) => {
      return store.months[monthKey] || createEmptyMonth()
    },
    [store.months, currentMonth]
  )

  const updateMonthData = useCallback(
    (monthKey, updater) => {
      setStore((prev) => {
        const existing = prev.months[monthKey] || createEmptyMonth()
        const updated = updater(existing)
        return {
          ...prev,
          months: { ...prev.months, [monthKey]: updated },
        }
      })
    },
    [setStore]
  )

  const addItem = useCallback(
    (category, item = {}) => {
      const newItem = {
        id: uuidv4(),
        label: item.label || '',
        planned: item.planned || 0,
        actual: item.actual || 0,
      }
      updateMonthData(currentMonth, (data) => ({
        ...data,
        [category]: [...data[category], newItem],
      }))
    },
    [currentMonth, updateMonthData]
  )

  const updateItem = useCallback(
    (category, itemId, changes) => {
      updateMonthData(currentMonth, (data) => ({
        ...data,
        [category]: data[category].map((item) =>
          item.id === itemId ? { ...item, ...changes } : item
        ),
      }))
    },
    [currentMonth, updateMonthData]
  )

  const removeItem = useCallback(
    (category, itemId) => {
      updateMonthData(currentMonth, (data) => ({
        ...data,
        [category]: data[category].filter((item) => item.id !== itemId),
      }))
    },
    [currentMonth, updateMonthData]
  )

  const replaceStore = useCallback(
    (newStore) => {
      setStore(newStore)
    },
    [setStore]
  )

  const value = {
    store,
    currentMonth,
    setCurrentMonth,
    settings: store.settings,
    monthData: getMonthData(),
    addItem,
    updateItem,
    removeItem,
    replaceStore,
  }

  return (
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  )
}
