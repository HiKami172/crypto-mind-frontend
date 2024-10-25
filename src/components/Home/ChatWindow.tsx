import React, { useState } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

interface Message {
    id: string;
    role: string;
    text: string;
    created_at: string;
}

interface ChatWindowProps {
    threadId: string | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ threadId }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');

    const sendMessage = async () => {
        if (!input) return;

        try {
            if (threadId === 'new-thread') {
                // Create a new thread
                const newThreadResponse = await axios.post('/api/threads', { title: 'New Thread' });
                const newThreadId = newThreadResponse.data.id;

                // Send the first message in the newly created thread
                await axios.post(`/threads/${newThreadId}/messages`, { text: input, role: 'user' });

                // Reload thread messages
                setMessages([...messages, { id: Date.now().toString(), text: input, role: 'user', created_at: new Date().toISOString() }]);
                setInput('');
            } else {
                // Send message to existing thread
                await axios.post(`/threads/${threadId}/messages`, { text: input, role: 'user' });

                // Reload thread messages
                setMessages([...messages, { id: Date.now().toString(), text: input, role: 'user', created_at: new Date().toISOString() }]);
                setInput('');
            }
        } catch (error) {
            console.error('Failed to send message', error);
        }
    };

    return (
        <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <List sx={{ flexGrow: 1, overflow: 'auto' }}>
                {messages.map((message) => (
                    <ListItem key={message.id}>
                        <ListItemText primary={`${message.role}: ${message.text}`} secondary={new Date(message.created_at).toLocaleString()} />
                    </ListItem>
                ))}
            </List>
            <TextField
                fullWidth
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                sx={{ marginBottom: 2 }}
            />
            <Button variant="contained" color="primary" onClick={sendMessage}>
                Send
            </Button>
        </Box>
    );
};

export default ChatWindow;
