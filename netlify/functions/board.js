// Board sync with Neon DB (Clerk-authenticated)
// Uses NEON_DATABASE_URL environment variable

async function getDbClient() {
  if (!process.env.NEON_DATABASE_URL) return null
  try {
    // Dynamic import for ESM compatibility in Netlify functions
    const { neon } = await import('@neondatabase/serverless')
    return neon(process.env.NEON_DATABASE_URL)
  } catch (e) {
    console.warn('Neon client not available:', e.message)
    return null
  }
}

async function verifyClerkToken(token) {
  if (!token || !process.env.CLERK_SECRET_KEY) return null
  try {
    const res = await fetch('https://api.clerk.com/v1/tokens/verify', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.sub || data.user_id || null
  } catch (e) {
    return null
  }
}

export async function handler(event) {
  const authHeader = event.headers.authorization || ''
  const token = authHeader.replace('Bearer ', '')
  const userId = await verifyClerkToken(token)

  // If no auth or no DB, return graceful response
  if (!userId) {
    return {
      statusCode: 401,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Unauthorized' })
    }
  }

  const sql = await getDbClient()
  if (!sql) {
    return {
      statusCode: 503,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Database not configured', items: [] })
    }
  }

  try {
    // Ensure table exists
    await sql`
      CREATE TABLE IF NOT EXISTS board_items (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL,
        items JSONB NOT NULL DEFAULT '[]',
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `

    if (event.httpMethod === 'GET') {
      const rows = await sql`SELECT items FROM board_items WHERE user_id = ${userId} LIMIT 1`
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: rows[0]?.items || [] })
      }
    }

    if (event.httpMethod === 'POST') {
      const { items } = JSON.parse(event.body)
      await sql`
        INSERT INTO board_items (user_id, items, updated_at)
        VALUES (${userId}, ${JSON.stringify(items)}, NOW())
        ON CONFLICT (user_id)
        DO UPDATE SET items = ${JSON.stringify(items)}, updated_at = NOW()
      `
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true })
      }
    }

    if (event.httpMethod === 'DELETE') {
      await sql`DELETE FROM board_items WHERE user_id = ${userId}`
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true })
      }
    }

    return { statusCode: 405, body: 'Method Not Allowed' }
  } catch (err) {
    console.error('Board DB error:', err)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message })
    }
  }
}
