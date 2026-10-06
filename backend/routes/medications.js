const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    const meds = [
        { id: 1, name: 'Metformin', dosage: '500mg', done: true },
        { id: 2, name: 'Omega-3', dosage: '1000mg', done: true },
        { id: 3, name: 'Atorvastatin', dosage: '20mg', done: false }
    ];
    
    let rxNormData = null;
    let fdaData = null;

    try {
        const rxRes = await axios.get('https://rxnav.nlm.nih.gov/REST/rxcui.json?name=metformin');
        if (rxRes.data) rxNormData = rxRes.data;
    } catch (e) {
        console.error("RxNorm error", e.message);
    }
    
    try {
        const fdaRes = await axios.get('https://api.fda.gov/drug/event.json?search=patient.drug.medicinalproduct:metformin&limit=1');
        if (fdaRes.data) fdaData = fdaRes.data;
    } catch (e) {
        console.error("FDA API error", e.message);
    }

    res.json({ success: true, data: meds, external: { rxNormData, fdaData } });
});

module.exports = router;
