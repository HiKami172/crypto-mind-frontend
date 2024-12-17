import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { useEffect, useState } from 'react';
import { fetchPortfolioData } from '../../api/binance';
import StatCard, {AccountStats} from './StatCard';
import ChartPortfolioAssets from './ChartPortfolioAssets';
import ChatBox from './ChatBox';
import CustomizedDataGrid from './CustomizedDataGrid';
import TradingViewWidget from './TradingViewWidget';
import Copyright from '../../internals/components/Copyright';


export default function MainGrid() {
    const [cardData, setCardData] = useState<AccountStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPortfolioData().then((res) => {
            setCardData(res);
            setLoading(false);
        });
    }, []);

    return (
        <Stack gap={3} sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Typography component="h4" variant="h6">
                Overview
            </Typography>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 3, lg: 5 }}>
                        <Stack gap={2} direction="column">
                            <StatCard title="Account" stats={cardData} loading={loading} />
                            <ChartPortfolioAssets />
                        </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 9, lg: 7 }}>
                        <Box sx={{ height: '100%' }}>
                            <ChatBox />
                        </Box>
                    </Grid>
                </Grid>

            <Box sx={{ height: '60vh', width: '100%', margin: '20px, 20px' }}>
                <TradingViewWidget />
            </Box>

            <Card variant="outlined">
                <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                    Orders
                </Typography>
                <CustomizedDataGrid />
            </Card>

            <Copyright sx={{ my: 4 }} />
        </Stack>
    );
}
