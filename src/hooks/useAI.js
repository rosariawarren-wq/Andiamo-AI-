import { useState } from 'react'

export function useAI() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const sendMessage = async (content) => {
    const userMsg = { role: 'user', content }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setLoading(true)
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      })
      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }])
    } catch (e) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Mi dispiace — I\'m having trouble connecting right now. Please check your API key configuration and try again. In the meantime, explore our curated guides above!'
      }])
    } finally {
      setLoading(false)
    }
  }

  const clearMessages = () => setMessages([])

  return { messages, sendMessage, loading, clearMessages }
}
