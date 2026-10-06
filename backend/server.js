const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Debug: Log environment on startup
console.log('[SERVER] Environment loaded:');
console.log('[SERVER] GROQ_API_KEY:', process.env.GROQ_API_KEY ? '✅ Present' : '❌ Missing');
console.log('[SERVER] SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ Present' : '❌ Missing');

// Root endpoint with friendly UI and API documentation
app.get('/', (req, res) => {
    // If client accepts HTML (e.g. opened in browser), return styled dashboard
    if (req.accepts('html')) {
        return res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PulseAI API Server</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #0A0A0A;
            color: #E2E8F0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
            box-sizing: border-box;
        }
        .card {
            background-color: #121212;
            border: 1px solid #1E293B;
            border-radius: 16px;
            padding: 32px;
            max-width: 600px;
            width: 100%;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: rgba(0, 210, 106, 0.15);
            color: #00D26A;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 16px;
            border: 1px solid rgba(0, 210, 106, 0.3);
        }
        .dot {
            width: 8px;
            height: 8px;
            background-color: #00D26A;
            border-radius: 50%;
            box-shadow: 0 0 8px #00D26A;
        }
        h1 {
            font-size: 24px;
            margin: 0 0 8px 0;
            color: #FFFFFF;
        }
        p {
            color: #94A3B8;
            font-size: 14px;
            line-height: 1.6;
            margin: 0 0 20px 0;
        }
        .btn {
            display: inline-block;
            background-color: #00D26A;
            color: #000000;
            font-weight: bold;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            transition: opacity 0.2s;
            margin-bottom: 24px;
        }
        .btn:hover {
            opacity: 0.9;
        }
        .endpoints {
            border-top: 1px solid #1E293B;
            padding-top: 20px;
        }
        .endpoint-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 12px;
            background: #18181B;
            border-radius: 8px;
            margin-bottom: 8px;
            font-size: 13px;
            font-family: monospace;
        }
        .method {
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: bold;
        }
        .get { background: #0369a1; color: #bae6fd; }
        .post { background: #047857; color: #a7f3d0; }
        .path { color: #f1f5f9; text-decoration: none; }
        .path:hover { text-decoration: underline; color: #00D26A; }
    </style>
</head>
<body>
    <div class="card">
        <div class="badge">
            <div class="dot"></div>
            API Service Online
        </div>
        <h1>PulseAI Health Copilot Backend</h1>
        <p>This is the backend REST API service running on port 3001. For the visual interactive Dashboard and AI chat copilot, visit the Frontend App below:</p>
        
        <a href="http://localhost:5173" class="btn" target="_blank">Open Frontend UI (http://localhost:5173) &rarr;</a>

        <div class="endpoints">
            <p style="margin-bottom: 12px; font-weight: 600; color: #CBD5E1;">Available API Endpoints:</p>
            <div class="endpoint-item">
                <a href="/api/health/metrics" class="path">/api/health/metrics</a>
                <span class="method get">GET</span>
            </div>
            <div class="endpoint-item">
                <span class="path">/api/chat</span>
                <span class="method post">POST</span>
            </div>
            <div class="endpoint-item">
                <a href="/api/medications" class="path">/api/medications</a>
                <span class="method get">GET</span>
            </div>
        </div>
    </div>
</body>
</html>
        `);
    }

    res.json({
        status: 'online',
        service: 'PulseAI Backend API',
        frontend_url: 'http://localhost:5173',
        endpoints: {
            metrics: 'GET /api/health/metrics',
            chat: 'POST /api/chat',
            medications: 'GET /api/medications'
        }
    });
});

app.use('/api/health', require('./routes/health'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/medications', require('./routes/medications'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✨ Backend running on http://localhost:${PORT}`));

