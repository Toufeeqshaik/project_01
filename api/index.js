export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.status(200).json({
    status: 'online',
    service: 'PulseAI Serverless API on Vercel',
    endpoints: {
      metrics: '/api/health/metrics',
      chat: '/api/chat',
      medications: '/api/medications'
    }
  });
}

