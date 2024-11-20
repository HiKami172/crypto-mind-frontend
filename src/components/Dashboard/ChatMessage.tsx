import { Box, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';  // GitHub-flavored markdown

interface ChatMessageProps {
    role: string;
    content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
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
                    backgroundColor: isUser ? '#383a3b' : '#100f0f',
                    boxShadow: 1,
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                }}
            >
                {/* Render Markdown content */}
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content}
                </ReactMarkdown>

                {/* You can add time formatting or other elements here */}
                {/*<Typography variant="caption" color="textSecondary" sx={{ marginTop: 0.5 }}>*/}
                {/*    {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}*/}
                {/*</Typography>*/}
            </Box>
        </Box>
    );
}
