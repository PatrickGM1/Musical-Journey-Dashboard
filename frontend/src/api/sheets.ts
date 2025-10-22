export type SheetView = {
  id: string
  originalName: string
  contentType?: string
  sizeBytes: number
  instrument?: string
  songTitle?: string
  uploadedAt: string
}

export async function listSheets(): Promise<SheetView[]> {
  const r = await fetch('/api/sheets')
  if (!r.ok) throw new Error('Failed to load sheets'); return r.json()
}

export async function uploadSheet(file: File, meta?: { instrument?: string; songTitle?: string }): Promise<SheetView> {
  const fd = new FormData()
  fd.append('file', file)
  if (meta?.instrument) fd.append('instrument', meta.instrument)
  if (meta?.songTitle)  fd.append('songTitle',  meta.songTitle)
  const r = await fetch('/api/sheets', { method:'POST', body: fd })
  if (!r.ok) throw new Error('Upload failed'); return r.json()
}

export function downloadSheetUrl(id: string){ return `/api/sheets/${id}/download` }

export async function deleteSheet(id: string){
  const r = await fetch(`/api/sheets/${id}`, { method:'DELETE' })
  if (!r.ok) throw new Error('Delete failed')
}
