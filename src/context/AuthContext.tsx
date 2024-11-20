import { signIn, signUp } from '../api/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextProps {
    isAuthenticated: boolean;
    login: (email: string, password: string, keepLoggedIn: boolean, navigate: (path: string) => void) => Promise<void>;
    register: (name: string, email: string, password: string, navigate: (path: string) => void) => Promise<void>;
    logout: (navigate: (path: string) => void) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!localStorage.getItem('token'));

    useEffect(() => {
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
        navigate('/dashboard');
    };

    const register = async (name: string, email: string, password: string, navigate: (parht: string) => void) => {
        const registerResult = await signUp(name, email, password)
        localStorage.setItem('token', registerResult.token.access_token.token);
        setIsAuthenticated(true);
        navigate('/dashboard');
    };

    const logout = (navigate: (path: string) => void) => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/sign-in');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
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
