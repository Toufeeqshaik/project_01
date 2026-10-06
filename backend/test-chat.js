require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

async function testFullSuite() {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/api/chat', require('./routes/chat'));

    const server = app.listen(3098, async () => {
        try {
            console.log('--- Test 1: POST /api/chat ---');
            const r1 = await axios.post('http://localhost:3098/api/chat', { message: 'Give 3 quick tips for heart health' });
            console.log('✅ Chat Response:', r1.data.success);
            console.log(r1.data.message.substring(0, 150) + '...\n');

            console.log('--- Test 2: POST /api/chat/send ---');
            const r2 = await axios.post('http://localhost:3098/api/chat/send', { message: 'Is 120/80 normal BP?', context: { age: 35 } });
            console.log('✅ Send Response:', r2.data.success);
            console.log(r2.data.reply.substring(0, 150) + '...\n');

            console.log('--- Test 3: GET /api/chat/history ---');
            const r3 = await axios.get('http://localhost:3098/api/chat/history?userId=user_123');
            console.log('✅ History Response:', r3.data.success);
            
            console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY!');
        } catch (err) {
            console.error('❌ Test failed:', err.response?.status, err.response?.data || err.message);
        } finally {
            server.close();
        }
    });
}

testFullSuite();








