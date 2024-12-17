import Box from "@mui/material/Box";
import ChatMessage from "./ChatMessage";
import Grid from "@mui/material/Grid2";
import { TypeAnimation } from "react-type-animation";
import {CircularProgress, Divider, LinearProgress} from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useEffect, useRef } from "react";
import { selectCurrentThread, fetchThreadMessages } from "../../store/chatSlice";


const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();

    const isSameDay = today.toDateString() === date.toDateString();
    if (isSameDay) {
        return 'Today';
    }

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (yesterday.toDateString() === date.toDateString()) {
        return 'Yesterday';
    }

    const currentYear = today.getFullYear();
    const messageYear = date.getFullYear();

    const formattedDate = date.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
    });

    if (messageYear === currentYear) {
        return formattedDate;
    }

    return `${formattedDate}, ${messageYear}`;
};

const groupMessagesByDate = (messages: any[]) => {
    const groupedMessages: Record<string, any[]> = {};

    messages.forEach((message) => {
        const dateLabel = formatTimestamp(message.created_at);
        if (!groupedMessages[dateLabel]) {
            groupedMessages[dateLabel] = [];
        }
        groupedMessages[dateLabel].push(message);
    });

    return groupedMessages;
};

export default function MessagesBox() {
    const dispatch = useDispatch<AppDispatch>();
    const boxRef = useRef<HTMLDivElement>(null);
    const currentThread = useSelector(selectCurrentThread);

    useEffect(() => {
        if (boxRef.current) {
            boxRef.current.scrollTop = boxRef.current.scrollHeight;
        }
    }, [currentThread]);

    const handleScroll = () => {
        if (currentThread === null) return;

        if (boxRef.current) {
            const { scrollTop } = boxRef.current;
            if (scrollTop === 0 && currentThread?.messages.next_page) {
                dispatch(fetchThreadMessages({
                    threadId: currentThread.id,
                    page: currentThread.messages.next_page
                }));
            }
        }
    };


    return (
        <Box
            sx={{
                flexGrow: 1,
                overflowY: "auto",
                padding: 2,
                border: "1px solid hsl(220deg 20% 25% / 60%)",
                borderRadius: "8px",
                display: currentThread ? "block" : "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "400px",
            }}
            onScroll={handleScroll}
            ref={boxRef}
        >
            {currentThread?.status === "loading" && (
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                    <CircularProgress />
                </Box>
            )}
            {currentThread && currentThread.messages ? (
                Object.entries(groupMessagesByDate(currentThread.messages.items)).map(([date, messages]) => (
                    <React.Fragment key={date}>
                        <Divider sx={{ marginBottom: 1, marginTop: 2 }}>{date}</Divider>
                        {messages.map((message, index) => (
                            <ChatMessage
                                key={index}
                                role={message.role}
                                content={message.content}
                                timestamp={message.created_at}
                            />
                        ))}
                    </React.Fragment>
                ))
            ) : (
                <Grid container spacing={10}>
                    <TypeAnimation
                        sequence={["What would you like to ask?"]}
                        wrapper="span"
                        speed={50}
                        style={{
                            display: "block",
                            fontSize: "clamp(1rem, 5vw, 1.15rem)",
                            fontFamily: `'Courier New', monospace`,
                            fontWeight: 700,
                            letterSpacing: "2px",
                        }}
                    />
                </Grid>
            )}
            {currentThread?.status === "generating" && (
                <Box
                    sx={{
                        marginTop: "auto", // Pushes the loader to the bottom
                        paddingTop: 2,    // Adds spacing between the loader and the last message
                    }}
                >
                    <LinearProgress sx={{ width: "100%" }} />
                </Box>
            )}
        </Box>
    );
}
