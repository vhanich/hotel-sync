import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HotelIcon from '@mui/icons-material/Hotel';

import type { NavigationItem } from '../types/navigation';

export const navigationItems: NavigationItem[] = [
    {
        label: 'Dashboard',
        path: '/dashboard',
        icon: <DashboardIcon /> ,
        permission: 'dashboard:view',
    },
    {
        label: 'Staff',
        path: '/staff',
        icon: <PeopleIcon />,
        permission: 'staff:view',
    },
    {
        label: 'Tasks',
        path: '/tasks',
        icon: <AssignmentIcon />,
        permission: 'task:view',

    },
    {
        label: 'Rooms',
        path: '/rooms',
        icon: <HotelIcon />,
        permission: 'room:view',
    },
];

