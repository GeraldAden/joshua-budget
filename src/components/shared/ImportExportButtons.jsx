import { useRef } from 'react'
import { Download, Upload } from 'lucide-react'
import { useBudget } from '../../hooks/useBudget'
import { exportData, importData } from '../../utils/storage'

export default function ImportExportButtons() {
  const { store, replaceStore } = useBudget()
  const fileRef = useRef(null)

  const handleExport = () => {
    exportData(store)
  }

  const handleImport = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const data = await importData(file)
      if (data && data.settings && data.months) {
        replaceStore(data)
      } else {
        alert('Invalid budget file format.')
      }
    } catch (err) {
      alert(err.message)
    }
    e.target.value = ''
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleExport}
        className="flex items-center gap-1.5 text-xs text-lavender-600 hover:text-lavender-800 hover:bg-lavender-100 rounded-lg px-2.5 py-1.5 transition-colors"
        title="Export budget data"
      >
        <Download size={14} />
        Export
      </button>
      <button
        onClick={() => fileRef.current?.click()}
        className="flex items-center gap-1.5 text-xs text-lavender-600 hover:text-lavender-800 hover:bg-lavender-100 rounded-lg px-2.5 py-1.5 transition-colors"
        title="Import budget data"
      >
        <Upload size={14} />
        Import
      </button>
      <input
        ref={fileRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleImport}
      />
    </div>
  )
}
