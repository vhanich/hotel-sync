import type { StaffRole } from '@prisma/client';

export interface AuthUser {
    id: string;
    role: StaffRole;
}