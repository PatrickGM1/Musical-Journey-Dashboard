import { NavLink, Link } from "react-router-dom"
import "./topbar.css"

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar__inner">
        <nav className="nav">
          <NavLink to="/practice" className="nav__link">Practice</NavLink>
          <NavLink to="/repertoire" className="nav__link">Repertoire</NavLink>

        </nav>

        <Link to="/" className="brand brand--right" aria-label="Go to main page">
          <img src="/logo.svg" alt="MusicDash logo" />
          <span>MusicDash</span>
        </Link>
      </div>
    </div>
  )
}
