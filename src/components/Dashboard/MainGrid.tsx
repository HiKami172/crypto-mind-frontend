import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { fetchPortfolioData } from '../../api/binance';
import StatCard, {AccountStats} from './StatCard';
import ChartPortfolioAssets from './ChartPortfolioAssets';
import ChatBox from './ChatBox';
import CustomizedDataGrid from './CustomizedDataGrid';
import TradingViewWidget from './TradingViewWidget';
import Copyright from '../../internals/components/Copyright';
import {useTheme} from "@mui/material";
import {columns, rows} from "../../internals/data/gridData";


export default function MainGrid() {
    const [cardData, setCardData] = useState<AccountStats | null>(null);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

    useEffect(() => {
        fetchPortfolioData().then((res) => {
            setCardData(res);
            setLoading(false);
        });
    }, []);

    return (
        <Stack
            gap={3}
            sx={{
                width: '100%',
                maxWidth: { sm: '100%', md: '1700px' },
                pt: 1.5,
                padding: {
                    xs: theme.spacing(0),
                    sm: theme.spacing(1.5),
                    md: theme.spacing(2),
                },
                borderRadius: 1,
            }}
        >

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

            {/*<Card variant="outlined">*/}
                <Typography component="h2" variant="h6">
                    Orders
                </Typography>
                <CustomizedDataGrid columns={columns} rows={rows}/>
            {/*</Card>*/}

            <Copyright sx={{ my: 4 }} />
        </Stack>
    );
}
