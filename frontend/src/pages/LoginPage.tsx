import { useState } from 'react';
import  axios  from 'axios';
import { useNavigate } from 'react-router-dom';


import { useAuth } from '../hooks/useAuth';
import { LoginForm } from '../components/auth/LoginForm';

export default function LoginPage() {
    const [ error, setError ] = useState<string>('')
    const { loginAdmin, authLoading} = useAuth();
    
    const handleLogin = async (staffId: string, password: string) => {
        
        try {
           await loginAdmin({
                staffId, 
                password
            });
           
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.error);
            } else {
                setError('Invalid Staff ID or Password');

            }
        }
        
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <LoginForm 
                handleLogin={handleLogin}
                error={error}
                loading={authLoading}
            />
        </div>
    );
}