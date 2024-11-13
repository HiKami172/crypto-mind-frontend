import React from 'react';
import styled from 'styled-components';
import { Message } from '../../../types';

const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const MessageItem = styled.div<{ sender: 'user' | 'agent' }>`
  padding: 10px;
  margin: 5px 0;
  background-color: ${({ sender }) => (sender === 'user' ? '#e1f5fe' : '#e0e0e0')};
  border-radius: 5px;
  text-align: ${({ sender }) => (sender === 'user' ? 'right' : 'left')};
`;

type Props = {
    messages: Message[];
};

const MessageHistory: React.FC<Props> = ({ messages }) => (
    <MessageList>
        {messages.map((message) => (
            <MessageItem key={message.id} sender={message.sender}>
                <strong>{message.sender === 'user' ? 'You' : 'Agent'}:</strong> {message.content}
            </MessageItem>
        ))}
    </MessageList>
);

export default MessageHistory;
