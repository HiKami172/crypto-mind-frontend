import { signIn } from '../api/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextProps {
    isAuthenticated: boolean;
    login: (email: string, password: string, keepLoggedIn: boolean, navigate: (path: string) => void) => Promise<void>;
    logout: (navigate: (path: string) => void) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        setIsAuthenticated(!!token);
    }, []);

    const login = async (email: string, password: string, keepLoggedIn: boolean, navigate: (path: string) => void) => {
        await signIn(email, password, keepLoggedIn);
        setIsAuthenticated(true);
        navigate('/home');
    };

    const logout = (navigate: (path: string) => void) => {
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
