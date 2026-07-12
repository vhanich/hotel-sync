import dotenv from 'dotenv'
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

export const disconnectDB = async () => {
    await prisma.$disconnect();
    await pool.end();
    console.log('Disconnected from the database!');
}