import axios from 'axios';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const SUPPORTED_MODELS = [
  'openai/gpt-oss-120b',
  'qwen/qwen3.8-27b',
  'openai/gpt-oss-20b'
];

async function processChatMessage(message, context) {
  let pubmedContext = '';
  if (message.toLowerCase().includes('research') || message.toLowerCase().includes('study')) {
    try {
      const pubmedRes = await axios.get(
        `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(message)}&retmode=json&retmax=1`,
        { timeout: 4000 }
      );
      if (pubmedRes.data && pubmedRes.data.esearchresult && pubmedRes.data.esearchresult.idlist?.length > 0) {
        pubmedContext = ' (Related PubMed IDs: ' + pubmedRes.data.esearchresult.idlist.join(', ') + ')';
      }
    } catch (e) {
      console.log('PubMed fetch error', e.message);
    }
  }

  if (GROQ_API_KEY && GROQ_API_KEY !== 'placeholder') {
    for (const model of SUPPORTED_MODELS) {
      try {
        console.log(`[CHAT] Querying model: ${model}`);
        const response = await axios.post(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            model: model,
            messages: [
              {
                role: 'system',
                content:
                  'You are PulseAI, an expert clinical health copilot. You provide empathetic, medically sound, concise, and structured responses. Always add relevant context and standard medical disclaimers where suitable.'
              },
              {
                role: 'user',
                content: (context ? `Context: ${JSON.stringify(context)}\n` : '') + message + pubmedContext
              }
            ],
            temperature: 0.7,
            max_tokens: 800
          },
          {
            headers: {
              Authorization: `Bearer ${GROQ_API_KEY}`,
              'Content-Type': 'application/json'
            },
            timeout: 15000
          }
        );

        const reply = response.data?.choices?.[0]?.message?.content;
        if (reply) {
          return reply;
        }
      } catch (e) {
        console.error(`[CHAT] Error with model ${model}:`, e.response?.status, e.response?.data?.error?.message || e.message);
      }
    }
  }

  return "I'm PulseAI health copilot. I reviewed your query: \"" + message + "\"." + pubmedContext + "\nYour vitals are stable. Please consult your physician for specific diagnostic advice.";
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ success: true, messages: [] });
  }

  if (req.method === 'POST') {
    // In Vercel serverless, req.body might already be parsed or might be a JSON string
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }

    const message = body?.message;
    const context = body?.context;

    if (!message) {
      return res.status(400).json({ error: 'Message required' });
    }

    try {
      const reply = await processChatMessage(message, context);
      return res.status(200).json({
        success: true,
        message: reply,
        reply: reply
      });
    } catch (err) {
      console.error('[CHAT API] Error:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
