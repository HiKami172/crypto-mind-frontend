import { Box, Typography } from '@mui/material';

interface ChatMessageProps {
    role: string,
    content: string,
    timestamp: string
}

export default function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
    const isUser = role === 'user';

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: isUser ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
                marginBottom: 1,
            }}
        >
            <Box
                sx={{
                    maxWidth: '80%',
                    padding: 1,
                    borderRadius: 2,
                    display: "block",
                    backgroundColor: isUser ? '#383a3b': '#100f0f',
                    boxShadow: 1,
                    wordWrap: 'break-word',  // Ensure long words break and wrap
                    overflowWrap: 'break-word',  // Ensures long words break if needed
                }}
            >
                <Typography variant="body2">{content}</Typography>
                <Typography variant="caption" color="textSecondary" sx={{ marginTop: 0.5 }}>
                    {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                </Typography>
            </Box>
        </Box>
    );
}
