export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const { messages, system } = JSON.parse(event.body)

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 1024,
        system: system || "You are Andiamo AI — a warm, knowledgeable Italian travel assistant. Give concise, practical, specific advice. Use Italian phrases occasionally for personality (like 'Magnifico!', 'Andiamo!', 'Perfetto!'). Reference real places, real costs and practical tips. Be enthusiastic about Italian food, culture, and hidden gems.",
        messages
      })
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('Anthropic API error:', errText)
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'AI service error', content: 'Mi dispiace — I\'m having trouble connecting. Please check your API key and try again.' })
      }
    }

    const data = await response.json()
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: data.content[0].text })
    }
  } catch (err) {
    console.error('AI function error:', err)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message, content: 'An error occurred. Please try again.' })
    }
  }
}
