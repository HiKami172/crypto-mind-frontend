import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../api/auth';
import { TextField, Button, Container, Typography, Box, AppBar, Toolbar } from '@mui/material';

const SignUp: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== password2) {
            setError('Passwords do not match.');
            return;
        }
        try {
            await signUp(name, email, password, password2);
            navigate('/signin'); // Redirect to sign-in page on success
        } catch (err: any) {
            setError('Failed to sign up. Please try again.');
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
                onSubmit={handleSignUp}
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>
            </Box>
        </Container>
        </>
    );
};

export default SignUp;
