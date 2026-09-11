import type {
    OccupancyStatus,
    HousekeepingStatus,
    MaintenanceStatus
} from '../../validators/room/room.validation';

const occupancyTransitions: Record<
    OccupancyStatus,
    OccupancyStatus[]
> = {
    VACANT: ['OCCUPIED'],
    OCCUPIED: ['VACANT'],
};

export const validateOccupancyTransition = (
    current:OccupancyStatus,
    next: OccupancyStatus
): void => {
    if (!occupancyTransitions[current].includes(next)) {
        throw new Error('INVALID_OCCUPANCY_TRANSITION');
    }
};

const housekeepingTransition: Record<
    HousekeepingStatus,
    HousekeepingStatus[]
> = {
    DIRTY: ['CLEANING'],

    CLEANING: ['INSPECTION_REQUIRED'],

    INSPECTION_REQUIRED: [
        'CLEAN',
        'DIRTY',
    ],

    CLEAN: ['DIRTY'],
};

export const validateHousekeepingTransition = (
    current: HousekeepingStatus,
    next: HousekeepingStatus
): void => {
    if (!housekeepingTransition[current].includes(next)) {
        throw new Error('INVALID_HOUSEKEEPING_TRANSITION');
    }
};

const maintenanceTransitions: Record<
    MaintenanceStatus,
    MaintenanceStatus[]
> = {
    OPERATIONAL: [
        'UNDER_MAINTENANCE',
        'OUT_OF_ORDER',
    ],

    UNDER_MAINTENANCE: [
        'OPERATIONAL',
        'OUT_OF_ORDER',
    ],

    OUT_OF_ORDER: [
        'OPERATIONAL',
        'UNDER_MAINTENANCE',
    ],
};

export const validateMaintenanceTransition = (
    current: MaintenanceStatus,
    next: MaintenanceStatus 
): void => {
    if (!maintenanceTransitions[current].includes(next)) {
        throw new Error('INVALID_MAINTENANCE_TRANSITION')
    }
};