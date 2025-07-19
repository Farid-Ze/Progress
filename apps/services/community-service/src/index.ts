// Community Service - Simple Express Server
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.get('/api/v1/communities', (req: any, res: any) => {
  res.json({
    success: true,
    data: [
      {
        id: '1',
        name: 'Komunitas ASA Jakarta',
        description: 'Komunitas peduli sosial di Jakarta',
        memberCount: 150,
        status: 'active'
      }
    ]
  });
});

app.get('/health', (req: any, res: any) => {
  res.json({ status: 'OK', service: 'community-service' });
});

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
  console.log(`Community Service running on port ${PORT}`);
});

module.exports = app;
