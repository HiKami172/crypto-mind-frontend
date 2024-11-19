import * as React from 'react';
import Stack from '@mui/material/Stack';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import MenuButton from './MenuButton';
import ColorModeIconDropdown from '../../theme/shared-theme/ColorModeIconDropdown';
import Search from './Search';
import Button from "@mui/material/Button";
import StarIcon from '@mui/icons-material/Star';


export default function Header() {
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
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs />
      <Stack direction="row" sx={{ gap: 1 }}>
        <Search />
        <MenuButton showBadge aria-label="Open notifications">
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
