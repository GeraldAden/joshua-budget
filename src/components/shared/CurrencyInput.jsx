import { useState, useRef, useEffect } from 'react'

export default function CurrencyInput({ value, onSave, className = '' }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(String(value || 0))
  const inputRef = useRef(null)

  useEffect(() => {
    if (editing) inputRef.current?.select()
  }, [editing])

  const commit = () => {
    setEditing(false)
    const num = parseFloat(draft)
    onSave(isNaN(num) ? 0 : Math.round(num * 100) / 100)
  }

  if (!editing) {
    return (
      <span
        className={`cursor-pointer hover:bg-lavender-100 rounded px-1 ${className}`}
        onDoubleClick={() => {
          setDraft(String(value || 0))
          setEditing(true)
        }}
      >
        {(value || 0).toFixed(2)}
      </span>
    )
  }

  return (
    <input
      ref={inputRef}
      type="number"
      step="0.01"
      className={`w-24 px-1 py-0.5 border border-lavender-300 rounded text-right text-sm focus:outline-none focus:ring-1 focus:ring-lavender-500 ${className}`}
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === 'Enter') commit()
        if (e.key === 'Escape') setEditing(false)
      }}
    />
  )
}
