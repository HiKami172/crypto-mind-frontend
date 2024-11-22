import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import AppRoutes from './routes/AppRoutes';
import AppProviders from './providers/AppProviders';

const App: React.FC = () => {
    return (
        <Router>
            <AppProviders>
                <CssBaseline />
                <AppRoutes />
            </AppProviders>
        </Router>
    );
};

export default App;
