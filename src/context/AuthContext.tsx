import { signIn } from '../api/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextProps {
    isAuthenticated: boolean;
    login: (email: string, password: string, keepLoggedIn: boolean, navigate: (path: string) => void) => Promise<void>;
    logout: (navigate: (path: string) => void) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Initialize isAuthenticated based on whether there is a token in localStorage
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!localStorage.getItem('token'));

    useEffect(() => {
        // Re-check token on mount in case it changed
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email: string, password: string, keepLoggedIn: boolean, navigate: (path: string) => void) => {
        const loginResult = await signIn(email, password, keepLoggedIn);
        console.log(loginResult);
        console.log("access_token ==> ", loginResult.token.access_token.token);
        localStorage.setItem('token', loginResult.token.access_token.token);
        setIsAuthenticated(true);
        navigate('/home');
    };

    const logout = (navigate: (path: string) => void) => {
        localStorage.removeItem('token');
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
