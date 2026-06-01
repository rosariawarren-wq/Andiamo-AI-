export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const { input } = JSON.parse(event.body)

    if (!process.env.GOOGLE_PLACES_API_KEY) {
      // Graceful fallback — return empty so client uses its own fallback list
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ predictions: [] })
      }
    }

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&components=country:it&types=(cities)&key=${process.env.GOOGLE_PLACES_API_KEY}`
    const res = await fetch(url)
    const data = await res.json()

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
  } catch (err) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ predictions: [] })
    }
  }
}
