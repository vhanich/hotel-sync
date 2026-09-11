import { prisma } from '../../lib/prisma';
import { Prisma } from '@prisma/client';
import { generateReservationNumber } from '../../utils/reservation/reservation-number';
import {
    CreateReservationInput,
    GetReservationsQuery,
    UpdateReservationInput,
} from '../../validators/reservation/reservation.validation';

import { 
    validateReservationDatesRules, 
    validateCapacityRules,
    validateRoomForCheckInRules,
    validateRoomForCheckOutRules,   
} from '../../domain/reservation/reservation-state.rules';
import { validateReservationTransition } from '../../domain/reservation/reservation-state.transition';

import { reservationErrors } from '../../errors/reservation.errors';
import { mapReservationResponse } from '../../mappers/reservation.mapper';


export const createReservationService = async (
    reservationData: CreateReservationInput
) => {

    validateReservationDatesRules(reservationData.checkInDate, reservationData.checkOutDate);

    const reservation = await prisma.$transaction(async (tx) => {
    
        const room = await findRoomOrThrow(tx, reservationData.roomId);

        validateCapacityRules(
            reservationData.guestCount,
            room.capacity,
        );

        await validateRoomAvailability(
            tx,
            reservationData.roomId,
            reservationData.checkInDate,
            reservationData.checkOutDate,
        );

        const reservationNumber = await generateReservationNumber(tx);

        const guest = await tx.guest.upsert({
            where: {
                email: reservationData.guest.email,
            },
            update: {
                fullName: reservationData.guest.fullName,
                phoneNumber: reservationData.guest.phoneNumber,
            },
            create: {
                fullName: reservationData.guest.fullName,
                phoneNumber: reservationData.guest.phoneNumber,
                email: reservationData.guest.email,
            },
        });

        return tx.reservation.create({
            data: {
                reservationNumber,
                roomId: reservationData.roomId,
                guestId: guest.id,
                guestCount: reservationData.guestCount,
                checkInDate: reservationData.checkInDate,
                checkOutDate: reservationData.checkOutDate,
                reservationStatus: 'PENDING',
            },
            include: {
                room: true,
                guest: true,
            },
        });
    });

    return mapReservationResponse(reservation);
};

export const readAllReservationsService = async (query: GetReservationsQuery) => {
    const { page, limit, search, reservationStatus, roomId, checkInDate, checkOutDate } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.ReservationWhereInput = {
        ...(reservationStatus && { reservationStatus }),
        ...(roomId && { roomId }),
        ...(search && {
            OR: [
                { reservationNumber: { contains: search, mode: 'insensitive' } },
                { guest: { fullName: { contains: search, mode: 'insensitive' } } },
                { guest: { email: { contains: search, mode: 'insensitive' } } },
            ]
        }),
        ...(checkInDate &&
            checkOutDate && {
                AND: [
                    {
                        checkInDate: {
                            lt: checkOutDate,
                        },
                    },
                    {
                        checkOutDate: {
                            gt: checkInDate,
                        },
                    },
                ],
            }
        ),
    };

    const [reservations, totalCount] = await prisma.$transaction([
        prisma.reservation.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                checkInDate: 'desc',
            },
            include: {
                room: true,
                guest: true,
            },
        }),
        prisma.reservation.count({ where }),
    ]);

    return { 
        data: reservations.map(mapReservationResponse),
        pagination: {
            page,
            limit,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
        },
    };

};

export const readReservationByIdService = async (
    id: string
) => {
    const reservation = await prisma.reservation.findUnique({
        where: { id },
        include: {
            room: true,
            guest: true,
        },
    });
    if (!reservation) {
        throw reservationErrors.reservationNotFound();
    }
    return mapReservationResponse(reservation);
};

export const updateReservationService = async (
    id: string,
    nextReservationData: UpdateReservationInput
) => {
    return prisma.$transaction(async (tx) => {
        const reservation = await findReservationOrThrow(tx, id);
        if (
            reservation.reservationStatus !== 'PENDING' &&
            reservation.reservationStatus !== 'CONFIRMED'
        ) {
            throw reservationErrors.reservationCannotBeUpdated();
        }

        const roomId = nextReservationData.roomId ?? reservation.roomId;
        const checkInDate = nextReservationData.checkInDate ?? reservation.checkInDate;
        const checkOutDate = nextReservationData.checkOutDate ?? reservation.checkOutDate;
        const guestCount = nextReservationData.guestCount ?? reservation.guestCount;

        validateReservationDatesRules(checkInDate, checkOutDate);

        const room = await findRoomOrThrow(tx, roomId);

        validateCapacityRules(guestCount, room.capacity);

        await validateRoomAvailability(
            tx,
            roomId,
            checkInDate,
            checkOutDate,
            reservation.id,
        );

        let guestId = reservation.guestId;
        if (nextReservationData.guest) {
            

            const guest = await tx.guest.upsert({
                where: {
                    email: nextReservationData.guest.email,
                },
                update: {
                    fullName: nextReservationData.guest.fullName,
                    phoneNumber: nextReservationData.guest.phoneNumber,
                },
                create: {
                    fullName: nextReservationData.guest.fullName,
                    phoneNumber: nextReservationData.guest.phoneNumber,
                    email: nextReservationData.guest.email,
                }
            });

            guestId = guest.id;
        }

        const updatedReservation = await tx.reservation.update({
            where: {
                id,
            },
            data: {
                roomId,
                guestId,
                guestCount,
                checkInDate,
                checkOutDate,
            },
            include: {
                room: true,
                guest: true,
            },
        });
        return mapReservationResponse(updatedReservation);
    });
};

export const cancelReservationService = async (
    id: string
) => {
    return prisma.$transaction(async (tx) => {
        const reservation = await findReservationOrThrow(tx, id);

        validateReservationTransition(reservation.reservationStatus, 'CANCELLED');

        const cancelledReservation = await tx.reservation.update({
            where: { id },
            data: {
                reservationStatus: 'CANCELLED',
                cancelledAt: new Date(),
            },
            include: {
                room: true,
                guest: true,
            },
        });

        return mapReservationResponse(cancelledReservation);
    });
};

export const checkInReservationService = async (
    id: string
) => {
    return prisma.$transaction(async (tx) => {
        const reservation = await findReservationOrThrow(tx, id);
        const room = await findRoomOrThrow(tx, reservation.roomId);

        validateReservationTransition(reservation.reservationStatus, 'CHECKED_IN');
        validateRoomForCheckInRules(room);

        await tx.reservation.update({
            where: { id },
            data: {
                reservationStatus: 'CHECKED_IN',
            },
        });

        await tx.room.update({
            where: { id: room.id },
            data: {
                occupancyStatus: 'OCCUPIED',
            },
        });

        const checkedInReservation = await findReservationOrThrow(tx, id);

        return mapReservationResponse(checkedInReservation);
    });
};

export const checkOutReservationService = async ( 
    id: string
) => {
    return prisma.$transaction(async (tx) => {
        const reservation = await findReservationOrThrow(tx, id);
        const room = await findRoomOrThrow(tx, reservation.roomId);

        validateReservationTransition(reservation.reservationStatus, 'CHECKED_OUT');
        validateRoomForCheckOutRules(room);
        
        await tx.reservation.update({
            where: { id },
            data: {
                reservationStatus: 'CHECKED_OUT',
            },
        });
        await tx.room.update({
            where: { id: room.id },
            data: {
                occupancyStatus: 'VACANT',
                housekeepingStatus: 'DIRTY',
            },
        });

        const checkedOutReservation = await findReservationOrThrow(tx, id);
        
        return mapReservationResponse(checkedOutReservation);
    });
};

const findReservationOrThrow = async (
    tx: Prisma.TransactionClient,
    id: string
) => {
    const reservation = await tx.reservation.findUnique({
        where: { id },
        include: {
            room: true,
            guest: true,
        },
    });

    if (!reservation) {
        throw reservationErrors.reservationNotFound();
    }
    
    return reservation;
};

const findRoomOrThrow = async (
    tx: Prisma.TransactionClient,
    id: string
) => {
    const room = await tx.room.findUnique({
        where: { id },
    });

    if (!room) {
        throw reservationErrors.roomNotFound();
    }

    return room;
};

const validateRoomAvailability = async (
    tx: Prisma.TransactionClient,
    roomId: string,
    checkInDate: Date,
    checkOutDate: Date,
    excludeReservationId?: string
): Promise<void> => {
    const overlappingReservation =
        await tx.reservation.findFirst({
            where: {
                ...(excludeReservationId && {
                    id: {
                        not: excludeReservationId,
                    },
                }),
                roomId,
                reservationStatus: {
                    in: [
                        'PENDING',
                        'CONFIRMED',
                        'CHECKED_IN',
                    ],
                },
                checkInDate: {
                    lt: checkOutDate,
                },
                checkOutDate: {
                    gt: checkInDate,
                },
            },
            select: {
                id: true,
            },
        });

    if (overlappingReservation) {
        throw reservationErrors.roomNotAvailable();
    }
};
