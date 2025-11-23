import { useEffect, useState } from "react"
import { listLinks, deleteLink, type LinkView } from "../api/links"

/**
 * SongLinks Component
 * 
 * Displays web links associated with a specific song.
 * Shows chips with clickable links and delete buttons.
 * 
 * @param {string} songId - The ID of the song to display links for
 * @param {() => void} [onUpdate] - Optional callback triggered when links should be reloaded
 * 
 * @example
 * <SongLinks songId="123" onUpdate={handleLinksUpdate} />
 */
function SongLinks({ songId, onUpdate }: { songId: string; onUpdate?: () => void }) {
  const [links, setLinks] = useState<LinkView[]>([])
  const [busy, setBusy] = useState(false)
  const load = async () => {
    setBusy(true)
    try { setLinks(await listLinks({ songId })) }
    finally { setBusy(false) }
  }
  useEffect(()=>{ load() }, [songId])
  
  useEffect(() => {
    if (onUpdate) {
      load()
    }
  }, [onUpdate])

  if (!links || links.length === 0) return <div className="muted" style={{padding:"8px 0"}}>No links attached.</div>

  return (
    <div style={{padding:"8px 0"}}>
      {links.map(link => (
        <span key={link.id} className="chip" style={{marginRight:8}}>
          <a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>
          <button className="chip danger" onClick={async ()=>{
            if (!confirm("Delete this link?")) return
            setBusy(true)
            try { await deleteLink(link.id); await load() }
            finally { setBusy(false) }
          }} disabled={busy}>×</button>
        </span>
      ))}
    </div>
  )
}
export default SongLinks
