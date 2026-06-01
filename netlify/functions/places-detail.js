export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const { place_id } = JSON.parse(event.body)

    if (!process.env.GOOGLE_PLACES_API_KEY) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ result: null })
      }
    }

    const fields = 'name,formatted_address,formatted_phone_number,opening_hours,photos,price_level,rating,reviews,url,website,geometry'
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(place_id)}&fields=${fields}&key=${process.env.GOOGLE_PLACES_API_KEY}`
    const res = await fetch(url)
    const data = await res.json()

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ result: data.result || null })
    }
  } catch (err) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ result: null })
    }
  }
}
