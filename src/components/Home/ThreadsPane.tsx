import React, { useState, useEffect } from 'react';
import { List, ListItemButton, ListItemText, Box, Typography, Button } from '@mui/material';
import axios from 'axios';

interface Thread {
    id: string;
    title: string;
    created_at: string;
}

interface ThreadsPaneProps {
    onSelectThread: (threadId: string) => void;
}

const ThreadsPane: React.FC<ThreadsPaneProps> = ({ onSelectThread }) => {
    const [threads, setThreads] = useState<Thread[]>([]);
    const [newThreadId, setNewThreadId] = useState<string | null>(null);

    useEffect(() => {
        const fetchThreads = async () => {
            try {
                const response = await axios.get('/api/threads');
                setThreads(response.data);
            } catch (error) {
                console.error('Failed to load threads');
            }
        };
        fetchThreads();
    }, []);

    const handleCreateNewThread = () => {
        // Create a "temporary" new thread and set it to the state as new-thread
        setNewThreadId('new-thread');
        onSelectThread('new-thread'); // Automatically select this thread
    };

    return (
        <Box sx={{ width: '300px', height: '100%', backgroundColor: '#f4f4f4', padding: 2 }}>
            <Typography variant="h6">Threads</Typography>
            <Button variant="contained" color="primary" fullWidth onClick={handleCreateNewThread}>
                New Thread
            </Button>
            <List>
                {threads.map((thread) => (
                    <ListItemButton key={thread.id} onClick={() => onSelectThread(thread.id)}>
                        <ListItemText primary={thread.title || 'Untitled Thread'} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
};

export default ThreadsPane;
