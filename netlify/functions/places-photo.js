export async function handler(event) {
  const { ref, maxWidth = '800' } = event.queryStringParameters || {}

  if (!process.env.GOOGLE_PLACES_API_KEY || !ref) {
    return { statusCode: 400, body: 'Missing ref' }
  }

  try {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${encodeURIComponent(ref)}&key=${process.env.GOOGLE_PLACES_API_KEY}`
    const res = await fetch(apiUrl)

    if (!res.ok) {
      return { statusCode: 502, body: 'Photo fetch failed' }
    }

    const buffer = await res.arrayBuffer()
    const contentType = res.headers.get('content-type') || 'image/jpeg'

    return {
      statusCode: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
      body: Buffer.from(buffer).toString('base64'),
      isBase64Encoded: true,
    }
  } catch (err) {
    return { statusCode: 502, body: 'Error' }
  }
}
