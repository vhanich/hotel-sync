import { Room } from '@prisma/client';
import { reservationErrors } from '../../errors/reservation.errors';

export const validateReservationDatesRules = (
    checkInDate: Date,
    checkOutDate: Date,
): void => {
    const now = new Date();

    if (checkInDate < now) {
        throw reservationErrors.checkInDateInPast();    
    }
    if (checkInDate >= checkOutDate) {
        throw reservationErrors.invalidDates();
    }
};

export const validateCapacityRules = (
    guestCount: number,
    roomCapacity: number,
): void => {
    if (guestCount > roomCapacity) {
        throw reservationErrors.capacityExceeded();
    }
}; 

export const validateRoomForCheckInRules = (
    room: Room,
): void => {
    if (room.occupancyStatus !== 'VACANT') {
        throw reservationErrors.roomOccupied();
    }

    if (room.housekeepingStatus !== 'CLEAN') {
        throw reservationErrors.roomNotReadyForCheckIn();
    }

    if (room.maintenanceStatus !== 'OPERATIONAL') {
        throw reservationErrors.roomUnavailableForMaintenance();
    }

};

export const validateRoomForCheckOutRules = (
    room: Room,
): void => {
    if ( room.occupancyStatus !== 'OCCUPIED') {
        throw reservationErrors.roomNotOccupied();
    }
}