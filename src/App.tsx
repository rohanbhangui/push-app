import './App.css'
import Timer from './components/Timer'

const App = () => {
  return (
    <main className="bg-black">
      <Timer startTime={900}></Timer>
    </main>
  )
}

export default App
