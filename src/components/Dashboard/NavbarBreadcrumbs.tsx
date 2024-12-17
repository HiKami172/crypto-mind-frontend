import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { useLocation, Link } from 'react-router-dom';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
    margin: theme.spacing(1, 0),
    [`& .${breadcrumbsClasses.separator}`]: {
        color: (theme.cssVariables || theme).palette.action.disabled,
        margin: 1,
    },
    [`& .${breadcrumbsClasses.ol}`]: {
        alignItems: 'center',
    },
}));

const routeNameMap = {
    '/dashboard': 'Dashboard',
    '/analytics': 'Analytics',
    '/settings': 'Settings',
    '/about': 'About',
} as const; // Mark as a readonly object

export default function NavbarBreadcrumbs() {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);

    const breadcrumbs = pathSegments.map((segment, index) => {
        const routeTo = `/${pathSegments.slice(0, index + 1).join('/')}` as keyof typeof routeNameMap; // Explicit type assertion
        const isLast = index === pathSegments.length - 1;
        const name = routeNameMap[routeTo] || segment;

        return isLast ? (
            <Typography
                key={routeTo}
                variant="body1"
                sx={{ color: 'text.primary', fontWeight: 600 }}
            >
                {name}
            </Typography>
        ) : (
            <Link
                key={routeTo}
                to={routeTo}
                style={{
                    textDecoration: 'none',
                    color: 'inherit',
                }}
            >
                <Typography variant="body1">{name}</Typography>
            </Link>
        );
    });

    return (
        <StyledBreadcrumbs
            aria-label="breadcrumb"
            separator={<NavigateNextRoundedIcon fontSize="small" />}
        >
            {breadcrumbs}
        </StyledBreadcrumbs>
    );
}

