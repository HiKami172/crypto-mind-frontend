import {Thread} from "../../types";
import React from 'react';
import {Box, Divider, List, ListItemButton, ListItemText} from '@mui/material';

interface ThreadsMenuProps {
    threads: Thread[];
    currentThread: Thread | null;
    handleSelectThread: (currentThread: Thread) => void;
}

const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const diffInTime = today.getTime() - date.getTime();
    const oneDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds
    const oneMonth = 30 * oneDay; // approx. 30 days

    const isSameDay = today.toDateString() === date.toDateString();
    if (isSameDay) {
        return 'Today';
    }
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const isYesterday = yesterday.toDateString() === date.toDateString();
    if (isYesterday) {
        return 'Yesterday';
    }
    if (diffInTime < oneMonth) {
        return 'Last 30 Days';
    }

    const currentYear = today.getFullYear();
    const threadYear = date.getFullYear();

    if (threadYear === currentYear) {
        const monthName = date.toLocaleString('en-US', { month: 'long' });
        return `${monthName} ${currentYear}`;
    }

    return date.toLocaleString('en-US', {year: 'numeric', month: 'long'});
};

const groupThreadsByDate = (threads: any[]) => {
    const groupedThreads: Record<string, any[]> = {};

    threads.forEach((thread) => {
        const dateLabel = formatTimestamp(thread.updated_at);
        if (!groupedThreads[dateLabel]) {
            groupedThreads[dateLabel] = [];
        }
        groupedThreads[dateLabel].push(thread);
    });

    return groupedThreads;
};

export default function ThreadsMenu({ threads, currentThread, handleSelectThread }: ThreadsMenuProps) {
    const groupedThreads = groupThreadsByDate(threads);

    return (
        <Box
            sx={{
                flexGrow: 1,
                overflowY: 'auto',
                padding: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid hsl(220deg 20% 25% / 60%)',
                borderRadius: "8px",
                maxHeight: "445px",
            }}
        >
            <List
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: 0,
                }}
            >
                {Object.keys(groupedThreads).map((dateLabel) => (
                    <React.Fragment key={dateLabel}>
                        <Divider sx={{ marginBottom: 1, marginTop: 2 }}>{dateLabel}</Divider>
                        {groupedThreads[dateLabel].map((thread, index) => (
                            <ListItemButton
                                key={index}
                                onClick={() => handleSelectThread(thread)}
                                sx={{
                                    borderRadius: '10px',
                                    backgroundColor: thread?.id === currentThread?.id
                                        ? "#1d212d"
                                        : "transparent",
                                }}
                            >
                                <ListItemText
                                    primary={
                                        <Box
                                            sx={{
                                                maxWidth: '100%',
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {thread?.title}
                                        </Box>
                                    }
                                />
                            </ListItemButton>
                        ))}
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
}