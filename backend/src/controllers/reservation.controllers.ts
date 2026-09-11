import { Request, Response, NextFunction} from 'express';

import { 
    createReservationSchema,
    getReservationsQuerySchema,
    reservationIdParamsSchema,
    updateReservationSchema
} from '../validators/reservation/reservation.validation';

import { 
    createReservationService, 
    readReservationByIdService,
    readAllReservationsService, 
    updateReservationService,
    cancelReservationService,
    checkInReservationService,
    checkOutReservationService
} from '../services/reservation.service/reservation.service';


export const createReservation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = createReservationSchema.parse(req.body);
        const reservation = await createReservationService(data);
        res.status(201).json(reservation);
    } catch (error) {
        next(error);
    }
};

export const readAllReservations = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const query = getReservationsQuerySchema.parse(req.query);
        
        const reservations = await readAllReservationsService(query);
        res.status(201).json(reservations);
    } catch (error) {
        next(error);
    }
};

export const readReservationById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = reservationIdParamsSchema.parse(req.params);
        const reservation = await readReservationByIdService(id);
        res.status(201).json(reservation);
    } catch (error) {
        next(error);
    }
};

export const updateReservation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = reservationIdParamsSchema.parse(req.params);
        const data = updateReservationSchema.parse(req.body);

        const reservation = await updateReservationService(id, data);
        res.status(201).json(reservation);

    } catch (error) {
        next(error);
    }
};
    
export const cancelReservation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = reservationIdParamsSchema.parse(req.params);

        const reservation = await cancelReservationService(id);
        res.status(201).json(reservation);
    } catch (error) {
        next(error);
    } 
};

export const checkInReservation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = reservationIdParamsSchema.parse(req.params);
        const reservation = await checkInReservationService(id);
        res.status(201).json(reservation);
    } catch (error) {
        next(error);
    }
};

export const checkOutReservation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = reservationIdParamsSchema.parse(req.params);
        const reservation = await checkOutReservationService(id);
        res.status(201).json(reservation);
    } catch (error) {
        next(error);
    }
};