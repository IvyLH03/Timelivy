import { useState } from 'react'
import './App.css'
import WeekSchedule from './components/WeekSchedule'

function App() {
  const [count, setCount] = useState(0)

  return (
    <WeekSchedule/>
  )
}

export default App
