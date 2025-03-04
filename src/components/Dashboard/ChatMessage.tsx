import {Box, Typography, useTheme} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Choose your preferred theme
import { forwardRef } from "react";

interface ChatMessageProps {
    role: string;
    content: string;
    timestamp: string
}

const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>((props, ref) => {
    const isUser = props.role === 'user';
    const theme = useTheme();

    const renderers = {
        code({ inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <SyntaxHighlighter
                    style={materialDark} // Use your chosen theme
                    language={match[1]}
                    PreTag="div"
                    {...props}
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            ) : (
                <Box
                    component="code"
                    sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        borderRadius: 1,
                        padding: '2px 4px',
                        fontSize: '0.875rem',
                    }}
                >
                    {children}
                </Box>
            );
        },
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: isUser ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
                marginBottom: 1,
            }}
            ref={ref}
        >
            <Box
                sx={{
                    maxWidth: '90%',
                    padding: 1,
                    borderRadius: 2,
                    display: 'block',
                    backgroundColor: isUser
                        ? theme.palette.primary.main
                        : theme.palette.primary["100"],
                    color: isUser ? theme.palette.primary.contrastText : 'text',
                    boxShadow: 1,
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                }}
            >
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={renderers}
                >
                    {props.content}
                </ReactMarkdown>

                <Typography
                    variant="caption"
                    sx={{
                        color: isUser ? theme.palette.primary.contrastText : 'textSecondary',
                        marginTop: 0.5
                }}>
                    {new Date(props.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                </Typography>
            </Box>
        </Box>
    );
});

export default ChatMessage;
