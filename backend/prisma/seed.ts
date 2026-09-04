import bcrypt from 'bcrypt';
import { prisma, disconnectDB } from '../src/lib/prisma';
import { PrismaClient } from '.prisma/client/default.js';

import { staffToCreate } from './defaultData/staffData';
import { roomsToCreate } from './defaultData/roomData';

const generateStaffId = async (
            prisma: PrismaClient
        ): Promise<string> => {
            const result = await prisma.$queryRaw<{ value: bigint }[]>`
                SELECT nextval('staff_id_seq') AS value
            `;

            const value = Number(result[0].value);

            return `STF-${String(value).padStart(6, '0')}`;
        };

async function seed() {
    console.log('Clearing existing data...');
    await prisma.guest.deleteMany();
    await prisma.staff.deleteMany();
    await prisma.$executeRaw`ALTER SEQUENCE staff_id_seq RESTART WITH 1`;
    await prisma.room.deleteMany();

    console.log('Seeding guests data...');

    await prisma.guest.createMany({ 
        data: [
            { name: 'Alise A', phone: '+48567431297', email: 'alisetest@example.com' },
            { name: 'Max A', phone: '+48567431213', email: 'maxtest@example.com' },
            { name: 'Nick A', phone: '+48567431238', email: 'nicktest@example.com' },

        ]
    });

    console.log('Seeding staff data...');

    for (const staff of staffToCreate) {
        const staffId = await generateStaffId(prisma);
        const data: any = {
            staffId,
            name: staff.name,
            email: staff.email,
            role: staff.role,
            status: staff.status,
            availability: staff.availability
        };

        if (staff.role === 'ADMIN' && staff.password) {
            data.hashedPassword = await bcrypt.hash(staff.password, 10);
        } else if (staff.pinCode) {
            data.hashedPinCode = await bcrypt.hash(staff.pinCode, 10);
        }

        await prisma.staff.create({ data });
    }

    console.log('Seeding room data...');
    await prisma.room.createMany({ data: roomsToCreate })

};

seed()
    .then(async() => {
        await disconnectDB();
    })
    .catch((err) => {
        console.log(err);
    });