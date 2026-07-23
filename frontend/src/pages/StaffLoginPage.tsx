import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useAuth } from '../hooks/useAuth';
import { PinLoginForm } from '../components/auth/PinLoginForm';

export default function StaffLoginPage() {
    const [error, setError] = useState('')
    const { loginStaff, authLoading } = useAuth();

    const navigate = useNavigate();

    const handleLogin = async (staffId: string, pinCode: string) => {
        setError('');
        
        try {
            await loginStaff({
                staffId,
                pinCode
            });

            
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.error);
            } else {
                setError('Invalid Staff ID or Pin Code');
            }
        } 

    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <PinLoginForm 
                error={error}
                handleLogin={handleLogin}
                loading={authLoading}
            />
            
        </div>
    );
}