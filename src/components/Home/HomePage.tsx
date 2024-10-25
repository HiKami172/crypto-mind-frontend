// src/components/Home/HomePage.tsx
import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ThreadsPane from './ThreadsPane';
import ChatWindow from './ChatWindow';
import { useAuth } from '../../context/AuthContext';

const HomePage: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);

    const handleSelectThread = (threadId: string) => {
        setSelectedThreadId(threadId);
    };

    const handleLogout = () => {
        logout(navigate);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Button onClick={handleLogout} sx={{ alignSelf: 'flex-end', m: 2 }}>Logout</Button>
            <Box sx={{ display: 'flex', flex: 1 }}>
                <ThreadsPane onSelectThread={handleSelectThread} />
                {selectedThreadId && <ChatWindow threadId={selectedThreadId} />}
            </Box>
        </Box>
    );
};

export default HomePage;
