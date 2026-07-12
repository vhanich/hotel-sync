import bcrypt from 'bcrypt';
import { prisma, disconnectDB } from '../src/lib/prisma';

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
        {name: 'Valia', password: 'adminhotel@example.com', email: 'valia@example.com', role: 'ADMIN', staffId: 'ADM-001'},
        {name: 'Valia H', pinCode: '247890', email: 'valiatest@example.com', role: 'CLEANER', staffId: 'CLN-001'},
        {name: 'Max H', pinCode: '113889', email: 'maxtest@example.com', role: 'REPAIRMAN', staffId: 'REP-001'},
        {name: 'Olena', pinCode: '191101', email: 'olenatest@example.com', role: 'CLEANER', staffId: 'CLN-002'},
        {name: 'Anna', pinCode: '191203', email: 'annatest@example.com', role: 'CLEANER', staffId: 'CLN-003'},
    ];

    for (const staff of staffToCreate) {
        const data: any = {
            name: staff.name,
            email: staff.email,
            role: staff.role,
            staffId: staff.staffId,
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