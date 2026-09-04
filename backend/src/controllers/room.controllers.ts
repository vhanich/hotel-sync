import { Request, Response, NextFunction} from 'express';

import { 
    createRoomSchema,
    getRoomsQuerySchema, 
    roomIdParamsSchema,
    updateRoomSchema,
    updateOccupancySchema,
    updateHousekeepingSchema,
    updateMaintenanceSchema
} from '../validators/room/room.validation';

import { 
    createRoomServise,
    getRoomsServise,
    getRoomByIdServise,
    updateRoomServise,
    updateOccupancyServise,
    updateHousekeepingServise, 
    updateMaintenanceServise,
    activateRoomService,
    deactivateRoomService
} from '../services/room.service';
import { log } from 'console';

export const createRoom = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = createRoomSchema.parse(req.body);
        const room = await createRoomServise(data);
        res.status(201).json(room);
    } catch (error) {
        next(error);
    }
};

export const getAllRooms = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const query = getRoomsQuerySchema.parse(req.query)
        const rooms = await getRoomsServise(query);

        res.status(200).json(rooms);
    } catch (error) {
        next(error);
    }
};

export const getRoomByID = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = roomIdParamsSchema.parse(req.params);
        const room = await getRoomByIdServise(id);

        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
};

export const updateRoomInfo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = roomIdParamsSchema.parse(req.params);
        const data = updateRoomSchema.parse(req.body);

        const room = await updateRoomServise(id, data);

        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
};

export const updateOccupancy = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = roomIdParamsSchema.parse(req.params);
        const data = updateOccupancySchema.parse(req.body);

        const room = await updateOccupancyServise(
            id,
            data,
        );
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
};

export const updateHousekeeping = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = roomIdParamsSchema.parse(req.params);
        const data = updateHousekeepingSchema.parse(req.body);

        const room = await updateHousekeepingServise(
            id,
            data,
        );
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
};

export const updateMaintenance = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = roomIdParamsSchema.parse(req.params);
        const data = updateMaintenanceSchema.parse(req.body);

        const room = await updateMaintenanceServise(
            id,
            data,
        );
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
};

export const activateRoom = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = roomIdParamsSchema.parse(req.params);

        const room = await activateRoomService(id);
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
};

export const deactivateRoom = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = roomIdParamsSchema.parse(req.params);
        console.log('котроллер відпрацював!');
        
        const room = await deactivateRoomService(id);
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
}
 