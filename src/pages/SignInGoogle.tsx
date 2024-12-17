import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../api/axiosInstance';
import { AuthContext } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';

export default function SignInGoogle() {
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
                    navigate('/dashboard');
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

    return (
        <Stack
            direction="column"
            component="main"
            sx={[
                {
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    position: 'relative',
                },
                (theme) => ({
                    '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'fixed',
                        zIndex: -1,
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage:
                            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        ...theme.applyStyles('dark', {
                            backgroundImage:
                                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
                        }),
                    },
                }),
            ]}
        >
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    Signing in with Google
                </Typography>
                <CircularProgress />
            </Box>
        </Stack>
    );
}
