import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { areaElementClasses } from '@mui/x-charts/LineChart';
import { CardHeader, Skeleton } from '@mui/material';

export type AccountStats = {
    value: string;
    interval: string;
    trend: 'up' | 'down' | 'neutral';
    change: number;
    data: number[];
}

export type StatCardProps = {
    title: string;
    stats: AccountStats | null;
    loading: boolean;
};

function getLastNDays(n: number) {
    const dates = [];
    const today = new Date();

    for (let i = n - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);  // Set the date to n days ago
        const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        dates.push(formattedDate);
    }

    return dates;
}

function AreaGradient({ color, id }: { color: string; id: string }) {
    return (
        <defs>
            <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
        </defs>
    );
}

export default function StatCard({
                                     title,
                                    stats,
                                     loading,
                                 }: StatCardProps) {
    const theme = useTheme();

    const daysInLast30Days = getLastNDays(30);

    const changeFormatted = stats ? stats.change.toFixed(2) : 0;

    const trendColors = {
        up:
            theme.palette.mode === 'light'
                ? theme.palette.success.main
                : theme.palette.success.dark,
        down:
            theme.palette.mode === 'light'
                ? theme.palette.error.main
                : theme.palette.error.dark,
        neutral:
            theme.palette.mode === 'light'
                ? theme.palette.grey[400]
                : theme.palette.grey[700],
    };

    const labelColors = {
        up: 'success' as const,
        down: 'error' as const,
        neutral: 'default' as const,
    };
    const color = stats ? labelColors[stats.trend] : 'default';
    const chartColor = stats ? trendColors[stats.trend] : 'default';

    return (
        <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
            <CardHeader title={title} />
            <CardContent>
                <Stack
                    direction="column"
                    sx={{ justifyContent: 'space-between', flexGrow: '1', gap: 1 }}
                >
                    <Stack sx={{ justifyContent: 'space-between' }}>
                        <Stack
                            direction="row"
                            sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            {/* If loading, show Skeleton */}
                            {stats ? (
                                <Typography variant="h4" component="p">
                                    {stats.value}
                                </Typography>
                            ) : (
                                <Skeleton variant="text" width="60%" height={30} />
                            )}

                            {/* If loading, show Skeleton for the chip */}
                            {stats ? (
                                <Chip size="small" color={color} label={`${changeFormatted}%`} />
                            ) : (
                                <Skeleton variant="rounded" width={60} height={20} />
                            )}
                        </Stack>

                        {/* If loading, show Skeleton for the interval */}
                        {stats ? (
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                {stats.interval}
                            </Typography>
                        ) : (
                            <Skeleton variant="text" width="30%" height={20} />
                        )}
                    </Stack>

                    <Box sx={{ width: '100%', height: 50 }}>
                        {stats ? (
                            <SparkLineChart
                                colors={[chartColor]}
                                data={stats.data}
                                area
                                showHighlight
                                showTooltip
                                xAxis={{
                                    scaleType: 'band',
                                    data: daysInLast30Days,
                                }}
                                sx={{
                                    [`& .${areaElementClasses.root}`]: {
                                        fill: `url(#area-gradient-${stats.value})`,
                                    },
                                }}
                            >
                                <AreaGradient color={chartColor} id={`area-gradient-${stats.value}`} />
                            </SparkLineChart>
                        ) : (
                            <Skeleton variant="rectangular" width="100%" height={50} />
                        )}
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}
