import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { StaffRole } from '../types/auth';

interface ProtectedRouteProps {
    allowedRoles?: StaffRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const { user, initializing } = useAuth();

    if (initializing) {
        return 'Loading...'
    }

    if (!user) {
        return  <Navigate to='/login' replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to='/403' replace />;
    }

    return <Outlet />;
}