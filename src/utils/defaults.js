import { CATEGORY_KEYS } from './constants'

export const defaultSettings = {
  currency: 'USD',
  currencySymbol: '$',
}

export function createEmptyMonth() {
  return Object.fromEntries(CATEGORY_KEYS.map((key) => [key, []]))
}

export function getDefaultStore() {
  return {
    settings: { ...defaultSettings },
    months: {},
  }
}
