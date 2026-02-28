export const CATEGORIES = [
  { key: 'income', label: 'Income', color: '#8b5cf6' },
  { key: 'bills', label: 'Bills', color: '#ef4444' },
  { key: 'expenses', label: 'Expenses', color: '#f59e0b' },
  { key: 'savings', label: 'Savings', color: '#10b981' },
  { key: 'debt', label: 'Debt', color: '#6366f1' },
]

export const CATEGORY_KEYS = CATEGORIES.map((c) => c.key)

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.key, c])
)

export const STORAGE_KEY = 'joshua-budget'
