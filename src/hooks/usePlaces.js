import { useState, useCallback } from 'react'

export function usePlaces(fallbackData = []) {
  const [results, setResults] = useState(fallbackData)
  const [loading, setLoading] = useState(false)
  const [nearbyBanner, setNearbyBanner] = useState(null)

  const search = useCallback(async (query, town, type) => {
    if (!town && !query) {
      setResults(fallbackData)
      setNearbyBanner(null)
      return
    }
    setLoading(true)
    try {
      // 1. Try places-search
      const res = await fetch('/api/places-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, town, type })
      })
      if (res.ok) {
        const data = await res.json()
        if (data.results && data.results.length > 0) {
          setResults(data.results)
          setLoading(false)
          return
        }
      }
    } catch (e) {}

    // 2. Filter fallback data by town
    if (town) {
      const townLower = town.toLowerCase()
      const filtered = fallbackData.filter(item =>
        item.town?.toLowerCase().includes(townLower) ||
        item.region?.toLowerCase().includes(townLower) ||
        item.name?.toLowerCase().includes(townLower)
      )
      if (filtered.length > 0) {
        setResults(filtered)
        setNearbyBanner(null)
        setLoading(false)
        return
      }

      // 3. Check nearby towns
      try {
        const { nearbyTowns } = await import('../data/nearby.js')
        const townKey = Object.keys(nearbyTowns).find(k =>
          k.toLowerCase() === townLower
        )
        if (townKey) {
          const nearby = nearbyTowns[townKey]
          const nearbyNames = nearby.map(n => n.town.toLowerCase())
          const nearbyResults = fallbackData.filter(item =>
            nearbyNames.includes(item.town?.toLowerCase()) ||
            nearbyNames.includes(item.region?.toLowerCase())
          )
          if (nearbyResults.length > 0) {
            setResults(nearbyResults)
            setNearbyBanner(`Showing results near ${townKey}`)
            setLoading(false)
            return
          }
        }
      } catch (e) {}
    }

    // 4. Fall through to all data
    setResults(fallbackData)
    setNearbyBanner(town ? `Showing all results — no exact matches for ${town}` : null)
    setLoading(false)
  }, [fallbackData])

  const reset = useCallback(() => {
    setResults(fallbackData)
    setNearbyBanner(null)
  }, [fallbackData])

  return { results, loading, nearbyBanner, search, reset }
}
