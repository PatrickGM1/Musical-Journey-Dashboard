import { useEffect, useMemo, useState } from "react"
import type { SongCreate, SongView } from "../api/songs"
import { addSong, deleteSong, listSongs, setSongStatus } from "../api/songs"
import { uploadSheetWithSong } from "../api/sheets"
import SongSheets from "../components/SongSheets"

const STATUS: SongView["status"][] = ["LEARNING", "POLISHING", "MASTERED"]
const nextStatus = (s: SongView["status"]) => STATUS[Math.min(STATUS.indexOf(s) + 1, STATUS.length - 1)]
const prevStatus = (s: SongView["status"]) => STATUS[Math.max(STATUS.indexOf(s) - 1, 0)]

export default function RepertoirePage() {
  const [songs, setSongs] = useState<SongView[]>([])
  const [busy, setBusy] = useState(false)
  const [q, setQ] = useState("")
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [form, setForm] = useState<SongCreate>({
    title: "",
    artist: "",
    instrument: "Piano",
    status: "LEARNING",
    keySig: "",
    bpm: 120,
    notes: ""
  })

  const load = async () => {
    setBusy(true)
    try { setSongs(await listSongs()) } finally { setBusy(false) }
  }
  useEffect(() => { load() }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) return
    setBusy(true)
    try {
      await addSong(form)
      setForm({ ...form, title: "", artist: "", keySig: "", notes: "" })
      await load()
    } finally { setBusy(false) }
  }

  const handleStatus = async (id: string, s: SongView["status"]) => {
    setBusy(true)
    try { await setSongStatus(id, s); await load() } finally { setBusy(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this song?")) return
    setBusy(true)
    try { await deleteSong(id); await load() } finally { setBusy(false) }
  }

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return songs
    return songs.filter(s =>
      [s.title, s.artist, s.instrument, s.status, s.keySig]
        .filter(Boolean)
        .some(v => String(v).toLowerCase().includes(t))
    )
  }, [songs, q])

  return (
    <div className="card">
      <div className="section-head">
        <div>
          <h2>Repertoire</h2>
          <p className="muted">Add songs you’re working on and move them from Learning → Polishing → Mastered.</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleAdd} className="rep-grid">
        {/* Row 1 */}
        <div className="field span-4">
          <label htmlFor="title">Title</label>
          <input id="title" placeholder="Song title" value={form.title}
                 onChange={e=>setForm({...form, title: e.target.value})}/>
        </div>

        <div className="field span-3">
          <label htmlFor="artist">Artist / Composer</label>
          <input id="artist" placeholder="Artist" value={form.artist}
                 onChange={e=>setForm({...form, artist: e.target.value})}/>
        </div>

        <div className="field span-1">
          <label htmlFor="instrument">Instr.</label>
          <select id="instrument" value={form.instrument}
                  onChange={e=>setForm({...form, instrument: e.target.value})}>
            <option>Piano</option>
            <option>Guitar</option>
            <option>Other</option>
          </select>
        </div>

        <div className="field span-2">
          <label htmlFor="status">Status</label>
          <select id="status" value={form.status}
                  onChange={e=>setForm({...form, status: e.target.value as SongView["status"]})}>
            {STATUS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="field span-1">
          <label htmlFor="key">Key</label>
          <input id="key" placeholder="e.g., Em" value={form.keySig}
                 onChange={e=>setForm({...form, keySig: e.target.value})}/>
        </div>

        <div className="field span-1">
          <label htmlFor="bpm">BPM</label>
          <input id="bpm" type="number" min={20} max={400} value={form.bpm}
                 onChange={e=>setForm({...form, bpm: Number(e.target.value) || undefined})}/>
        </div>

        {/* Row 2 */}
        <div className="field span-8">
          <label htmlFor="notes">Notes</label>
          <input id="notes" placeholder="Fingerings, references, etc." value={form.notes}
                 onChange={e=>setForm({...form, notes: e.target.value})}/>
        </div>

        <div className="field span-3">
          <label htmlFor="search">Search</label>
          <input id="search" placeholder="Search…" value={q}
                 onChange={e=>setQ(e.target.value)}/>
        </div>

        <div className="actions span-1">
          <button disabled={busy || !form.title.trim()} aria-label="Add song">Add song</button>
        </div>
      </form>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Title</th><th>Artist</th><th>Instrument</th><th>Status</th>
            <th>Key</th><th>BPM</th><th>Notes</th><th className="right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(s => (
            <>
              <tr key={s.id}>
                <td>{s.title}</td>
                <td>{s.artist}</td>
                <td>{s.instrument}</td>
                <td><span className={`pill pill--${s.status.toLowerCase()}`}>{s.status}</span></td>
                <td>{s.keySig}</td>
                <td>{s.bpm}</td>
                <td>{s.notes}</td>
                <td className="right" style={{whiteSpace:'nowrap'}}>
                  <button className="chip" title="Toggle sheets" onClick={()=>setExpanded({...expanded, [s.id]: !expanded[s.id]})}>📎</button>
                  <button className="chip" disabled={s.status==='LEARNING'} onClick={()=>handleStatus(s.id, prevStatus(s.status))}>◀</button>
                  <button className="chip" disabled={s.status==='MASTERED'} onClick={()=>handleStatus(s.id, nextStatus(s.status))}>▶</button>
                  <button className="chip danger" onClick={()=>handleDelete(s.id)}>Delete</button>
                  <label className="chip" style={{cursor:"pointer", marginLeft: 8}}>
                    Attach Sheet
                    <input type="file" style={{display:"none"}} onChange={async (e)=>{
                      const f = e.target.files?.[0]; if(!f) return
                      try {
                        await uploadSheetWithSong(f, { songId: s.id, instrument: s.instrument, songTitle: s.title })
                        // optional: toast, reload a side panel, etc.
                        await load()
                      } finally { (e.target as HTMLInputElement).value = "" }
                    }} />
                  </label>
                </td>
              </tr>
              {expanded[s.id] && (
                <tr>
                  <td colSpan={8} style={{background:"#161616"}}>
                    <SongSheets songId={s.id} />
                  </td>
                </tr>
              )}
            </>
          ))}
          {filtered.length === 0 && (
            <tr><td colSpan={8} className="muted">No songs yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
