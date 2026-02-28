export function sumPlanned(items) {
  return items.reduce((sum, item) => sum + (item.planned || 0), 0)
}

export function sumActual(items) {
  return items.reduce((sum, item) => sum + (item.actual || 0), 0)
}

export function progressPercent(actual, planned) {
  if (!planned || planned === 0) return 0
  return Math.min((actual / planned) * 100, 100)
}

export function progressColor(percent) {
  if (percent >= 90) return 'bg-red-500'
  if (percent >= 75) return 'bg-yellow-500'
  return 'bg-purple-500'
}
