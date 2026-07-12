import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';

export const validate = (scema: ZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await scema.parseAsync(req.body);
            return next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    status: 'fail',
                    error: error.issues.map(err => ({
                        path: err.path.join('.'),
                        message: err.message
                    }))
                });
            }
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
};