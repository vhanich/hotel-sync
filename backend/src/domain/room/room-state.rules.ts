import { Room } from '@prisma/client';
import { 
    OccupancyStatus, 
    MaintenanceStatus,
    UpdateRoomInput 
} from '../../validators/room/room.validation';

export const validateUpdateRoomRules = (
    room: Room,
    nextRoomData: UpdateRoomInput
) => {
    if (
        room.occupancyStatus === 'OCCUPIED' 
        && 
        (
            nextRoomData.capacity !== undefined ||
            nextRoomData.floor !== undefined ||
            nextRoomData.number !== undefined ||
            nextRoomData.type !== undefined 
        )
    ) {
        throw new Error('Cannot update room while occupied!');
    }
    
};

export const validateOccupancyRules = (
    room: Room, 
    nextOccupancyStatus: OccupancyStatus,
) => {
    if (
        room.isActive === false 
        && 
        nextOccupancyStatus === 'OCCUPIED' 
    ) {
        throw new Error ('Inactive room cannot be occupied!');
    }

    if (
        room.maintenanceStatus === 'UNDER_MAINTENANCE'
        &&
        nextOccupancyStatus === 'OCCUPIED'
    ) {
        throw new Error ('Cannot be occupied!');
    }

    if (room.maintenanceStatus === 'OUT_OF_ORDER'
        &&
        nextOccupancyStatus === 'OCCUPIED'
    ) {
        throw new Error ('Cannot be occupied!');
    }

    // Housekeeping status does not prevent a room from being occupied.
    // OCCUPIED + DIRTY is a valid state.
};

export const validateMaitenanceRules = (
    room: Room,
    nextMaitenanceStatus: MaintenanceStatus
) => {
    // Add rules in future  
};