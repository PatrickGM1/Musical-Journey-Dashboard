import { useEffect, useState } from 'react'
import type { PracticeView } from '../api/practice'
import { addPractice, deletePractice, listPractice } from '../api/practice'

/** Returns today's date in YYYY-MM-DD format */
const today = () => new Date().toISOString().slice(0, 10)

/**
 * PracticeLog Component
 * 
 * Manages practice session logging with a form and table view.
 * Users can record practice sessions with details like date, instrument,
 * focus area, duration, notes, and mood.
 */
export default function PracticeLog() {
  const [items, setItems] = useState<PracticeView[]>([])
  const [busy, setBusy] = useState(false)
  const [form, setForm] = useState({
    date: today(),
    instrument: 'Piano',
    focus: '',
    durationMin: 30,
    notes: '',
    mood: ''
  })

  const load = async () => {
    setBusy(true)
    try { setItems(await listPractice()) } finally { setBusy(false) }
  }
  useEffect(() => { load() }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    try {
      await addPractice(form)
      setForm({ ...form, focus: '', notes: '' })
      await load()
    } finally { setBusy(false) }
  }

  const remove = async (id: string) => {
    setBusy(true)
    try { await deletePractice(id); await load() } finally { setBusy(false) }
  }

  return (
    <div className="card">
      <h2>Practice Log</h2>

      <form onSubmit={submit} className="grid">
        <div className="field">
          <label htmlFor="date">Date</label>
          <input id="date" type="date"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })} />
        </div>

        <div className="field">
          <label htmlFor="instrument">Instrument</label>
          <select id="instrument"
            value={form.instrument}
            onChange={e => setForm({ ...form, instrument: e.target.value })}>
            <option>Piano</option>
            <option>Guitar</option>
            <option>Other</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="focus">Focus</label>
          <input id="focus" placeholder="e.g., Em arpeggios"
            value={form.focus}
            onChange={e => setForm({ ...form, focus: e.target.value })} />
        </div>

        <div className="field">
          <label htmlFor="duration">Minutes</label>
          <input id="duration" type="number" min={1}
            value={form.durationMin}
            onChange={e => setForm({ ...form, durationMin: Number(e.target.value) })} />
        </div>

        <div className="field">
          <label htmlFor="notes">Notes</label>
          <input id="notes" placeholder="Any quick notes"
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })} />
        </div>

        <div className="field">
          <label htmlFor="mood">Mood</label>
          <input id="mood" placeholder="..."
            value={form.mood}
            onChange={e => setForm({ ...form, mood: e.target.value })} />
        </div>

        <div className="right">
          <button disabled={busy}>Add</button>
        </div>
      </form>


      <table>
        <thead><tr><th>Date</th><th>Instrument</th><th>Focus</th><th>Duration</th><th>Notes</th><th>Mood</th><th /></tr></thead>
        <tbody>
          {items.map(p => (
            <tr key={p.id}>
              <td>{p.date}</td>
              <td>{p.instrument}</td>
              <td>{p.focus}</td>
              <td>{p.durationMin} min</td>
              <td>{p.notes}</td>
              <td>{p.mood}</td>
              <td><button className="link" onClick={() => remove(p.id)}>Delete</button></td>
            </tr>
          ))}
          {items.length === 0 && !busy && (
            <tr><td colSpan={7} style={{ opacity: .6 }}>No entries yet. Add one above.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
