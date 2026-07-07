import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });

const app = express();
app.use(express.json());

app.get('/guests', async (_, res) => {
  const guests = await prisma.guest.findUnique({
    where: {email: 'nick@example.com'},
  });
  res.json(guests);
})

const PORT = process.env.PORT || 8080;

app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      service: 'hotel-sync-backend'
    });
  });
  
  app.listen(PORT, () => {
    console.log(`🚀 Сервер успішно запущено на порту ${PORT}`);
  })