import './App.css'
import Dice from './components/Dice'
import PatternDesktop from './components/PatternDesktop'
import PatternMobile from './components/PatternMobile'
import { useState, useEffect } from 'react'

const App = () => {

  const API = 'https://api.adviceslip.com/advice'

  const [mobile, setMobile] = useState(window.innerWidth <= 550)
  const [advice, setAdvice] = useState({id: 0, advice: ""})

  const updateMedia = () => {
    setMobile(window.innerWidth <= 550)
  }

  const fetchAdvice = async () => {
    const response = await fetch(API)
    const adviceData = await response.json()
    console.log(adviceData['slip'])
    setAdvice(adviceData['slip'])
  }

  useEffect(() => {
    window.addEventListener("resize", updateMedia)
    return () => window.removeEventListener("resize", updateMedia)
  })

  useEffect(() => {
    fetchAdvice()
  }, [])

  return (
    <section className='app'>
      <h4>ADVICE #{advice.id}</h4>
      <h2>"{advice.advice}"</h2>
      {mobile ? <PatternMobile/> : <PatternDesktop/>}
      <button onClick={fetchAdvice}><Dice/></button>
    </section>
  )
}

export default App