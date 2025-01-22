import * as React from 'react';
import Stack from '@mui/material/Stack';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import MenuButton from './MenuButton';
import ColorModeIconDropdown from '../../theme/shared-theme/ColorModeIconDropdown';
import Search from './Search';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import { useTheme } from '@mui/material/styles';
import NotificationsPopover from './NotificationsPopover';  // Import the new component

export default function Header() {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [notifications] = React.useState<string[]>([]);

    const handleNotificationClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <Stack
            direction="row"
            sx={{
                display: { xs: 'none', md: 'flex' },
                width: '100%',
                alignItems: { xs: 'flex-start', md: 'center' },
                justifyContent: 'space-between',
                maxWidth: { sm: '100%', md: '1700px' },
                pt: 1.5,
                backgroundColor: theme.palette.background.default, // Theme-derived background
                padding: theme.spacing(2), // Optional spacing for padding
                borderRadius: 1, // Optional rounded corners
            }}
            spacing={2}
        >
            <NavbarBreadcrumbs />
            <Stack direction="row" sx={{ gap: 1 }}>
                <Search />
                <MenuButton aria-label="Open notifications" onClick={handleNotificationClick}>
                    <NotificationsRoundedIcon />
                </MenuButton>

                <NotificationsPopover
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    notifications={notifications}
                />

                <ColorModeIconDropdown />
                <Button
                    sx={{ borderRadius: 10 }}
                    variant="contained"
                    color="secondary"
                    startIcon={<StarIcon />}
                >
                    Premium
                </Button>
            </Stack>
        </Stack>
    );
}
