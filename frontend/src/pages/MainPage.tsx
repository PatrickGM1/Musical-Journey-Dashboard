import { Link } from "react-router-dom"

type Tile = {
    to?: string
    title: string
    subtitle: string
    wip?: boolean
}

const tiles: Tile[] = [
    { to: "/practice", title: "Practice", subtitle: "Log sessions, track minutes" },
    { to: "/repertoire", title: "Repertoire", subtitle: "Songs you’re learning" },
    { to: "/sheets", title: "Sheets", subtitle: "PDFs, images, MIDI" },
    { to: "/links", title: "Links", subtitle: "Tutorials & references" },
]

export default function MainPage() {
    return (
        <div className="main-page">
            <div className="tiles">
                {tiles.map((t) => {
                    const content = (
                        <>
                            <div className="tile-head">
                                <span className="tile-title">{t.title}</span>
                                {t.wip && <span className="badge">WIP</span>}
                            </div>
                            <span className="tile-sub">{t.subtitle}</span>
                        </>
                    )

                    return t.to ? (
                        <Link key={t.title} to={t.to} className={`tile ${t.wip ? "tile--wip" : ""}`}>
                            {content}
                        </Link>
                    ) : (
                        <div key={t.title} className="tile tile--disabled">{content}</div>
                    )
                })}
            </div>
        </div>
    )
}
