import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton'; // Import Skeleton
import Copyright from '../../internals/components/Copyright';
import ChartPortfolioAssets from './ChartPorfolioAssets';
import CustomizedDataGrid from './CustomizedDataGrid';
import ChatBox from './ChatBox';
import StatCard, { StatCardProps } from './StatCard';
import TradingViewWidget from "./TradingViewWidget";
import Card from "@mui/material/Card";

const data: StatCardProps[] = [
    {
        title: 'Income',
        value: '14k',
        interval: 'Last 30 days',
        trend: 'up',
        data: [
            200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
            360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
        ],
    },
    {
        title: 'Loss',
        value: '325',
        interval: 'Last 30 days',
        trend: 'down',
        data: [
            1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820,
            780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300, 220,
        ],
    },
];

export default function MainGrid() {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate loading delay
        return () => clearTimeout(timer);
    }, []);

    return (
        <Stack gap={5} sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Card variant="outlined" sx={{ height: "89vh" }}>
                <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                    Overview
                </Typography>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 3, lg: 5 }}>
                        <Stack gap={2} direction="column">
                            {isLoading
                                ? Array(2)
                                    .fill(null)
                                    .map((_, index) => (
                                        <Skeleton key={index} variant="rounded" height={120} />
                                    ))
                                : data.map((card, index) => <StatCard key={index} {...card} />)}

                            {isLoading ? (
                                <Skeleton variant="rounded" height={200} />
                            ) : (
                                <ChartPortfolioAssets />
                            )}
                        </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 9, lg: 7 }}>
                        <Box sx={{ height: "100%" }}>
                            {isLoading ? (
                                <Skeleton variant="rounded" height="100%" />
                            ) : (
                                <ChatBox />
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Card>

            <Box sx={{ height: "60vh", width: "100%", margin: "20px, 20px" }}>
                {isLoading ? (
                    <Skeleton variant="rounded" height="100%" />
                ) : (
                    <TradingViewWidget />
                )}
            </Box>

            <Card variant="outlined">
                <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                    Orders
                </Typography>
                {isLoading ? (
                    <Skeleton variant="rounded" height={400} />
                ) : (
                    <CustomizedDataGrid />
                )}
            </Card>

            <Copyright sx={{ my: 4 }} />
        </Stack>
    );
}
