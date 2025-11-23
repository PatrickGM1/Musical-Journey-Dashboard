import { Routes, Route, Navigate } from "react-router-dom";
import TopBar from "./components/TopBar";
import MainPage from "./pages/MainPage";
import PracticePage from "./pages/PracticePage";
import RepertoirePage from "./pages/RepertoirePage";
import SheetsPage from "./pages/SheetsPage";
import LinksPage from "./pages/LinksPage";

import "./index.css";

/**
 * Main application component.
 * Sets up routing and layout for the Musical Journey Dashboard.
 */
export default function App() {
  return (
    <>
      <TopBar />
      <div className="container">
        <header>
          <h1>Musical Journey Dashboard</h1>
          <p>Track your piano and guitar progress</p>
        </header>

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/repertoire" element={<RepertoirePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/sheets" element={<SheetsPage />} />
          <Route path="/links" element={<LinksPage />} />
        </Routes>
      </div>
    </>
  );
}
