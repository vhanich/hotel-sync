export type StaffRole = 'ADMIN' | 'CLEANER' | 'REPAIRMAN';

export interface User {
    id: string;
    // staffId: string;
    role: StaffRole;
}