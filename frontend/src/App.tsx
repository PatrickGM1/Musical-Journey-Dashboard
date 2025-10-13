import PracticeLog from './components/PracticeLog'
import './index.css'

export default function App() {
  return (
    <div className="container">
      <header>
        <h1>Musical Journey Dashboard</h1>
        <p>Track your piano and guitar progress</p>
      </header>

      <PracticeLog />
    </div>

  )
}
