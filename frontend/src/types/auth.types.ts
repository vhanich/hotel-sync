import type { StaffRole } from './staff.types';

export interface User {
    id: string;
    // staffId: string;
    role: StaffRole;
}