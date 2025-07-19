// Campaign Service - Simple Express Server
import cors from "cors";
import express, { Request, Response, json } from "express";
const app = express();

// Middleware
app.use(cors());
app.use(json({ limit: '10mb' }));

// Routes
app.get('/api/v1/campaigns', (req: Request, res: Response) => {
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

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', service: 'campaign-service' });
});

const PORT = process.env['PORT'] || 3002;

app.listen(PORT, () => {
  console.log(`Campaign Service running on port ${PORT}`);
});

export default app;
