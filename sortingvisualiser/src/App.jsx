import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SortingVisualizer from './components/SortingVisualizer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SortingVisualizer/>
    </>
  )
}

export default App
