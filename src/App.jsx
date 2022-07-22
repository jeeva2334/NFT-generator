import Home from './components/Home'
import Install from './components/Install'
import React,{ useState } from 'react'
// import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  if (window.ethereum) {
    return <Home />
  } else {
    return <Install />
  }
  return (
    <div className="App">
      {/* <h1>Hello world</h1> */}
    </div>
  )
}

export default App
