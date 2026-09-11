import { Router } from 'express';

import {
    createReservation,
    readAllReservations,
    readReservationById,
    updateReservation,
    cancelReservation,
    checkInReservation,
    checkOutReservation
} from '../controllers/reservation.controllers';

import { authenticate } from '../middleware/authenticate.middleware';
import { restrictTo } from '../middleware/restrictTo.middleware';

const route = Router();

route.post('/reservations', authenticate, restrictTo(['ADMIN']), createReservation);
route.get('/reservations', authenticate, restrictTo(['ADMIN']), readAllReservations);
route.get('/reservations/:id', authenticate, restrictTo(['ADMIN']), readReservationById);

route.patch('/reservations/:id', authenticate, restrictTo(['ADMIN']), updateReservation);
route.post('/reservations/:id/check-in', authenticate, restrictTo(['ADMIN']), checkInReservation);
route.post('/reservations/:id/check-out', authenticate, restrictTo(['ADMIN']), checkOutReservation);
route.delete('/reservations/:id/', authenticate, restrictTo(['ADMIN']), cancelReservation);

export default route;