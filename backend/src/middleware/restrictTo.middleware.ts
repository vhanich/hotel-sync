import { Request, Response, NextFunction } from 'express';
import type { StaffRole } from '@prisma/client';

export const restrictTo = (allowedRoles: StaffRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if(!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        return next();
    }
};
