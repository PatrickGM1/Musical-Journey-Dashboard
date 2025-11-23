import { useEffect, useState } from "react"
import { listSheets, downloadSheetUrl, deleteSheet, type SheetView } from "../api/sheets"

/**
 * SongSheets Component
 * 
 * Displays sheet music files linked to a specific song.
 * Shows chips with download links and delete buttons for each sheet.
 * 
 * @param {string} songId - The ID of the song to display sheets for
 * @param {() => void} [onUpdate] - Optional callback triggered when sheets should be reloaded
 * 
 * @example
 * <SongSheets songId="123" onUpdate={handleSheetsUpdate} />
 */
function SongSheets({ songId, onUpdate }: { songId: string; onUpdate?: () => void }) {
  const [files, setFiles] = useState<SheetView[]>([])
  const [busy, setBusy] = useState(false)
  const load = async () => {
    setBusy(true)
    try { setFiles(await listSheets({ songId })) }
    finally { setBusy(false) }
  }
  useEffect(()=>{ load() }, [songId])
  
  useEffect(() => {
    if (onUpdate) {
      load()
    }
  }, [onUpdate])

  if (!files || files.length === 0) return <div className="muted" style={{ padding: "8px 0" }}>No sheets linked.</div>

  return (
    <div style={{ padding: "8px 0" }}>
      {files.map(f => (
        <span key={f.id} className="chip" style={{ marginRight: 8 }}>
          <a href={downloadSheetUrl(f.id)}>{f.originalName}</a>
          <button className="chip danger" onClick={async () => {
            if (!confirm("Delete this file?")) return
            setBusy(true)
            try { await deleteSheet(f.id); await load() }
            finally { setBusy(false) }
          }} disabled={busy}>×</button>
        </span>
      ))}
    </div>
  )
}
export default SongSheets
