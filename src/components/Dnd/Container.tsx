import update from 'immutability-helper'
import { memo, useCallback, useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
import { Button } from 'antd'

import historyCcontroller from '../../historyController'
import { Card } from './Card'
import { ItemTypes } from './ItemTypes'

const style = {
  width: 400,
}

export interface ContainerState {
  cards: any[]
}

const ITEMS = [
  {
    id: 1,
    text: 'Write a cool JS library',
  },
  {
    id: 2,
    text: 'Make it generic enough',
  },
  {
    id: 3,
    text: 'Write README',
  },
  {
    id: 4,
    text: 'Create some examples',
  },
  {
    id: 5,
    text: 'Spam in Twitter and IRC to promote it',
  },
  {
    id: 6,
    text: '???',
  },
  {
    id: 7,
    text: 'PROFIT',
  },
]

export default memo(() => {
  const [cards, setCards] = useState(ITEMS)

  useEffect(() => {
    historyCcontroller.setBaseData(ITEMS)
  }, [])

  const findCard = useCallback(
    (id: string) => {
      const card = cards.filter(c => `${c.id}` === id)[0] as {
        id: number
        text: string
      }
      return {
        card,
        index: cards.indexOf(card),
      }
    },
    [cards],
  )

  const moveCard = useCallback(
    (id: string, atIndex: number) => {
      const { card, index } = findCard(id)
      const nextState = update(cards, {
        $splice: [
          [index, 1],
          [atIndex, 0, card],
        ],
      })

      setCards(nextState)
    },
    [findCard, cards, setCards],
  )

  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }))

  const undo = () => {
    console.log(historyCcontroller.undo())
    setCards(historyCcontroller.undo() as any)
  }

  const addRecord = () => {
    historyCcontroller.addRecord(cards)
  }

  return (
    <div ref={drop} style={style}>
      <div>
      {cards.map(card => (
        <Card
          key={card.id}
          id={`${card.id}`}
          text={card.text}
          moveCard={moveCard}
          findCard={findCard}
          addRecord={addRecord}
        />
      ))}
      </div>

      <div className='mt-3'>
        <Button className='mr-3' onClick={undo}>撤消</Button>
      </div>
    </div>
  )
})
