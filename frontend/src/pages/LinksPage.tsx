import { useEffect, useState } from "react";
import type { LinkView } from "../api/links";
import { listLinks, addLink, deleteLink} from "../api/links"; 

export default function LinksPage() {
  const [links, setLinks] = useState<LinkView[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLinks(await listLinks());
  };

  useEffect(() => {
    load();
  }, []);

  const onAdd = async () => {
    if (!title || !url) return alert("Please fill title and URL");
    setBusy(true);
    await addLink({ title, url, category, notes });
    setTitle("");
    setUrl("");
    setCategory("");
    setNotes("");
    await load();
    setBusy(false);
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this link?")) return;
    await deleteLink(id);
    await load();
  };

  return (
    <div className="card">
      <h2>Links</h2>
      <div className="rep-grid" style={{ marginTop: 12 }}>
        <input
          className="span-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={busy}
        />
        <input
          className="span-6"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={busy}
        />
        <input
          className="span-2"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={busy}
        />
        <input
          className="span-8"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          disabled={busy}
        />
        <div className="actions">
          <button onClick={onAdd} disabled={busy}>
            Add Link
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Notes</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {links.map((l) => (
            <tr key={l.id}>
              <td>
                <a href={l.url} target="_blank" rel="noreferrer">
                  {l.title}
                </a>
              </td>
              <td>{l.category || "-"}</td>
              <td>{l.notes || "-"}</td>
              <td>{new Date(l.createdAt).toLocaleDateString()}</td>
              <td>
                <button className="chip danger" onClick={() => onDelete(l.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {links.length === 0 && (
            <tr>
              <td colSpan={5} className="muted">
                No links yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
