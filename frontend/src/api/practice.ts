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
