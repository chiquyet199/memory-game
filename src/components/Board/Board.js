import React, {useState, useEffect} from 'react'
import Card from '../Card/Card'
import './Board.css'

const Board = props => {
  const [cards, setCards] = useState(props.cards)
  const [freezed, setFreezed] = useState(false)
  const [checker, setChecker] = useState([])
  const [completed, setCompleted] = useState([])
  const reset = () => {
    setChecker([])
    setCompleted([])
  }
  const onCardClick = card => () => {
    if (freezed) return
    if (checker.length <= 2) {
      const newChecker = [...checker, card]
      setChecker(newChecker)
      const matched =
        newChecker.length === 2 &&
        newChecker[0].type === newChecker[1].type
      if (matched) {
        setCompleted([...completed, checker[0].type])
      }
      if (newChecker.length === 2) {
        setFreezed(true)
        setTimeout(() => {
          setFreezed(false)
          setChecker([])
        }, 1000)
      }
    }
  }

  useEffect(() => {
    const newCards = cards.map(card => ({
      ...card,
      flipped:
        checker.find(c => c.id === card.id) ||
        completed.includes(card.type),
    }))
    setCards(newCards)
  }, [checker, completed])

  return (
    <div className="Board">
      <div className="control">
        <button onClick={reset}>Reset</button>
      </div>
      <div className="content">
        {cards.map(card => (
          <Card {...card} onClick={onCardClick(card)} key={card.id} />
        ))}
      </div>
    </div>
  )
}

export default Board
