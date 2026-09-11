import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { prisma } from './lib/prisma';
import { errorHandler } from './middleware/error.middleware';


import staffRoutes from './routes/staff.routes';
import authRoutes from './routes/auth.routes';
import roomRoutes from './routes/room.routes';
import reservationRoutes from './routes/reservation.routes';


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173', 
  credentials: true,
}));

app.use('/api/auth', authRoutes);
app.use('/api', staffRoutes); 
app.use('/api', roomRoutes);
app.use('/api', reservationRoutes);

app.use(errorHandler);

app.get('/guests', async (_, res) => {
  console.log('Fetching guests...');
  const guests = await prisma.guest.findMany();
  res.json(guests);
});

const PORT = process.env.PORT || 8080;
  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

