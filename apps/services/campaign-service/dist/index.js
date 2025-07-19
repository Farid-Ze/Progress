"use strict";
// Campaign Service - Simple Express Server
const express = require('express');
const cors = require('cors');
const app = express();
// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
// Routes
app.get('/api/v1/campaigns', (req, res) => {
    res.json({
        success: true,
        data: [
            {
                id: '1',
                title: 'Bantuan Pendidikan Anak Yatim',
                description: 'Program bantuan pendidikan untuk anak yatim di daerah terpencil',
                category: 'pendidikan',
                targetAmount: 50000000,
                currentAmount: 25000000,
                status: 'active'
            }
        ]
    });
});
app.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'campaign-service' });
});
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Campaign Service running on port ${PORT}`);
});
module.exports = app;
//# sourceMappingURL=index.js.map