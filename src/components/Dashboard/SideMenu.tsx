import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";
import Link from "@mui/material/Link";
import {SitemarkIcon} from "../Auth/CustomIcons";

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
    const user = useSelector(selectUser);
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
                    underline="none"
                    href="/"
                    sx={{
                        textDecoration: 'none', // Removes the underline completely
                        color: 'text.primary',  // Ensures the color matches the text
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <SitemarkIcon size={36} />
                        <Typography
                            component="h2"
                            variant="h4"
                            sx={{
                                fontFamily: `'Courier New', monospace`,
                                fontWeight: 700,
                            }}
                        >
                            CryptoMind
                        </Typography>
                    </Stack>
                </Link>
                {/*<SelectContent />*/}
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
                {user.status === 'loading' ? (
                    <>
                        <Skeleton variant="circular" width={36} height={36} />
                        <Box sx={{ mr: 'auto' }}>
                            <Skeleton variant="text" width={80} height={20} />
                            <Skeleton variant="text" width={120} height={15} />
                        </Box>
                    </>
                ) : (
                    <>
                        <Avatar
                            sizes="small"
                            alt={user?.name || 'User'}
                            src={user?.avatar || '/static/images/avatar/default.jpg'}
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
                    </>
                )}
                <OptionsMenu />
            </Stack>
        </Drawer>
    );
}
