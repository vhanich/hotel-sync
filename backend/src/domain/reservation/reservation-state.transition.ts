import type {
    ReservationStatus
} from '../../validators/reservation/reservation.validation';

import { reservationErrors } from '../../errors/reservation.errors';

const reservationTransitions: Record<
    ReservationStatus,
    ReservationStatus[]
> = {
    PENDING: ['CONFIRMED', 'CANCELLED'],
    CONFIRMED: ['CHECKED_IN', 'CANCELLED'],
    CHECKED_IN: ['CHECKED_OUT'],
    CHECKED_OUT: [],
    CANCELLED: [],
};

export const validateReservationTransition = (
    current: ReservationStatus,
    next: ReservationStatus,
): void => {
    if (!reservationTransitions[current].includes(next)) {
        throw reservationErrors.invalidStatusTransition();
    }
};