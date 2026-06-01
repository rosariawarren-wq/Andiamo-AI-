import { useState, useEffect } from 'react'

export function useBoard() {
  const [board, setBoard] = useState([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('andiamo_board')
      if (saved) setBoard(JSON.parse(saved))
    } catch (e) {}
  }, [])

  const addItem = (item) => {
    setBoard(prev => {
      if (prev.find(i => i.id === item.id && i.btype === item.btype)) return prev
      const next = [...prev, { ...item, savedAt: new Date().toISOString() }]
      try { localStorage.setItem('andiamo_board', JSON.stringify(next)) } catch (e) {}
      return next
    })
  }

  const removeItem = (id, btype) => {
    setBoard(prev => {
      const next = prev.filter(i => !(i.id === id && i.btype === btype))
      try { localStorage.setItem('andiamo_board', JSON.stringify(next)) } catch (e) {}
      return next
    })
  }

  const clearBoard = () => {
    setBoard([])
    try { localStorage.removeItem('andiamo_board') } catch (e) {}
  }

  const isSaved = (id, btype) => board.some(i => i.id === id && i.btype === btype)

  return { board, addItem, removeItem, clearBoard, isSaved }
}
