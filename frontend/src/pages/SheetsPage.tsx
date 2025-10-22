import { useEffect, useState } from "react"
import { deleteSheet, downloadSheetUrl, listSheets, uploadSheetWithSong, type SheetView } from "../api/sheets"
import Modal from "../components/Modal"

export default function SheetsPage(){
  const [items, setItems] = useState<SheetView[]>([])
  const [busy, setBusy] = useState(false)
  const [instrument, setInstrument] = useState("Piano")
  const [songTitle, setSongTitle] = useState("")
  const [songId, setSongId] = useState("")
  const [preview, setPreview] = useState<SheetView | null>(null)

  const load = async () => {
    setBusy(true)
    try { setItems(await listSheets({ songId: songId || undefined })) }
    finally { setBusy(false) }
  }
  useEffect(() => { load() }, [])

  const isPdf = (ct?: string, name?: string) =>
    (ct && ct.toLowerCase().includes("pdf")) || (name && name.toLowerCase().endsWith(".pdf"))

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setBusy(true)
    try {
      await uploadSheetWithSong(f, { instrument, songTitle: songTitle.trim() || undefined, songId: songId || undefined })
      setSongTitle("")
      await load()
    } finally {
      setBusy(false)
      e.currentTarget.value = ""
    }
  }

  const remove = async (id: string) => {
    if (!confirm("Delete this file?")) return
    setBusy(true)
    try { await deleteSheet(id); await load() }
    finally { setBusy(false) }
  }

  const fmt = (n:number)=> n<1024?`${n} B`: n<1048576?`${(n/1024).toFixed(1)} KB`:`${(n/1048576).toFixed(1)} MB`

  return (
    <div className="card">
      <div className="section-head">
        <h2>Sheets</h2>
        {busy && <span className="muted">Working…</span>}
      </div>

      <div className="rep-grid" style={{marginTop:12}}>
        <div className="field span-3">
          <label>Instrument</label>
          <select value={instrument} onChange={e=>setInstrument(e.target.value)} disabled={busy}>
            <option>Piano</option><option>Guitar</option><option>Other</option>
          </select>
        </div>
        <div className="field span-3">
          <label>Filter by Song ID</label>
          <input placeholder="UUID…" value={songId} onChange={e=>setSongId(e.target.value)} disabled={busy} />
        </div>
        <div className="field span-5">
          <label>Song title (optional)</label>
          <input placeholder="Link the file to a song…" value={songTitle}
                 onChange={e=>setSongTitle(e.target.value)} disabled={busy}/>
        </div>
        <div className="field span-4">
          <label>Upload</label>
          <input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={onFile} disabled={busy}/>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>File</th><th>Instrument</th><th>Song</th><th>Type</th><th>Size</th><th className="right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(f => (
            <tr key={f.id}>
              <td>{f.originalName}</td>
              <td>{f.instrument}</td>
              <td>{f.songTitle}</td>
              <td>{f.contentType}</td>
              <td>{fmt(f.sizeBytes)}</td>
              <td className="right" style={{whiteSpace:'nowrap', display:'flex', gap:8, justifyContent:'flex-end'}}>
                {isPdf(f.contentType, f.originalName)
                  ? <button className="chip" onClick={()=>setPreview(f)}>Preview</button>
                  : <a className="chip" href={downloadSheetUrl(f.id, true)} target="_blank" rel="noreferrer">Open</a>}
                <a className="chip" href={downloadSheetUrl(f.id)}>Download</a>
                <button className="chip danger" onClick={()=>remove(f.id)} disabled={busy}>Delete</button>
              </td>
            </tr>
          ))}
          {items.length===0 && <tr><td colSpan={6} className="muted">No files yet.</td></tr>}
        </tbody>
      </table>

      <Modal open={!!preview} onClose={()=>setPreview(null)} title={preview?.originalName}>
        {preview && isPdf(preview.contentType, preview.originalName)
          ? <iframe
              title="pdf-preview"
              src={downloadSheetUrl(preview.id, true)}
              style={{border:0, width:"100%", height:"100%", background:"#111"}}
            />
          : <div style={{padding:16, color:"#ccc"}}>No inline preview. Use "Open" or "Download".</div>}
      </Modal>
    </div>
  )
}
