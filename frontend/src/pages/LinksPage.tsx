import { useEffect, useMemo, useState } from "react";
import {
  listLinks,
  addLink,
  deleteLink,
  setFavorite,
  type LinkView,
} from "../api/links";

/**
 * LinksPage Component
 * 
 * Manages web links and resources for tutorials, backing tracks, references, etc.
 * Supports adding, deleting, favoriting, tagging, and filtering links.
 * Links can be organized by category and searched by multiple fields.
 */
export default function LinksPage() {
  const [links, setLinks] = useState<LinkView[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [tagsStr, setTagsStr] = useState("");
  const [favOnly, setFavOnly] = useState(false);
  const [busy, setBusy] = useState(false);
  const [q, setQ] = useState("");

  const load = async () => {
    setLinks(await listLinks());
  };
  useEffect(() => {
    load();
  }, []);

  const onAdd = async () => {
    if (!title || !url) return alert("Please fill title and URL");
    setBusy(true);
    const tags = tagsStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    await addLink({ title, url, category, notes, tags });
    setTitle("");
    setUrl("");
    setCategory("");
    setNotes("");
    setTagsStr("");
    await load();
    setBusy(false);
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this link?")) return;
    setBusy(true);
    await deleteLink(id);
    await load();
    setBusy(false);
  };

  const toggleFav = async (l: LinkView) => {
    setBusy(true);
    await setFavorite(l.id, !l.favorite);
    await load();
    setBusy(false);
  };

  const filtered = useMemo(() => {
    let data = links;
    if (favOnly) data = data.filter((l) => l.favorite);
    const t = q.trim().toLowerCase();
    if (!t) return data;
    return data.filter((l) =>
      [l.title, l.url, l.category, l.notes, ...(l.tags || [])].some((v) =>
        (v || "").toLowerCase().includes(t)
      )
    );
  }, [links, favOnly, q]);

  return (
    <div className="card">
      <div className="section-head">
        <h2>Links</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            placeholder="Search…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input
              type="checkbox"
              checked={favOnly}
              onChange={(e) => setFavOnly(e.target.checked)}
            />
            Favorites only
          </label>
        </div>
      </div>

      <div className="rep-grid" style={{ marginTop: 12 }}>
        <div className="field span-3">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={busy}
          />
        </div>
        <div className="field span-4">
          <label>URL</label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={busy}
          />
        </div>
        <div className="field span-2">
          <label>Category</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={busy}
          />
        </div>
        <div className="field span-3">
          <label>Tags (comma-separated)</label>
          <input
            placeholder="theory, arpeggios"
            value={tagsStr}
            onChange={(e) => setTagsStr(e.target.value)}
            disabled={busy}
          />
        </div>
        <div className="field span-9">
          <label>Notes</label>
          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={busy}
          />
        </div>
        <div className="actions span-3">
          <button onClick={onAdd} disabled={busy || !title || !url}>
            Add Link
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th style={{ width: 36 }}></th>
            <th>Title</th>
            <th>Category</th>
            <th>Tags</th>
            <th>Notes</th>
            <th>Created</th>
            <th className="right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((l) => (
            <tr key={l.id}>
              <td>
                <button
                  className="chip"
                  onClick={() => toggleFav(l)}
                  title={l.favorite ? "Unstar" : "Star"}
                >
                  {l.favorite ? "★" : "☆"}
                </button>
              </td>
              <td>
                <a href={l.url} target="_blank" rel="noreferrer">
                  {l.title}
                </a>
              </td>
              <td>{l.category || "-"}</td>
              <td>
                {(l.tags || []).length === 0 ? (
                  <span className="muted">—</span>
                ) : (
                  l.tags.map((t) => (
                    <span key={t} className="pill" style={{ marginRight: 6 }}>
                      {t}
                    </span>
                  ))
                )}
              </td>
              <td>{l.notes || "-"}</td>
              <td>{new Date(l.createdAt).toLocaleDateString()}</td>
              <td className="right">
                <button
                  className="chip danger"
                  onClick={() => onDelete(l.id)}
                  disabled={busy}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={7} className="muted">
                No links match.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
