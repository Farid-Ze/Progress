// User Service - Simple Express Server
import cors from "cors";
import express, { Request, Response, json } from "express";
const app = express();

// Middleware
app.use(cors());
app.use(json({ limit: '10mb' }));

// Routes
app.get('/api/v1/users', (req: Request, res: Response) => {
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

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', service: 'user-service' });
});

const PORT = process.env['PORT'] || 3003;

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});

export default app;
