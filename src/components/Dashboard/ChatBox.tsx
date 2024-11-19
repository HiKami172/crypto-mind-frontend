import * as React from 'react';
import Card from '@mui/material/Card';
import ChatInput from '../Dashboard/ChatInput';
import Box from '@mui/material/Box';
import IconButton from "@mui/material/IconButton";
import {CardActionArea, CardHeader} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ChatMessage from './ChatMessage';
import ChatIcon from '@mui/icons-material/Chat';
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { TypeAnimation } from "react-type-animation";
import Stack from "@mui/material/Stack";
import StatCard from "./StatCard";
import ChartPortfolioAssets from "./ChartPorfolioAssets";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

interface Message {
    role: string;
    content: string;
    timestamp: string;
}

interface Thread {
    id: number;
    title: string;
    messages: Array<Message>;
    createdAt: string;
}

interface ThreadsMenuProps {
    threads: Array<Thread>;
    currentThread: Thread | null;
    setCurrentThread: (currentThread: Thread) => void;
}

const formatTimestamp = (isoTimestamp: string) => {
    const timestamp = new Date(isoTimestamp);
    const now = new Date();
    const isToday = timestamp.toDateString() === now.toDateString();

    if (isToday) {
        return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    }
    return timestamp.toLocaleDateString();
};

function ThreadsMenu({ threads, currentThread, setCurrentThread }: ThreadsMenuProps) {
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
                {threads.map((thread, index) => (
                    <React.Fragment key={index}>
                        <ListItemButton
                            onClick={() => setCurrentThread(thread)}
                            sx={{
                                borderRadius: '10px',
                                backgroundColor: thread.id === currentThread?.id
                                    ? "#1d212d"
                                    : "transparent",
                            }}
                        >
                            <ListItemText
                                primary={
                                    <Box
                                        sx={{
                                            maxWidth: '100%', // or any specific width (e.g., 250px)
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {thread.title}
                                    </Box>
                                }
                                secondary={formatTimestamp(thread.createdAt)}
                            />
                        </ListItemButton>
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
}

const threads = [
    {
        id: 1,
        title: 'What are the trending coins?',
        createdAt: '2024-11-17T10:00:00Z', // ISO 8601 format
        messages: [
            { role: 'user', content: 'What are the trending coins today?', timestamp: '2024-11-17T10:01:00Z' },
            { role: 'agent', content: 'Currently, BTC, ETH, and SOL are trending.', timestamp: '2024-11-17T10:03:00Z' },
            { role: 'user', content: 'Thanks! What about ADA?', timestamp: '2024-11-17T10:05:00Z' },
            { role: 'agent', content: 'ADA is slightly trending but not in the top 3.', timestamp: '2024-11-17T10:06:00Z' },
        ],
    },
    {
        id: 2,
        title: 'How much is my gain this month?',
        createdAt: '2024-11-16T09:00:00Z', // Yesterday
        messages: [
            { role: 'user', content: 'Can you calculate my monthly gain?', timestamp: '2024-11-16T09:00:00Z' },
            { role: 'agent', content: 'Sure, let me check your portfolio details.', timestamp: '2024-11-16T09:02:00Z' },
            { role: 'agent', content: 'Your total gain this month is $1,250.', timestamp: '2024-11-16T09:10:00Z' },
            { role: 'user', content: 'Great! Thank you for the update.', timestamp: '2024-11-16T09:12:00Z' },
        ],
    },
    {
        id: 3,
        title: 'What is the best strategy to use on SOL market?',
        createdAt: '2024-11-15T14:30:00Z', // 2 days ago
        messages: [
            { role: 'user', content: 'What strategy should I use for SOL trading?', timestamp: '2024-11-15T14:30:00Z' },
            { role: 'agent', content: 'For SOL, a breakout strategy often works well.', timestamp: '2024-11-15T14:35:00Z' },
            { role: 'user', content: 'Can you provide more details on that?', timestamp: '2024-11-15T14:40:00Z' },
            { role: 'agent', content: 'Sure, let me send you a guide on breakout strategies.', timestamp: '2024-11-15T14:45:00Z' },
        ],
    },
];

// To be added for new thread prompt options
// const predefinedPrompts = [
//     "What are the trending cryptocurrencies today?",
//     "How much profit did I make this week?",
//     // "What is the best strategy for trading Bitcoin?",
//     // "Can you analyze my portfolio performance?",
// ];

export default function ChatBox() {
    const [currentThread, setCurrentThread] = React.useState<Thread | null>(null);
    const [localThreads, setLocalThreads] = React.useState<Thread[]>(threads);

    const handleNewThread = () => setCurrentThread(null);

    const handleSendMessage = (prompt: string) => {
        const timestamp = new Date().toISOString();
        const newMessage: Message = {
            role: 'user',
            content: prompt,
            timestamp: timestamp,
        };

        if (!currentThread) {
            const newThread: Thread = {
                id: localThreads.length + 1,
                title: prompt,
                createdAt: timestamp,
                messages: [newMessage],
            };
            setLocalThreads([newThread, ...localThreads]);
            setCurrentThread(newThread);
        } else {
            const updatedThread = {
                ...currentThread,
                messages: [...currentThread.messages, newMessage],
            };
            setCurrentThread(updatedThread);

            const updatedThreads = localThreads.map((thread) =>
                thread.id === currentThread.id ? updatedThread : thread
            );
            setLocalThreads(updatedThreads);
        }
    };

    return (
        <Card
            variant="outlined"
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <CardHeader
                title={"Chat"}
                action={
                    <IconButton color="primary" size="small" onClick={handleNewThread}>
                        <ChatIcon />
                    </IconButton>
                }
            />
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid size={{ xs: 9, md: 8 }} sx={{display: "flex", flexDirection: "column"}}>
                    <Box
                        sx={{
                            flexGrow: 1,
                            overflowY: 'auto',
                            padding: 2,
                            border: '1px solid hsl(220deg 20% 25% / 60%)',
                            borderRadius: "8px",
                            display: currentThread ? 'block' : 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: "400px",
                        }}
                    >
                        {currentThread ? (
                            currentThread.messages.map((message, index) => (
                                <ChatMessage
                                    key={index}
                                    role={message.role}
                                    content={message.content}
                                    timestamp={message.timestamp}
                                />
                            ))
                        ) : (
                            <Grid container spacing={10}>
                                <TypeAnimation
                                    sequence={[
                                        'What would you like to ask?',
                                    ]}
                                    wrapper="span"
                                    speed={50}
                                    style={{
                                        display: 'block',
                                        border: 'solid 1px rgb(0,0,0)',
                                        fontSize: 'clamp(1rem, 5vw, 1.15rem)',
                                        fontFamily: `'Courier New', monospace`,
                                        fontWeight: 700,
                                        letterSpacing: '2px',
                                    }}
                                />
                                {/*<Grid container spacing={1}>*/}
                                {/*    <Stack gap={2} direction="row">*/}
                                {/*        {predefinedPrompts.map((prompt) => (*/}
                                {/*            <Card>*/}
                                {/*                <CardActionArea component={Button}>*/}
                                {/*                    <CardContent>*/}
                                {/*                        <Typography>{prompt}</Typography>*/}
                                {/*                    </CardContent>*/}
                                {/*                </CardActionArea>*/}
                                {/*            </Card>*/}
                                {/*        ))}*/}
                                {/*    </Stack>*/}
                                {/*</Grid>*/}
                            </Grid>
                        )}
                    </Box>

                    <Box sx={{ marginTop: 'auto', padding: 1}}>
                        <ChatInput handleSendMessage={handleSendMessage} />
                    </Box>
                </Grid>

                <Grid size={{ xs: 3, md: 4 }} sx={{maxHeight: "80%"}}>
                    <ThreadsMenu threads={localThreads} currentThread={currentThread} setCurrentThread={setCurrentThread} />
                </Grid>
            </Grid>
        </Card>
    );
}
