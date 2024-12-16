import * as React from 'react';
import Card from '@mui/material/Card';
import ChatInput from '../Dashboard/ChatInput';
import Box from '@mui/material/Box';
import IconButton from "@mui/material/IconButton";
import { CardHeader, Drawer, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ChatIcon from '@mui/icons-material/Chat';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchThreads,
    selectCurrentThread,
    selectThreads,
    fetchThreadMessages,
    sendMessageToThread,
    createThread,
    setCurrentThread
} from "../../store/chatSlice";
import { Thread } from "../../types";
import ThreadsMenu from "./ThreadsMenu";
import MessagesBox from "./MessagesBox";
import { AppDispatch } from "../../store/store";

export default function ChatBox() {
    const dispatch = useDispatch<AppDispatch>();
    const threads = useSelector(selectThreads);
    const currentThread = useSelector(selectCurrentThread);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [isThreadsMenuOpen, setThreadsMenuOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchThreads());
    }, [dispatch]);

    useEffect(() => {
        if (currentThread && currentThread.status === 'idle')
            dispatch(fetchThreadMessages({ threadId: currentThread.id, page: null }));
    }, [currentThread, dispatch]);

    const handleNewThread = () => {
        dispatch(setCurrentThread(null));
    };

    const handleSelectThread = (thread: Thread) => {
        dispatch(setCurrentThread(thread.id));
        if (isSmallScreen) {
            setThreadsMenuOpen(false); // Close drawer on thread selection for small screens
        }
    };

    const handleSendMessage = async (prompt: string) => {
        console.log("Current thread: ", currentThread?.id);
        console.log("Message: ", prompt);
        if (!currentThread) {
            const createdThreadAction = await dispatch(createThread({ threadTitle: prompt }));

            const createdThread = createdThreadAction.payload;
            if (createdThread?.id) {
                await dispatch(sendMessageToThread({ threadId: createdThread.id, message: prompt }));
            }
        } else {
            await dispatch(sendMessageToThread({ threadId: currentThread.id, message: prompt }));
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
                    <>
                        {isSmallScreen && (
                            <IconButton color="primary" size="small" onClick={() => setThreadsMenuOpen(true)}>
                                <MenuIcon />
                            </IconButton>
                        )}
                        <IconButton color="primary" size="small" onClick={handleNewThread}>
                            <ChatIcon />
                        </IconButton>
                    </>
                }
            />
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid size={{ xs: 12, md: 8 }} sx={{ display: "flex", flexDirection: "column" }}>
                    <MessagesBox />
                    <Box sx={{ marginTop: 'auto', padding: 1 }}>
                        <ChatInput handleSendMessage={handleSendMessage} />
                    </Box>
                </Grid>

                {!isSmallScreen && (
                    <Grid size={{ xs: 0, md: 4 }} sx={{ maxHeight: "80%" }}>
                        <ThreadsMenu threads={threads} currentThread={currentThread} handleSelectThread={handleSelectThread} />
                    </Grid>
                )}

                {isSmallScreen && (
                    <Drawer
                        anchor="left"
                        open={isThreadsMenuOpen}
                        onClose={() => setThreadsMenuOpen(false)}
                    >
                        <Box sx={{ width: 250, padding: 2 }}>
                            <ThreadsMenu threads={threads} currentThread={currentThread} handleSelectThread={handleSelectThread} />
                        </Box>
                    </Drawer>
                )}
            </Grid>
        </Card>
    );
}
