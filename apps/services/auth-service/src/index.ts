// Auth Service - Simple Express Server
import cors from 'cors';
import express, { Request, Response, json } from 'express';
const app = express();

// Middleware
app.use(cors());
app.use(json({ limit: '10mb' }));

// Routes
app.post('/api/v1/auth/login', (_req: Request, res: Response) => {
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

app.post('/api/v1/auth/register', (req: Request, res: Response) => {
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

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'OK', service: 'auth-service' });
});

const PORT = process.env['PORT'] || 3001;

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});

export default app;
