import React, {useContext, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../api/axiosInstance';
import {AuthContext} from "../context/AuthContext";

export default function SignInGoogle(){
    const location = useLocation();
    const navigate = useNavigate();

    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { setAuthState } = authContext;

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        console.log(params);
        if (params) {
            API.get(`/auth/google/callback?${params}`)
                .then((res) => {
                    setAuthState(res.data.access_token)
                    navigate('/dashboard'); // Redirect to the dashboard
                })
                .catch((error) => {
                    console.error('Failed to associate account:', error);
                    navigate('/dashboard');
                    });
        } else {
            console.error('No params provided:', params);
            navigate('/dashboard');
        }
    }, [location, navigate, setAuthState]);

    return <div>Signing in with Google...</div>;
};

