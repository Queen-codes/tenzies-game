import React, {useState} from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import { useEffect } from 'react'

function DieContainer() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [numberOfRolls, setNumberOfRolls] = useState(0)
  const[bestScore, setBestScore] = useState (
    JSON.parse(localStorage.getItem("bestScore")) || 0
  )

  useEffect(() => {
      localStorage.setItem("bestScore", JSON.stringify(bestScore))
  }, [bestScore])

  useEffect(() => {
      const allHeld = dice.every(die => die.isHeld)
      const firstValue = dice[0].value
      const allSameValue = dice.every(die => die.value === firstValue)
      if(allHeld && allSameValue) {
        setTenzies(true)
      }
  }, [dice])
    
  function generateDie () {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
          newDice.push(generateDie())
      }
      return newDice
  }

  function holdDice (id) {
    setDice(oldDice => oldDice.map(dice => {
      return (
        dice.id === id ? {...dice, isHeld: !dice.isHeld} : dice
      ) 
    }))
  }

  function rollDice () {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(dice => {
        return (
          dice.isHeld ? dice : generateDie()
        )
      }))
      setNumberOfRolls(oldNumberOfRolls => oldNumberOfRolls + 1)
    }
    else {
      setTenzies(false)

      if(!bestScore || numberOfRolls < bestScore ) {
        setBestScore(numberOfRolls)
      }
      setDice(allNewDice())
      setNumberOfRolls(0)

    }
   
  }

  const diceElements = dice.map(die => <Die 
    key={die.id} 
    value={die.value}  
    isHeld={die.isHeld} 
    holdDice={() => holdDice(die.id)}/> )

  return (
    <div className="main--section">
        {tenzies && <Confetti/>}
        <div className='tenzies--container'>
          <h1>Tenzies</h1> 
          <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          
          <div className="die--container">
            {diceElements}
        </div>
        <button className='tenzies--btn' onClick={rollDice}>{tenzies ? "Reset" : "Roll"}</button>

        <div className="stats">
            <div className="rolls-container">
              <span>Rolls</span>
              <span className="number">{numberOfRolls}</span>
            </div>

            <div className="best-scores">
              <span>Best Score</span>
              <span>{bestScore}</span>
            </div>
        </div>

      </div>
   </div> 
  )
}

export default DieContainer