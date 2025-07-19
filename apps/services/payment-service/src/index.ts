// Payment Service - Simple Express Server
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.post('/api/v1/payments', (req: any, res: any) => {
  res.json({
    success: true,
    data: {
      id: 'payment_123',
      amount: req.body.amount,
      status: 'completed',
      paymentMethod: 'credit_card'
    }
  });
});

app.get('/api/v1/payments/:id', (req: any, res: any) => {
  res.json({
    success: true,
    data: {
      id: req.params.id,
      amount: 100000,
      status: 'completed',
      paymentMethod: 'credit_card'
    }
  });
});

app.get('/health', (req: any, res: any) => {
  res.json({ status: 'OK', service: 'payment-service' });
});

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Payment Service running on port ${PORT}`);
});

module.exports = app;
