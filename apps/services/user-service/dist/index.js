"use strict";
// User Service - Simple Express Server
const express = require('express');
const cors = require('cors');
const app = express();
// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
// Routes
app.get('/api/v1/users', (req, res) => {
    res.json({
        success: true,
        data: [
            {
                id: '1',
                email: 'user@example.com',
                name: 'John Doe',
                role: 'user',
                status: 'active'
            }
        ]
    });
});
app.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'user-service' });
});
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
});
module.exports = app;
//# sourceMappingURL=index.js.map