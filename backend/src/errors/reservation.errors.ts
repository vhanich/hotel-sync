import { AppError } from './AppError';

export const reservationErrors = {
    roomNotFound: () =>
        new AppError(
            404,
            'ROOM_NOT_FOUND',
            'Room not found.',
        ),

    roomNotAvailable: () =>
        new AppError(
            409,
            'ROOM_NOT_AVAILABLE',
            'Room is not available for the selected dates.',
        ),

    capacityExceeded: () =>
        new AppError(
            400,
            'ROOM_CAPACITY_EXCEEDED',
            'Guest count exceeds room capacity.',
        ),

    invalidDates: () =>
        new AppError(
            400,
            'INVALID_RESERVATION_DATES',
            'Check-out date must be after check-in date.',
        ),

    checkInDateInPast: () =>
        new AppError(
            400,
            'CHECK_IN_DATE_IN_PAST',
            'Check-in date cannot be in the past.',
        ),

    invalidStatusTransition: () =>
        new AppError(
            409,
            'INVALID_RESERVATION_TRANSITION',
            'Invalid reservation status transition.',
        ),

    reservationNotFound: () =>
        new AppError(
            404,
            'RESERVATION_NOT_FOUND',
            'Reservation not found.',
        ),

    reservationCannotBeUpdated: () =>
        new AppError(
            400,
            'RESERVATION_CANNOT_BE_UPDATED',
            'Reservation cannot be updated in its current status.',
        ), 

    roomOccupied: () => 
        new AppError(
            409,
            'ROOM_OCCUPIED',
            'Room is currently occupied.',
        ),
    
        
    roomNotReadyForCheckIn: () => 
        new AppError(
            409,
            'ROOM_NOT_READY_FOR_CHECK_IN',
            'Room is not ready for check-in.',
        ),
    
    roomUnavailableForMaintenance: () =>
        new AppError(
            409,
            'ROOM_UNAVAILABLE_FOR_MAINTENANCE',
            'Room is currently under maintenance.',
        ),    
    
    roomNotOccupied: () =>
        new AppError(
            409,
            'ROOM_NOT_OCCUPIED',
            'Room is not currently occupied.',
        ),
};