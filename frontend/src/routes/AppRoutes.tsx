import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { StaffLoginPage } from '../pages/StaffLoginPage';
import { MainLayout } from '../layouts/mainLayout/MainLayout';
import { DashboardPage } from '../pages/DashboardPage';
import { ForbiddenPage } from '../pages/ForbiddenPage';
import { ProtectedRoute } from './ProtectedRoute';
import { StaffManagementPage } from '../pages/StaffManagementPage';


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/staff-login' element={<StaffLoginPage />} />
            <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />} >
                    <Route path='/dashboard' element={<DashboardPage />} />
                    <Route path='/403' element={<ForbiddenPage />} />

                    <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />} >
                        <Route path='/staff' element={<StaffManagementPage />} />
                        {/* <Route path='/reservations' element={<ReservationPage />} /> */}
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['CLEANER', 'REPAIRMAN']} />}>
                        {/* <Route path='/tasks' element={<TasksPage />} />
                        <Route path='/rooms' element={<RoomsPage />} /> */}
                    </Route>
                    
                </Route>
            </Route>
            

        </Routes>
    ); 
}