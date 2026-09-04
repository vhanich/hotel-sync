import { Router } from 'express';

import {
    createRoom,
    getRoomByID,
    getAllRooms,

    updateRoomInfo,
    updateHousekeeping,
    updateMaintenance,
    updateOccupancy,

    activateRoom,
    deactivateRoom
} from '../controllers/room.controllers';

import { authenticate } from '../middleware/authenticate.middleware';
import { restrictTo } from '../middleware/restrictTo.middleware';

const route = Router();

route.post('/rooms', authenticate, restrictTo(['ADMIN']), createRoom);
route.get('/rooms', authenticate, getAllRooms);
route.get('/rooms/:id', authenticate, getRoomByID);

route.patch('/rooms/:id', authenticate, restrictTo(['ADMIN']), updateRoomInfo);
route.patch('/rooms/:id/occupancy', authenticate, restrictTo(['ADMIN']), updateOccupancy);
route.patch('/rooms/:id/housekeeping', authenticate,restrictTo(['ADMIN', 'CLEANER']), updateHousekeeping);
route.patch('/rooms/:id/maintenance', authenticate, restrictTo(['ADMIN', 'REPAIRMAN']), updateMaintenance);

route.patch('/rooms/:id/activate', authenticate, restrictTo(['ADMIN']), activateRoom);
route.patch('/rooms/:id/deactivate', authenticate, restrictTo(['ADMIN']), deactivateRoom);

export default route;