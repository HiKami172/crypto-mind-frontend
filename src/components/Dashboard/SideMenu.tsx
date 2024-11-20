import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SelectContent from './SelectContent';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo, selectUser } from "../../store/userSlice";
import { useEffect } from "react";
import Link from "@mui/material/Link";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
    width: drawerWidth,
    flexShrink: 0,
    boxSizing: 'border-box',
    mt: 10,
    [`& .${drawerClasses.paper}`]: {
        width: drawerWidth,
        boxSizing: 'border-box',
        overflowX: 'hidden',  // Prevent horizontal overflow
    },
});

export default function SideMenu() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchUserInfo());
    }, [dispatch]);

    return (
        <Drawer
            variant="permanent"
            sx={{
                display: { xs: 'none', md: 'block' },
                [`& .${drawerClasses.paper}`]: {
                    backgroundColor: 'background.paper',
                    overflowX: 'hidden', // Prevent horizontal scroll
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 'calc(var(--template-frame-height, 0px) + 4px)',
                    p: 1.5,
                }}
            >
                <Link
                    href="/dashboard"
                    variant="body2"
                    sx={{ alignSelf: 'center', margin: "12px" }}
                >
                    <Typography
                        component="h2"
                        variant="h4"
                        style={{
                            fontFamily: `'Courier New', monospace`,
                            fontWeight: 700
                        }}
                    >
                        CryptoMind
                    </Typography>
                </Link>
                <SelectContent />
            </Box>
            <Divider />
            <MenuContent />
            <Stack
                direction="row"
                sx={{
                    p: 2,
                    gap: 1,
                    alignItems: 'center',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Avatar
                    sizes="small"
                    alt={user?.name || 'User'}
                    src='/static/images/avatar/default.jpg'
                    sx={{ width: 36, height: 36 }}
                />
                <Box sx={{ mr: 'auto' }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
                        {user?.name || 'Guest'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {user?.email || 'guest@example.com'}
                    </Typography>
                </Box>
                <OptionsMenu />
            </Stack>
        </Drawer>
    );
}
