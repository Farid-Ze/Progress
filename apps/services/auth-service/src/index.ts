// Auth Service - Simple Express Server
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.post('/api/v1/auth/login', (req: any, res: any) => {
  res.json({
    success: true,
    data: {
      token: 'mock-jwt-token',
      user: {
        id: '1',
        email: 'user@example.com',
        name: 'John Doe'
      }
    }
  });
});

app.post('/api/v1/auth/register', (req: any, res: any) => {
  res.json({
    success: true,
    data: {
      user: {
        id: '1',
        email: req.body.email,
        name: req.body.name
      }
    }
  });
});

app.get('/health', (req: any, res: any) => {
  res.json({ status: 'OK', service: 'auth-service' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});

module.exports = app;
