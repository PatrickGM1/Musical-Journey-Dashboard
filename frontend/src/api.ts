// ---------- PRACTICE LOGS ----------

export type PracticeView = {
  id: string
  date: string
  instrument: string
  focus?: string
  durationMin: number
  notes?: string
  mood?: string
}



export async function listPractice(): Promise<PracticeView[]> {
  const r = await fetch('/api/practice')
  if (!r.ok) throw new Error('Failed to load practice logs')
  return r.json()
}

export async function addPractice(payload: Partial<PracticeView>) {
  const r = await fetch('/api/practice', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!r.ok) throw new Error('Failed to create practice log')
  return r.json()
}

export async function deletePractice(id: string) {
  const r = await fetch(`/api/practice/${id}`, { method: 'DELETE' })
  if (!r.ok) throw new Error('Failed to delete')
}


// ---------- SONGS ----------
export type SongView = {
  id: string
  title: string
  artist?: string
  instrument: string
  status: "LEARNING" | "POLISHING" | "MASTERED"
  keySig?: string
  bpm?: number
  notes?: string
}

export type SongCreate = {
  title: string
  artist?: string
  instrument: string
  status?: SongView["status"]
  keySig?: string
  bpm?: number
  notes?: string
}

export async function listSongs(): Promise<SongView[]> {
  const r = await fetch("/api/songs")
  if (!r.ok) throw new Error("Failed to load songs")
  return r.json()
}

export async function addSong(payload: SongCreate): Promise<SongView> {
  const r = await fetch("/api/songs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!r.ok) throw new Error("Failed to add song")
  return r.json()
}

export async function setSongStatus(id: string, status: SongView["status"]): Promise<SongView> {
  const r = await fetch(`/api/songs/${id}/status/${status}`, { method: "PATCH" })
  if (!r.ok) throw new Error("Failed to update status")
  return r.json()
}

export async function deleteSong(id: string): Promise<void> {
  const r = await fetch(`/api/songs/${id}`, { method: "DELETE" })
  if (!r.ok) throw new Error("Failed to delete song")
}
