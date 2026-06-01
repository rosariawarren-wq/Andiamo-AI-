import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'

export function useBoard() {
  const [board, setBoard] = useState([])
  const { user } = useUser()

  useEffect(() => {
    try {
      const saved = localStorage.getItem('andiamo_board')
      if (saved) setBoard(JSON.parse(saved))
    } catch (e) {
      console.warn('Failed to load board from localStorage', e)
    }
  }, [])

  const addItem = (item) => {
    setBoard(prev => {
      if (prev.find(i => i.id === item.id && i.btype === item.btype)) return prev
      const next = [...prev, { ...item, savedAt: new Date().toISOString() }]
      try { localStorage.setItem('andiamo_board', JSON.stringify(next)) } catch (e) {}
      if (user) syncToCloud(next)
      return next
    })
  }

  const removeItem = (id, btype) => {
    setBoard(prev => {
      const next = prev.filter(i => !(i.id === id && i.btype === btype))
      try { localStorage.setItem('andiamo_board', JSON.stringify(next)) } catch (e) {}
      if (user) syncToCloud(next)
      return next
    })
  }

  const clearBoard = () => {
    setBoard([])
    try { localStorage.removeItem('andiamo_board') } catch (e) {}
    if (user) syncToCloud([])
  }

  const isSaved = (id, btype) => board.some(i => i.id === id && i.btype === btype)

  const syncToCloud = async (items) => {
    try {
      await fetch('/api/board', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
      })
    } catch (e) {
      // Silently fail — local storage is the source of truth
    }
  }

  return { board, addItem, removeItem, clearBoard, isSaved }
}
