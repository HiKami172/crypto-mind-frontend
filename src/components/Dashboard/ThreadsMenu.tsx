import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {useTheme} from "@mui/material/styles";

interface Thread {
    title: string;
    time: string;
}

interface ThreadsMenuProps {
    threads: Thread[];
    onNewThread: () => void;
}

export default function ThreadsMenu({ threads }: ThreadsMenuProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
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
                        <ListItemButton sx={{borderRadius: "10px"}}>
                            <ListItemText
                                primary={thread.title}
                                secondary={thread.time}
                            />
                        </ListItemButton>
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
}
