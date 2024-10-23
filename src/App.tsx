import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Home from './components/Home/Home';
import { CssBaseline } from '@mui/material';

const App: React.FC = () => {
    return (
        <Router>
            <CssBaseline />
            <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default App;
