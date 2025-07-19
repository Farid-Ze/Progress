// API Gateway - Simple Express Server
import cors from "cors";
import express, { Request, Response, json } from "express";
const app = express();

app.use(cors());
app.use(json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "OK", service: "api-gateway" });
});

const PORT = process.env['PORT'] || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});

export default app;
