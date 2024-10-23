import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../api/auth';
import { TextField, Button, Checkbox, FormControlLabel, Container, Typography, Box, AppBar, Toolbar } from '@mui/material';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signIn(email, password, keepLoggedIn);
            navigate('/home'); // Redirect to home page on success
        } catch (err: any) {
            setError('Failed to sign in. Please check your credentials.');
        }
    };

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
                <Toolbar sx={{ justifyContent: 'center' }}>
                    <Box
                        component="img"
                        src={"/logo512.png"}
                        alt="CryptoMind Logo"
                        sx={{ height: 40, marginRight: 2 }}
                    />
                    <Typography variant="h6" component="div">
                        CryptoMind
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="xs">
                <Box
                    component="form"
                    onSubmit={handleSignIn}
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={keepLoggedIn} onChange={(e) => setKeepLoggedIn(e.target.checked)} color="primary" />
                        }
                        label="Keep me signed in"
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Container>
        </>
    );
};

export default SignIn;
