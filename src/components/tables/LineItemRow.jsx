import { useState, useRef, useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import CurrencyInput from '../shared/CurrencyInput'
import ProgressBar from './ProgressBar'

export default function LineItemRow({
  item,
  onUpdate,
  onRemove,
  showProgress = true,
  currencySymbol = '$',
}) {
  const [editingLabel, setEditingLabel] = useState(false)
  const [labelDraft, setLabelDraft] = useState(item.label)
  const labelRef = useRef(null)

  useEffect(() => {
    if (editingLabel) labelRef.current?.select()
  }, [editingLabel])

  const commitLabel = () => {
    setEditingLabel(false)
    if (labelDraft.trim() !== item.label) {
      onUpdate({ label: labelDraft.trim() })
    }
  }

  return (
    <tr className="group hover:bg-lavender-50 border-b border-lavender-100">
      {/* Label */}
      <td className="py-2 px-3">
        {editingLabel ? (
          <input
            ref={labelRef}
            className="w-full px-1 py-0.5 border border-lavender-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-lavender-500"
            value={labelDraft}
            onChange={(e) => setLabelDraft(e.target.value)}
            onBlur={commitLabel}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitLabel()
              if (e.key === 'Escape') {
                setLabelDraft(item.label)
                setEditingLabel(false)
              }
            }}
          />
        ) : (
          <span
            className="cursor-pointer hover:bg-lavender-100 rounded px-1 text-sm"
            onDoubleClick={() => {
              setLabelDraft(item.label)
              setEditingLabel(true)
            }}
          >
            {item.label || <span className="text-lavender-300 italic">Double-click to edit</span>}
          </span>
        )}
      </td>

      {/* Planned */}
      <td className="py-2 px-3 text-right text-sm">
        <span className="text-lavender-400 mr-0.5">{currencySymbol}</span>
        <CurrencyInput
          value={item.planned}
          onSave={(v) => onUpdate({ planned: v })}
        />
      </td>

      {/* Actual */}
      <td className="py-2 px-3 text-right text-sm">
        <span className="text-lavender-400 mr-0.5">{currencySymbol}</span>
        <CurrencyInput
          value={item.actual}
          onSave={(v) => onUpdate({ actual: v })}
        />
      </td>

      {/* Progress */}
      {showProgress && (
        <td className="py-2 px-3 w-32">
          <ProgressBar actual={item.actual} planned={item.planned} />
        </td>
      )}

      {/* Delete */}
      <td className="py-2 px-1 w-8">
        <button
          onClick={onRemove}
          className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-opacity p-1"
        >
          <Trash2 size={14} />
        </button>
      </td>
    </tr>
  )
}
