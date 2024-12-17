import * as React from 'react';
import Stack from '@mui/material/Stack';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import MenuButton from './MenuButton';
import ColorModeIconDropdown from '../../theme/shared-theme/ColorModeIconDropdown';
import Search from './Search';
import Button from "@mui/material/Button";
import StarIcon from '@mui/icons-material/Star';
import { useTheme } from '@mui/material/styles';

export default function Header() {
    const theme = useTheme();

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
                {/*showBadge if there are notifications*/}
                <MenuButton aria-label="Open notifications">
                    <NotificationsRoundedIcon />
                </MenuButton>
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
