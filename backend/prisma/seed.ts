import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotevn from 'dotenv';

dotevn.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({adapter});

async function seed() {
    await prisma.guest.createMany({ 
        data: [
            { name: 'Alise', phone: '+48567431298', email: 'alise@example.com' },
            { name: 'Max', phone: '+48567431211', email: 'max@example.com' },
            { name: 'Nick', phone: '+48567431237', email: 'nick@example.com' },

        ]
    });
}

seed()
    .then(async() => {
        await prisma.$disconnect();
        await pool.end();
    })
    .catch((err) => {
        console.log(err);
    });