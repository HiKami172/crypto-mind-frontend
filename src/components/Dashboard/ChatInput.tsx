import React, { useState } from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

interface ChatInputProps {
    handleSendMessage: (prompt: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ handleSendMessage }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value.length <= 200) {
            setInputValue(event.target.value);
        }
    };

    const handleSend = () => {
        if (inputValue.trim()) {
            handleSendMessage(inputValue.trim());
            setInputValue('');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '4px 8px',
                margin: '5px',
                border: "none"
            }}
        >
            <TextareaAutosize
                minRows={1}
                maxRows={5}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                style={{
                    flex: 1,
                    resize: 'none',
                    border: 'none',
                    borderRadius: '15px',
                    outline: 'none',
                    fontSize: '1rem',
                    padding: '10px',
                    margin: '5px',
                    fontFamily: 'inherit',
                }}
                placeholder="Type your message..."
            />
            <IconButton
                color="primary"
                edge="end"
                sx={{
                    alignSelf: 'flex-end',
                    margin: '5px',
                }}
                onClick={handleSend}
            >
                <SendIcon />
            </IconButton>
        </Box>
    );
};

export default ChatInput;
