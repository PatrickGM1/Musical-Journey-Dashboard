/** Practice session data returned from the API */
export type PracticeView = {
  id: string
  date: string
  instrument: string
  focus?: string
  durationMin: number
  notes?: string
  mood?: string
}

/**
 * Fetches all practice session logs.
 * @returns Promise resolving to an array of practice sessions
 */
export async function listPractice(): Promise<PracticeView[]> {
  const r = await fetch('/api/practice')
  if (!r.ok) throw new Error('Failed to load practice logs')
  return r.json()
}

/**
 * Creates a new practice log entry.
 * @param payload - Practice session data
 * @returns Promise resolving to the created practice log
 */
export async function addPractice(payload: Partial<PracticeView>) {
  const r = await fetch('/api/practice', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!r.ok) throw new Error('Failed to create practice log')
  return r.json()
}

/**
 * Deletes a practice log entry.
 * @param id - Practice log ID to delete
 */
export async function deletePractice(id: string) {
  const r = await fetch(`/api/practice/${id}`, { method: 'DELETE' })
  if (!r.ok) throw new Error('Failed to delete')
}
