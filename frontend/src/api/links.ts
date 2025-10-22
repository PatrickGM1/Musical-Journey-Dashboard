export interface LinkView {
  id: string
  title: string
  url: string
  category?: string
  notes?: string
  createdAt: string
}

export interface LinkCreate {
  title: string
  url: string
  category?: string
  notes?: string
}

const API = "/api/links"

export async function listLinks(): Promise<LinkView[]> {
  const res = await fetch(API)
  return res.json()
}

export async function addLink(body: LinkCreate): Promise<LinkView> {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
  return res.json()
}

export async function deleteLink(id: string): Promise<void> {
  await fetch(`${API}/${id}`, { method: "DELETE" })
}
