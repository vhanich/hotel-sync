import { Prisma } from '@prisma/client';

type ReservationWithRelations = Prisma.ReservationGetPayload<{
    include: {
        room: true;
        guest: true;
    };
}>; 

export const mapReservationResponse = (
    reservation: ReservationWithRelations,
) => {
    return {
        id: reservation.id,
        reservationNumber: reservation.reservationNumber,
        status: reservation.reservationStatus,
        checkInDate: reservation.checkInDate,
        checkOutDate: reservation.checkOutDate,
        guestCount: reservation.guestCount,

        guest: {
            id: reservation.guest.id,
            fullName: reservation.guest.fullName,
            phoneNumber: reservation.guest.phoneNumber,
            email: reservation.guest.email,
        },

        room: {
            id: reservation.room.id,
            number: reservation.room.number,
            type: reservation.room.type,
            occupancyStatus: reservation.room.occupancyStatus,
        },

        createdAt: reservation.createdAt,
        updatedAt: reservation.updatedAt,
        cancelledAt: reservation.cancelledAt,
    };
};