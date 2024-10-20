import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './components/Button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header className="App-header">
        <img src={reactLogo} className="App-logo" alt="react logo" />
        <img src={viteLogo} className="App-logo" alt="vite logo" />
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <Button title="Increment" onClick={() => setCount((c) => c + 1)} />
          <Button title="Decrement" onClick={() => setCount((c) => c - 1)} />
        </p>
        <p>
          <code>count: {count}</code>
        </p>
      </header>
    </>
  )
}

export default App
