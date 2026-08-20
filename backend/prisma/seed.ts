import bcrypt from 'bcrypt';
import { prisma, disconnectDB } from '../src/lib/prisma';
import { PrismaClient } from '.prisma/client/default.js';

async function seed() {
    console.log('Clearing existing data...');
    await prisma.guest.deleteMany();
    await prisma.staff.deleteMany();

    console.log('Seeding guests data...');

    await prisma.guest.createMany({ 
        data: [
            { name: 'Alise A', phone: '+48567431297', email: 'alisetest@example.com' },
            { name: 'Max A', phone: '+48567431213', email: 'maxtest@example.com' },
            { name: 'Nick A', phone: '+48567431238', email: 'nicktest@example.com' },

        ]
    });

    console.log('Seeding staff data...');

    const staffToCreate = [
        {
            name: 'Amelie Griffith',
            password: 'adminhotel@example.com',
            email: 'amelie@example.com',
            role: 'ADMIN',
            status: 'ACTIVE',
            availability: 'AVAILABLE',
        },
        {
            name: 'Kylan Gentry',
            pinCode: '2478',
            email: 'kylantest@example.com',
            role: 'CLEANER',
            status: 'ACTIVE',
            availability: 'AVAILABLE',
        },
        {
            name: 'Antonio Crosby',
            pinCode: '1138',
            email: 'antonio@example.com',
            role: 'REPAIRMAN',
            status: 'ACTIVE',
            availability: 'DAY_OFF',
        },
        {
            name: 'Marceline Avila',
            pinCode: '1911',
            email: 'marceline@example.com',
            role: 'CLEANER',
            status: 'ACTIVE',
            availability: 'SICK_LEAVE',
        },
        {
            name: 'Anna Vance',
            pinCode: '1912',
            email: 'annatest@example.com',
            role: 'CLEANER',
            status: 'INACTIVE',
            availability: 'UNAVAILABLE',
        },
        {
            name: 'Oleh  Fletcher',
            pinCode: '3321',
            email: 'olehrepair@example.com',
            role: 'REPAIRMAN',
            status: 'ACTIVE',
            availability: 'AVAILABLE',
        },
        {
            name: 'Maria Thornton',
            pinCode: '5566',
            email: 'mariatest@example.com',
            role: 'CLEANER',
            status: 'TERMINATED',
            availability: 'UNAVAILABLE',
        },
        {
            name: 'Sophia Anderson',
            pinCode: '8899',
            email: 'sophia@example.com',
            role: 'CLEANER',
            status: 'ACTIVE',
            availability: 'AVAILABLE',
        },
        {
            name: 'Robert Davis',
            pinCode: '7788',
            email: 'robert@example.com',
            role: 'REPAIRMAN',
            status: 'ACTIVE',
            availability: 'AVAILABLE',
        },
        {
            name: 'James Taylor',
            pinCode: '4455',
            email: 'james@example.com',
            role: 'REPAIRMAN',
            status: 'ACTIVE',
            availability: 'SICK_LEAVE',
        },
        {
            name: 'Emma Thomas',
            pinCode: '6677',
            email: 'emma@example.com',
            role: 'CLEANER',
            status: 'ACTIVE',
            availability: 'DAY_OFF',
        },
        {
            name: 'Daniel Moore',
            pinCode: '9900',
            email: 'daniel@example.com',
            role: 'REPAIRMAN',
            status: 'INACTIVE',
            availability: 'VACATION',
        },
        {
            name: 'Laura White',
            pinCode: '1234',
            email: 'laura@example.com',
            role: 'CLEANER',
            status: 'ACTIVE',
            availability: 'AVAILABLE',
        },
        {
            name: 'George Martin',
            pinCode: '4321',
            email: 'george@example.com',
            role: 'REPAIRMAN',
            status: 'TERMINATED',
            availability: 'UNAVAILABLE',
        },
        {
            name: 'Nina Clark',
            pinCode: '2468',
            email: 'nina@example.com',
            role: 'CLEANER',
            status: 'ACTIVE',
            availability: 'VACATION',
        },
    ];

    const generateStaffId = async (
            prisma: PrismaClient
        ): Promise<string> => {
            const result = await prisma.$queryRaw<{ value: bigint }[]>`
                SELECT nextval('staff_id_seq') AS value
            `;

            const value = Number(result[0].value);

            return `STF-${String(value).padStart(6, '0')}`;
        };

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
}

seed()
    .then(async() => {
        await disconnectDB();
    })
    .catch((err) => {
        console.log(err);
    });