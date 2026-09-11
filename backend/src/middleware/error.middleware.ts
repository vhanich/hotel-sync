import { ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

export const errorHandler = (
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (error instanceof ZodError) {
        return res.status(400).json({
            code: 'VALIDATION_ERROR',
            message: error.issues[0].message,
        });
    }

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            code: error.code,
            message: error.message,
        });
    }

    console.error(error);

    return res.status(500).json({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Internal server error.',
    });
};