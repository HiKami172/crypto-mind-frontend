import React, { createContext, useState, useCallback } from 'react';
import API from '../api/axiosInstance';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    register: (fullname: string, email: string, password: string) => Promise<void>;
    login: (email: string, password: string, keepLoggedIn: boolean) => Promise<void>;
    googleLogin: () => Promise<void>;
    setAuthState: (newToken: string | null) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const navigate = useNavigate();

    const setAuthState = (newToken: string | null) => {
        if (newToken) {
            setToken(newToken);
            setIsAuthenticated(true);
            localStorage.setItem('token', newToken);
        } else {
            setToken(null);
            setIsAuthenticated(false);
            localStorage.removeItem('token');
        }
    };

    const register = async (fullname: string, email: string, password: string) => {
        const response = await API.post(`/auth/register`, {
            full_name: fullname,
            email,
            password,
        });
        setAuthState(response.data.access_token);
        navigate('/dashboard');
    };

    const login = async (email: string, password: string, keepLoggedIn: boolean) => {
        try {
            const requestData = { username: email, password: password };

            const response = await API.post(
                `/auth/login`,
                qs.stringify(requestData), // serialize the data
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );
            console.log(response.request);
            setAuthState(response.data.access_token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const googleLogin = async () => {
        const response = await API.get('/auth/google/authorize');
        window.location.href = response.data.authorization_url;
    };


    const logout = useCallback(async () => {
        setAuthState(null);
        navigate('/sign-in');
    }, [navigate]);


    return (
        <AuthContext.Provider value={{ isAuthenticated, token, register, login, googleLogin, setAuthState, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
