import type { StaffRole } from './auth';

export interface NavigationItem {
    label: string;
    path: string;
    icon: React.ReactNode;
    permission: string;
}