import { createContext, useState, useEffect, type ReactNode } from 'react';
import API from '../services/api';

interface User {
    id: string;
    staffId: string;
    role: 'ADMIN' | 'CLEANER' | 'REPAIRMAN';
    name: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    initializing: boolean;
    authLoading: boolean;
    loginAdmin: (credentials: { staffId: string; password: string }) => Promise<void>;
    loginStaff: (credentials: { staffId: string; pinCode: string }) => Promise<void>;
    logout: () => Promise<void>;
    checkCurrentUser: () => Promise<void>;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [initializing, setInitializing] = useState<boolean>(false);
    const [authLoading, setAuthLoading] = useState<boolean>(false);  

    const checkCurrentUser = async () => {
        setInitializing(true)
        try {
            const response = await API.get('/auth/me');
            const currentUser = response.data.data.user;
            setUser(currentUser);
            
            return response.data.data.user;
        } catch (error) {
            setUser(null);
            return null;
        } finally {
            setInitializing(false);
        }
    };

    const loginAdmin = async (credentials: { staffId: string; password: string }) => {
        setAuthLoading(true);
        try {
            await API.post('/auth/login', credentials);
            const user = await checkCurrentUser();
            console.log('user', user);
            return user;
        } catch (error) {
            setUser(null);
            throw error;
        } finally {
            setAuthLoading(false);
        }
    };

    const loginStaff = async (credentials: { staffId: string; pinCode: string }) => {
        setAuthLoading(true);
        try {
            await API.post('/auth/pin', credentials);
            const user = await checkCurrentUser();

            return user;
        } catch (error) {
            setUser(null);
            throw error;
        } finally {
            setAuthLoading(false);
        }
    };

    const logout = async () => {
        setAuthLoading(true);
        try {
            await API.post('/auth/logout');
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setUser(null);
            setAuthLoading(false);
        }
    };

    useEffect(() => {
        checkCurrentUser();
    }, []);

    return (
        <AuthContext.Provider value={{ 
            user,
            isAuthenticated: !!user,
            initializing,
            authLoading,
            loginAdmin,
            loginStaff,
            logout,
            checkCurrentUser
        }}>
            {!initializing && children}
        </AuthContext.Provider>
    );

};

