import { prisma } from '../lib/prisma';
import { Room } from '@prisma/client';

import {
    CreateRoomInput,
    GetRoomsQuery,
    UpdateHousekeepingInput,
    UpdateMaintenanceInput,
    UpdateOccupancyInput,
    UpdateRoomInput,
} from '../validators/room/room.validation';

import {
    validateOccupancyTransition,
    validateHousekeepingTransition,
    validateMaintenanceTransition
} from '../domain/room/room-state.transitions';

import { 
    validateOccupancyRules,
    validateUpdateRoomRules,
    validateMaitenanceRules 
} from '../domain/room/room-state.rules'

export const getRoomsServise = async (query: GetRoomsQuery) => {
    const {
        page,
        limit,
        search,
        type,
        floor,
        occupancyStatus,
        housekeepingStatus,
        maintenanceStatus,
        isActive
    } = query;

    const where = {
        ...(search && {
            number: {
                contains: search,
                mode: 'insensitive' as const,
            },
        }),

        ...(type && { type }),
        ...(floor !== undefined && { floor }),
        ...(occupancyStatus && { occupancyStatus }),
        ...(housekeepingStatus && { housekeepingStatus }),
        ...(maintenanceStatus && { maintenanceStatus}),
        ...(isActive !== undefined && { isActive }),
    };

    const [rooms, total] = await prisma.$transaction([
        prisma.room.findMany({
            where,
            orderBy: {
                number: 'asc',
            },
            skip: (page - 1) * limit,
            take: limit,
        }),

        prisma.room.count({
            where,
        }),
    ]);

    return {
        data: rooms.map(mapRoomResponse),
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};

export const createRoomServise = async (data: CreateRoomInput) => {
    const existingRoom = await prisma.room.findUnique({
        where: {
            number: data.number
        }
    });

    if (existingRoom) {
        throw new Error('Room number already exists!');
    }

    const room = await prisma.room.create({
        data: {
            number: data.number,
            floor: data.floor,
            type: data.type,
            capacity: data.capacity,
        },
    });

    return mapRoomResponse(room);
};

export const getRoomByIdServise = async (id: string) => {
    const room = await findRoomOrThrow(id);

    return mapRoomResponse(room);
};

export const updateRoomServise = async (
    id: string,
    data: UpdateRoomInput
) => {
    const room = await findRoomOrThrow(id);

    validateUpdateRoomRules(room, data);

    if (
        data.number !== undefined &&
        data.number !== room.number
    ) {
        const existingRoom = await prisma.room.findUnique({
            where: {
                number: data.number,
            },
        });

        if (existingRoom) {
            throw new Error('Room number already exists!')
        }
    }

    const updatedRoom = await prisma.room.update({
        where: { id },
        data,
    });

    return mapRoomResponse(updatedRoom);
};

export const updateOccupancyServise = async (
    id: string,
    data: UpdateOccupancyInput
) => {
    const room = await findRoomOrThrow(id);

    validateOccupancyTransition(
        room.occupancyStatus,
        data.occupancyStatus
    );

    validateOccupancyRules(
        room,
        data.occupancyStatus
    );

    const updatedRoom = await prisma.room.update({
        where: { id },
        data: {
            occupancyStatus: data.occupancyStatus,
        },
    });

    return mapRoomResponse(updatedRoom);
};

export const updateHousekeepingServise = async (
    id: string,
    data: UpdateHousekeepingInput
) => {
    const room = await findRoomOrThrow(id);

    validateHousekeepingTransition(
        room.housekeepingStatus,
        data.housekeepingStatus
    );

    const updatedRoom = await prisma.room.update({
        where: { id },
        data: {
            housekeepingStatus: data.housekeepingStatus
        },
    });

    return mapRoomResponse(updatedRoom);
};

export const updateMaintenanceServise = async (
    id: string,
    data: UpdateMaintenanceInput
) => {
    const room = await findRoomOrThrow(id);

    validateMaintenanceTransition(
        room.maintenanceStatus,
        data.maintenanceStatus
    );
    validateMaitenanceRules(room, data.maintenanceStatus);

    const updatedRoom = await prisma.room.update({
        where: { id },
        data: {
            maintenanceStatus: data.maintenanceStatus
        }
    });

    return mapRoomResponse(updatedRoom);
};

export const activateRoomService = async (id: string) => {
    const room = await findRoomOrThrow(id);

    if (room.isActive) {
        throw new Error('Room already active!');
    } 

    const updatedRoom = await prisma.room.update({
        where: { id },
        data: {
            isActive: true
        },
    });

    return mapRoomResponse(updatedRoom);
};

export const deactivateRoomService = async (id: string) => {
    console.log('service worked');
    
    const room = await findRoomOrThrow(id);

    if (!room.isActive) {
        throw new Error('Room already inactive!');
    }

    if (room.occupancyStatus === 'OCCUPIED') {
        throw new Error('Room is ccupied!');
    }

    const updatedRoom = await prisma.room.update({
        where: { id },
        data: {
            isActive: false
        },
    });

    return mapRoomResponse(updatedRoom);
};


const findRoomOrThrow = async (id: string) => {
    const room = await prisma.room.findUnique({
        where: { id },
    });

    if (!room) {
        throw new Error('Room not found!');
    }

    return room;
};

const mapRoomResponse = (room: Room) => {
    return {
        id: room.id,
        number: room.number,
        floor: room.floor,
        type: room.type,
        capacity: room.capacity,

        occupancyStatus: room.occupancyStatus,
        housekeepingStatus: room.housekeepingStatus,
        maintenanceStatus: room.maintenanceStatus,

        isActive: room.isActive,

        isAvailableNow:
            room.isActive &&
            room.occupancyStatus === 'VACANT' &&
            room.housekeepingStatus === 'CLEAN' &&
            room.maintenanceStatus === 'OPERATIONAL',

        createdAt: room.createdAt,
        updatedAt: room.updatedAt,    
    };
};