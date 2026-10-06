const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

router.get('/records', async (req, res) => {
    res.json({
        success: true,
        data: [{ id: '1', date: '2026-10-05', type: 'Lab Report', description: 'Blood Work' }]
    });
});

router.post('/upload', async (req, res) => {
    res.json({ success: true, message: 'File uploaded successfully' });
});

router.post('/process', async (req, res) => {
    res.json({ success: true, insights: ["Blood pressure improved.", "Cholesterol is stable."] });
});

router.get('/metrics', async (req, res) => {
    res.json({
        success: true,
        patient: { name: "Alex M.", age: 38, gender: "Male" },
        vitals: {
            bp: "118/76", hr: "68", glucose: "94"
        },
        doctor: {
            name: "Dr. Elena Vance, MD",
            specialty: "Cardiologist",
            appointment: "Tomorrow at 2:30 PM"
        },
        synthesis: {
            anomalies: ["Slightly elevated resting heart rate post-exercise"],
            recommendations: ["Maintain current Metformin dose", "Hydrate well before next lab"]
        }
    });
});

module.exports = router;
