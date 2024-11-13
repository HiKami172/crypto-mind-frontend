import React, { useState, KeyboardEvent } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
    display: flex;
    padding: 10px;
    border-top: 1px solid #ddd;
    background-color: #f1f1f1;
`;

const InputField = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const SendButton = styled.button`
    padding: 10px;
    margin-left: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

type Props = {
    onSendMessage: (messageContent: string) => void;
};

const ChatInput: React.FC<Props> = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSendClick = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevents the default behavior of Enter key
            handleSendClick();
        }
    };

    return (
        <InputContainer>
            <InputField
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Write a message..."
            />
            <SendButton onClick={handleSendClick}>Send</SendButton>
        </InputContainer>
    );
};

export default ChatInput;
