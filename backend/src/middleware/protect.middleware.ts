import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { StaffRole } from '@prisma/client';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const { payload } = await verifyAccessToken(token);
        req.user = {
            id: payload.id as string,
            role: payload.role as StaffRole
        };

        return next();
       
    } catch (error: any) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};