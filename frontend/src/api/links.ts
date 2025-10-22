export interface LinkView {
  id: string;
  title: string;
  url: string;
  category?: string;
  notes?: string;
  tags: string[];
  favorite: boolean;
  createdAt: string;
}

export interface LinkCreate {
  title: string;
  url: string;
  category?: string;
  notes?: string;
  tags?: string[];
  favorite?: boolean;
}

const API = "/api/links";

export async function listLinks(): Promise<LinkView[]> {
  const res = await fetch(API);
  if (!res.ok) throw new Error("Failed to load links");
  return res.json();
}

export async function addLink(body: LinkCreate): Promise<LinkView> {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Failed to add link");
  return res.json();
}

export async function deleteLink(id: string): Promise<void> {
  const res = await fetch(`${API}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete link");
}

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
