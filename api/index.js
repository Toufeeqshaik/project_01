const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// API Endpoints
app.use('/api/health', require('../backend/routes/health'));
app.use('/api/chat', require('../backend/routes/chat'));
app.use('/api/medications', require('../backend/routes/medications'));

// Root handler for API
app.get('/api', (req, res) => {
  res.json({
    status: 'online',
    service: 'PulseAI Serverless API on Vercel',
    endpoints: {
      metrics: '/api/health/metrics',
      chat: '/api/chat',
      medications: '/api/medications'
    }
  });
});

module.exports = app;
