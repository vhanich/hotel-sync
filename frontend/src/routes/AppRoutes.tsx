import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import StaffLoginPage from '../pages/StaffLoginPage';


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/staff-login' element={<StaffLoginPage />} />
        </Routes>
    ); 
}