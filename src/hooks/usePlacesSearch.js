import { useState, useEffect, useRef } from 'react'

export function usePlacesSearch(town, sectionHint = '') {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const abortRef = useRef(null)

  useEffect(() => {
    if (!town || town.length < 2) {
      setResults([])
      return
    }

    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    fetch('/api/places-search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: sectionHint, town, type: sectionHint }),
      signal: controller.signal
    })
      .then(r => r.json())
      .then(data => {
        setResults(data.results || [])
        setLoading(false)
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setResults([])
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [town, sectionHint])

  return { results, loading }
}

export function getPlacesPhotoUrl(photoRef, maxWidth = 800) {
  if (!photoRef) return null
  return `/api/places-photo?ref=${encodeURIComponent(photoRef)}&maxWidth=${maxWidth}`
}
