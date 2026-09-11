import { Prisma } from '@prisma/client';

export const generateReservationNumber = async (
    tx: Prisma.TransactionClient,
): Promise<string> => {
    const year = new Date().getFullYear();

    const counter = await tx.reservationCounter.upsert({
        where: { year },
        update: {
            lastNumber: {
                increment: 1,
            },
        },
        create: {
            year,
            lastNumber: 1,
        },
    });

    return `RES-${year}-${counter.lastNumber
        .toString()
        .padStart(6, '0')}`;
};