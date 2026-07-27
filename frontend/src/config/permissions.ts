export const rolePermissions: Record<string, string[]> = {
    ADMIN: [
        'dashboard:view',
        'staff:view',
        'tasks:view',
        'rooms:view',
    ],
    CLEANER: [
        'dashboard:view',
        'tasks:view',
        'rooms:view',
    ],
    REPAIRMAN: [
        'dashboard:view',
        'tasks:view',
        'rooms:view',
    ],
};