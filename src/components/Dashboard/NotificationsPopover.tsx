import * as React from 'react';
import { Popover, Stack, Typography, Box, List, ListItem, ListItemText, Divider } from '@mui/material';

interface NotificationsPopoverProps {
    anchorEl: null | HTMLElement;
    open: boolean;
    onClose: () => void;
    notifications: string[];
}

const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({ anchorEl, open, onClose, notifications }) => {
    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <Stack sx={{ width: 300, padding: 2 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                    Notifications
                </Typography>
                <Divider />
                <Box
                    borderRadius={1}
                    boxShadow="rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;"
                >
                    {notifications.length > 0 ? (
                        <List>
                            {notifications.map((notification, index) => (
                                <ListItem key={index} divider sx={{ paddingY: 1 }}>
                                    <ListItemText primary={notification} />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Box
                            sx={{
                                padding: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 1,
                            }}
                        >
                            <Typography variant="body2" color="textSecondary">
                                You have no notifications
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Stack>
        </Popover>
    );
};

export default NotificationsPopover;
