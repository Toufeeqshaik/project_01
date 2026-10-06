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

app.use('/api/health', require('./routes/health'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/medications', require('./routes/medications'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✨ Backend running on http://localhost:${PORT}`));
