import React from "react";

/**
 * Modal Component
 * 
 * A reusable modal dialog for displaying content in an overlay.
 * Includes a backdrop, title bar, and close functionality.
 * 
 * @param {boolean} open - Whether the modal is visible
 * @param {() => void} onClose - Callback when the modal is closed
 * @param {string} [title] - Optional title for the modal header
 * @param {React.ReactNode} children - Content to display in the modal body
 * 
 * @example
 * <Modal open={showModal} onClose={() => setShowModal(false)} title="Preview">
 *   <iframe src="..." />
 * </Modal>
 */
export default function Modal({
  open, onClose, children, title
}: { open: boolean; onClose: () => void; title?: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div style={backdrop} onClick={onClose}>
      <div style={sheet} onClick={e => e.stopPropagation()}>
        <div style={head}>
          <strong>{title || "Preview"}</strong>
          <button onClick={onClose} style={closeBtn}>×</button>
        </div>
        <div style={body}>{children}</div>
      </div>
    </div>
  );
}

const backdrop: React.CSSProperties = {
  position: "fixed", inset: 0, background: "rgba(0,0,0,.6)", display: "grid",
  placeItems: "center", zIndex: 1000
};
const sheet: React.CSSProperties = {
  width: "min(1100px, 92vw)", height: "min(80vh, 900px)",
  background: "#181818", border: "1px solid #242424", borderRadius: 14,
  boxShadow: "0 18px 70px rgba(0,0,0,.45)", display: "flex", flexDirection: "column"
};
const head: React.CSSProperties = {
  display: "flex", justifyContent: "space-between", alignItems: "center",
  padding: "10px 14px", borderBottom: "1px solid #242424", color: "#fff"
};
const body: React.CSSProperties = { flex: 1, overflow: "hidden", background: "#111" };
const closeBtn: React.CSSProperties = {
  background: "transparent", color: "#fff", border: "1px solid #333",
  borderRadius: 8, padding: "2px 10px", cursor: "pointer"
};
