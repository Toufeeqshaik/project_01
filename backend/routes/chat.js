const express = require('express');
const axios = require('axios');
const router = express.Router();
const supabase = require('../supabase');

const SUPPORTED_MODELS = [
    'openai/gpt-oss-120b',
    'qwen/qwen3.8-27b',
    'openai/gpt-oss-20b'
];

async function processChatMessage(message, context) {
    let pubmedContext = "";
    if (message.toLowerCase().includes("research") || message.toLowerCase().includes("study")) {
        try {
            const pubmedRes = await axios.get(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(message)}&retmode=json&retmax=1`, { timeout: 4000 });
            if (pubmedRes.data && pubmedRes.data.esearchresult && pubmedRes.data.esearchresult.idlist?.length > 0) {
                 pubmedContext = " (Related PubMed IDs: " + pubmedRes.data.esearchresult.idlist.join(", ") + ")";
            }
        } catch (e) {
             console.log("PubMed fetch error", e.message);
        }
    }

    const groqKey = process.env.GROQ_API_KEY;
    if (groqKey && groqKey !== 'placeholder') {
        for (const model of SUPPORTED_MODELS) {
            try {
                console.log(`[CHAT] Querying Groq model: ${model}`);
                const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
                    model: model,
                    messages: [
                        {
                            role: 'system',
                            content: 'You are PulseAI, an expert clinical health copilot. You provide empathetic, medically sound, concise, and structured responses. Always add relevant context and standard medical disclaimers where suitable.'
                        },
                        { 
                            role: 'user', 
                            content: (context ? `Context: ${JSON.stringify(context)}\n` : '') + message + pubmedContext 
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 800
                }, {
                    headers: { 
                        'Authorization': `Bearer ${groqKey}`,
                        'Content-Type': 'application/json'
                    },
                    timeout: 15000
                });
                
                const reply = response.data?.choices?.[0]?.message?.content;
                if (reply) {
                    console.log(`[CHAT] Success with model: ${model}`);
                    return reply;
                }
            } catch (e) {
                console.error(`[CHAT] Error with model ${model}:`, e.response?.status, e.response?.data?.error?.message || e.message);
            }
        }
    } else {
        console.warn("[CHAT] GROQ_API_KEY is missing or invalid");
    }

    return "This is a placeholder AI response. " + pubmedContext + "\nTo enable real AI, provide a valid GROQ_API_KEY in the backend .env";
}

// POST /api/chat & POST /api/chat/send
router.post(['/', '/send'], async (req, res) => {
    const { message, context, userId } = req.body;
    
    if(!message) return res.status(400).json({error: "Message required"});

    try {
        const reply = await processChatMessage(message, context);
        res.json({
            success: true,
            message: reply,
            reply: reply
        });
    } catch (err) {
        console.error('[CHAT] Route error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET /api/chat/history
router.get('/history', async (req, res) => {
    res.json({
        success: true,
        messages: []
    });
});

module.exports = router;
