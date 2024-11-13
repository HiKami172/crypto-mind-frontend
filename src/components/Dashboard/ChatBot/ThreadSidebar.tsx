import React from 'react';
import styled from 'styled-components';
import { Thread } from '../../../types';

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #f1f1f1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const ThreadButton = styled.button`
  padding: 10px;
  margin-bottom: 10px;
  text-align: left;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #ececec;
  }
`;

type Props = {
    threads: Thread[];
    onSelectThread: (threadId: string) => void;
};

const ThreadSidebar: React.FC<Props> = ({ threads, onSelectThread }) => (
    <SidebarContainer>
        {threads.map((thread) => (
            <ThreadButton key={thread.id} onClick={() => onSelectThread(thread.id)}>
                {thread.title}
            </ThreadButton>
        ))}
    </SidebarContainer>
);

export default ThreadSidebar;
