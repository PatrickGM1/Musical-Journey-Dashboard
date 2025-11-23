/** Song data returned from the API */
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

/** Data required to create a new song */
export type SongCreate = {
  title: string
  artist?: string
  instrument: string
  status?: SongView["status"]
  keySig?: string
  bpm?: number
  notes?: string
}

/**
 * Fetches all songs from the API.
 * @returns Promise resolving to an array of songs
 */
export async function listSongs(): Promise<SongView[]> {
  const r = await fetch("/api/songs")
  if (!r.ok) throw new Error("Failed to load songs")
  return r.json()
}

/**
 * Creates a new song.
 * @param payload - Song data to create
 * @returns Promise resolving to the created song
 */
export async function addSong(payload: SongCreate): Promise<SongView> {
  const r = await fetch("/api/songs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!r.ok) throw new Error("Failed to add song")
  return r.json()
}

/**
 * Updates a song's learning status.
 * @param id - Song ID
 * @param status - New status (LEARNING, POLISHING, or MASTERED)
 * @returns Promise resolving to the updated song
 */
export async function setSongStatus(id: string, status: SongView["status"]): Promise<SongView> {
  const r = await fetch(`/api/songs/${id}/status/${status}`, { method: "PATCH" })
  if (!r.ok) throw new Error("Failed to update status")
  return r.json()
}

/**
 * Deletes a song.
 * @param id - Song ID to delete
 */
export async function deleteSong(id: string): Promise<void> {
  const r = await fetch(`/api/songs/${id}`, { method: "DELETE" })
  if (!r.ok) throw new Error("Failed to delete song")
}
