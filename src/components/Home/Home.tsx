import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';

const Home: React.FC = () => {
    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: 8 }}>
            <Box>
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome to CryptoMind
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom>
                    Your personal AI-driven crypto trading platform.
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 3 }}>
                    Explore Features
                </Button>
            </Box>
        </Container>
    );
};

export default Home;
