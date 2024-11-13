import React, { useState } from 'react';
import styled from 'styled-components';
import { Thread, Message } from '../../../types';
import ThreadSidebar from './ThreadSidebar';
import MessageHistory from './MessageHistory';
import ChatInput from './ChatInput';

const ChatPanelContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    height: 100%;
    background-color: #f9f9f9;
`;

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #ffffff;
    border-left: 1px solid #e0e0e0;
    max-height: 100vh;
`;

const MessageHistoryContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 5px;
`;

const ChatPanel: React.FC = () => {
    const [threads, setThreads] = useState<Thread[]>([
        {
            id: '1',
            title: 'Welcome Thread',
            messages: [
                { id: 'm1', sender: 'agent', content: 'Hello! How can I assist you today?', timestamp: new Date() },
            ],
        },
    ]);

    const [currentThreadId, setCurrentThreadId] = useState<string>('1');
    const [currentMessages, setCurrentMessages] = useState<Message[]>(threads[0].messages);

    const handleSendMessage = (messageContent: string) => {
        const newMessage: Message = {
            id: `m${currentMessages.length + 1}`,
            sender: 'user',
            content: messageContent,
            timestamp: new Date(),
        };
        const updatedMessages = [...currentMessages, newMessage];
        setCurrentMessages(updatedMessages);
        updateThreadMessages(currentThreadId, updatedMessages);
    };

    const updateThreadMessages = (threadId: string, messages: Message[]) => {
        setThreads(threads.map((thread) =>
            thread.id === threadId ? { ...thread, messages } : thread
        ));
    };

    const handleThreadSelect = (threadId: string) => {
        setCurrentThreadId(threadId);
        const selectedThread = threads.find(thread => thread.id === threadId);
        if (selectedThread) {
            setCurrentMessages(selectedThread.messages);
        }
    };

    return (
        <ChatPanelContainer>
            <ChatContainer>
                <MessageHistoryContainer>
                    <MessageHistory messages={currentMessages} />
                </MessageHistoryContainer>
                <ChatInput onSendMessage={handleSendMessage} />
            </ChatContainer>
            <ThreadSidebar threads={threads} onSelectThread={handleThreadSelect} />
        </ChatPanelContainer>
    );
};

export default ChatPanel;

