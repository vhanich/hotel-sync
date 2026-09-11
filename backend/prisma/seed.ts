import bcrypt from 'bcrypt';
import { prisma, disconnectDB } from '../src/lib/prisma';
import { PrismaClient } from '.prisma/client/default.js';

import { staffToCreate } from './defaultData/staffData';
import { roomsToCreate } from './defaultData/roomData';
import { guestsToCreate } from './defaultData/guestData'
import { reservationsToCreate } from './defaultData/reservationsData';

import { generateReservationNumber } from '../src/utils/reservation/reservation-number';

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

    await prisma.staff.deleteMany();
    await prisma.$executeRaw`ALTER SEQUENCE staff_id_seq RESTART WITH 1`;

    await prisma.reservation.deleteMany();
    await prisma.guest.deleteMany();
    await prisma.room.deleteMany();

    console.log('Seeding guests data...');

    for (const guest of guestsToCreate) {
        await prisma.guest.create({
            data: guest,
        });
    }

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

    console.log('Seeding reservation data...');
    await prisma.$transaction( async (tx) => {
        for (const reservation of reservationsToCreate) {
            const room = await tx.room.findUnique({ 
                where: { number: reservation.roomNumber } 
            });

            if (!room) {
                throw new Error(
                    `Room ${reservation.roomNumber} not found`,
                );
            }  

            const guest = await tx.guest.findUnique({
                where: {
                    email: reservation.guestEmail,
                },
            });

            if (!guest) {
                throw new Error(
                    `Guest ${reservation.guestEmail} not found`,
                );
            }

            const reservationNumber = await generateReservationNumber(tx);

            await tx.reservation.create({
                data: {
                    reservationNumber: reservationNumber,
                    roomId: room.id,
                    guestId: guest.id,
                    checkInDate: reservation.checkInDate,
                    checkOutDate: reservation.checkOutDate,
                    guestCount: reservation.guestCount,
                    reservationStatus: reservation.reservationStatus,
                    cancelledAt: reservation.cancelledAt ?? null,
                },
            });
        }
    }); 
};

seed()
    .then(async() => {
        await disconnectDB();
    })
    .catch((err) => {
        console.log(err);
    });