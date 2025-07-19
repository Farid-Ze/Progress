// Payment Service - Simple Express Server
import cors from "cors";
import express, { Request, Response, json } from "express";
const app = express();

// Middleware
app.use(cors());
app.use(json({ limit: '10mb' }));

// Routes
app.post('/api/v1/payments', (req: Request, res: Response) => {
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

app.get('/api/v1/payments/:id', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      id: req.params['id'],
      amount: 100000,
      status: 'completed',
      paymentMethod: 'credit_card'
    }
  });
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', service: 'payment-service' });
});

const PORT = process.env['PORT'] || 3005;

app.listen(PORT, () => {
  console.log(`Payment Service running on port ${PORT}`);
});

export default app;
