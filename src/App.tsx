import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Cards } from './components/Cards'
import './style/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Cards></Cards>
    </>
  )
}

export default App
