import { Request, Response, NextFunction } from 'express';
import { StaffRole } from '@prisma/client';
import { verifyAccessToken } from '../utils/jwt';


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const { payload } = await verifyAccessToken(token);
        req.user = {
            id: payload.sub as string,
            role: payload.role as StaffRole
        };
        return next();
       
    } catch (error: any) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
}
