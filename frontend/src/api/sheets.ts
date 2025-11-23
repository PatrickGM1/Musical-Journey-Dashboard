/** Sheet music file metadata returned from the API */
export type SheetView = {
  id: string;
  originalName: string;
  contentType?: string;
  sizeBytes: number;
  instrument?: string;
  songTitle?: string;
  uploadedAt: string;
};

/**
 * Fetches all sheet music files, optionally filtered by song.
 * @param params - Optional query parameters
 * @param params.songId - Filter sheets by song ID
 * @returns Promise resolving to an array of sheets
 */
export async function listSheets(params?: { songId?: string }) {
  const u = new URL("/api/sheets", window.location.origin);
  if (params?.songId) u.searchParams.set("songId", params.songId);
  const r = await fetch(u.toString().replace(window.location.origin, ""));
  if (!r.ok) throw new Error("Failed to load sheets");
  return r.json();
}

/**
 * Uploads a sheet music file.
 * @param file - The file to upload (PDF, image, etc.)
 * @param meta - Optional metadata
 * @param meta.instrument - Instrument type
 * @param meta.songTitle - Song title for the sheet
 * @returns Promise resolving to the created sheet metadata
 */
export async function uploadSheet(
  file: File,
  meta?: { instrument?: string; songTitle?: string }
): Promise<SheetView> {
  const fd = new FormData();
  fd.append("file", file);
  if (meta?.instrument) fd.append("instrument", meta.instrument);
  if (meta?.songTitle) fd.append("songTitle", meta.songTitle);
  const r = await fetch("/api/sheets", { method: "POST", body: fd });
  if (!r.ok) throw new Error("Upload failed");
  return r.json();
}

/**
 * Generates a download URL for a sheet music file.
 * @param id - Sheet ID
 * @param inline - If true, opens in browser; if false, downloads as attachment
 * @returns Download URL
 */
export function downloadSheetUrl(id: string, inline: boolean = false) {
  return `/api/sheets/${id}/download${inline ? '?inline=true' : ''}`;
}

/**
 * Deletes a sheet music file.
 * @param id - Sheet ID to delete
 */
export async function deleteSheet(id: string) {
  const r = await fetch(`/api/sheets/${id}`, { method: "DELETE" });
  if (!r.ok) throw new Error("Delete failed");
}

/**
 * Uploads a sheet music file and links it to a song.
 * @param file - The file to upload
 * @param meta - Metadata including optional song link
 * @param meta.instrument - Instrument type
 * @param meta.songTitle - Song title
 * @param meta.songId - Song ID to link the sheet to
 * @returns Promise resolving to the created sheet metadata
 */
export async function uploadSheetWithSong(
  file: File,
  meta: { instrument?: string; songTitle?: string; songId?: string }
) {
  const fd = new FormData();
  fd.append("file", file);
  if (meta.instrument) fd.append("instrument", meta.instrument);
  if (meta.songTitle) fd.append("songTitle", meta.songTitle);
  if (meta.songId) fd.append("songId", meta.songId);
  const r = await fetch("/api/sheets", { method: "POST", body: fd });
  if (!r.ok) throw new Error("Upload failed");
  return r.json();
}
