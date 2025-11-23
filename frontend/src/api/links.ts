/** Link data returned from the API */
export interface LinkView {
  id: string;
  title: string;
  url: string;
  category?: string;
  notes?: string;
  tags: string[];
  favorite: boolean;
  createdAt: string;
  songId?: string;
}

/** Data required to create a new link */
export interface LinkCreate {
  title: string;
  url: string;
  category?: string;
  notes?: string;
  tags?: string[];
  favorite?: boolean;
  songId?: string;
}

const API = "/api/links";

/**
 * Fetches all links, optionally filtered by song.
 * @param params - Optional query parameters
 * @param params.songId - Filter links by song ID
 * @returns Promise resolving to an array of links
 */
export async function listLinks(params?: { songId?: string }): Promise<LinkView[]> {
  const url = params?.songId ? `${API}?songId=${params.songId}` : API;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load links");
  return res.json();
}

/**
 * Creates a new link.
 * @param body - Link data to create
 * @returns Promise resolving to the created link
 */
export async function addLink(body: LinkCreate): Promise<LinkView> {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Failed to add link");
  return res.json();
}

/**
 * Deletes a link.
 * @param id - Link ID to delete
 */
export async function deleteLink(id: string): Promise<void> {
  const res = await fetch(`${API}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete link");
}

/**
 * Updates the favorite status of a link.
 * @param id - Link ID
 * @param value - True to mark as favorite, false otherwise
 * @returns Promise resolving to the updated link
 */
export async function setFavorite(
  id: string,
  value: boolean
): Promise<LinkView> {
  const res = await fetch(`${API}/${id}/favorite?value=${value}`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Failed to update favorite");
  return res.json();
}
