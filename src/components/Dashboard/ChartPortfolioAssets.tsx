import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import {styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Skeleton from '@mui/material/Skeleton';
import { CardHeader } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchAccountData } from "../../api/binance";

interface AssetData {
  label: string;
  value: number;
  price: number;
  logoURL: string | null;
}

interface StyledTextProps {
  variant: 'primary' | 'secondary';
}

const StyledText = styled('text', {
  shouldForwardProp: (prop) => prop !== 'variant',
})<StyledTextProps>(({ theme }) => ({
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fill: (theme.cssVariables || theme).palette.text.secondary,
  variants: [
    {
      props: {
        variant: 'primary',
      },
      style: {
        fontSize: theme.typography.h5.fontSize,
      },
    },
    {
      props: ({ variant }) => variant !== 'primary',
      style: {
        fontSize: theme.typography.body2.fontSize,
      },
    },
    {
      props: {
        variant: 'primary',
      },
      style: {
        fontWeight: theme.typography.h5.fontWeight,
      },
    },
    {
      props: ({ variant }) => variant !== 'primary',
      style: {
        fontWeight: theme.typography.body2.fontWeight,
      },
    },
  ],
}));

interface PieCenterLabelProps {
  primaryText: string;
  secondaryText: string;
}

function PieCenterLabel({ primaryText, secondaryText }: PieCenterLabelProps) {
  const { width, height, left, top } = useDrawingArea();
  const primaryY = top + height / 2 - 10;
  const secondaryY = primaryY + 24;

  return (
      <React.Fragment>
        <StyledText variant="primary" x={left + width / 2} y={primaryY}>
          {primaryText}
        </StyledText>
        <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
          {secondaryText}
        </StyledText>
      </React.Fragment>
  );
}

const colors = [
  'hsl(229,100%,70%)',
  'hsl(229,100%, 64%)',
  'hsl(229,100%, 52%)',
  'hsl(229,100%, 40%)',
  'hsl(229,100%, 30%)',
  'hsl(229,100%, 20%)',
];


export default function ChartPortfolioAssets() {
  const [assets, setAssets] = useState<AssetData[]>([]);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true); // Start loading
    fetchAccountData().then((data) => {
      const balances = data.balances;
      const assetData: AssetData[] = Object.keys(balances).map((key) => {
        const balance = balances[key];
        const value = balance.price ? parseFloat(balance.free) * parseFloat(balance.price) : 0;
        const logoURL = balance.logo_url;
        return { label: key, value, price: parseFloat(balance.price), logoURL: logoURL};
      });
      const sortedAssets = assetData.sort((a, b) => b.value - a.value);

      const topAssets = sortedAssets.slice(0, 5);
      const othersValue = sortedAssets.slice(5).reduce((acc, asset) => acc + asset.value, 0);
      console.log(othersValue);

      if (othersValue > 0) {
        topAssets.push({
          label: 'Other',
          value: othersValue,
          price: 0,
          logoURL: null
        });
      }

      const total = topAssets.reduce((acc, asset) => acc + asset.value, 0);
      setAssets(topAssets);
      setTotalValue(total);
      setLoading(false);
    });
  }, []);

  const chartData = assets.map((asset) => ({
    label: asset.label,
    value: asset.value,
  }));

  return (
      <Card
          variant="outlined"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            flexGrow: 1,
          }}
      >
        <CardHeader title={'Portfolio'} />
        <CardContent>
          <Box
              sx={{
                display: 'flex',
                flexDirection: {
                  xs: 'column', // Stack assets below the chart on extra-small screens
                  md: 'row',    // Keep assets next to the chart on medium and larger screens
                },
                gap: 2,
              }}
          >
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {loading ? (
                    <Skeleton variant="circular" width={260} height={260} />
                ) : (
                    <PieChart
                        colors={colors}
                        margin={{
                          left: 80,
                          right: 80,
                          top: 80,
                          bottom: 80,
                        }}
                        series={[
                          {
                            data: chartData,
                            innerRadius: 75,
                            outerRadius: 100,
                            paddingAngle: 0,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                          },
                        ]}
                        height={260}
                        width={260}
                        slotProps={{
                          legend: { hidden: true },
                        }}
                    >
                      <PieCenterLabel
                          primaryText={`$${totalValue.toFixed(2)}`}
                          secondaryText="Total"
                      />
                    </PieChart>
                )}
              </Box>

              <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    justifyContent: 'center',
                    flexGrow: 1
                  }}
              >
                {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <Stack
                            key={index}
                            direction="row"
                            sx={{ alignItems: 'center', gap: 2 }}
                        >
                          <Skeleton variant="circular" width={30} height={30} />
                          <Stack sx={{ gap: 1, flexGrow: 1 }}>
                            <Skeleton variant="text" width="30%" height={14}/>
                            <Skeleton variant="rounded" width="100%" height={15} />
                          </Stack>
                        </Stack>
                    ))
                ) : (
                    assets.map((asset, index) => (
                        <Stack
                            key={index}
                            direction="row"
                            sx={{ alignItems: 'center', gap: 2 }}
                        >
                          {asset.logoURL ? (
                              <img
                                  src={asset.logoURL || ""}
                                  alt={`${asset.label} Logo`}
                                  width="30"
                                  height="30"
                                  style={{borderRadius: '50%', objectFit: 'cover'}}
                              />) : (
                              <img
                                  src={"https://www.reshot.com/preview-assets/icons/KM95CT8YVN/globe-KM95CT8YVN.svg"}
                                  alt={`${asset.label} Logo`}
                                  width="30"
                                  height="30"
                                  style={{borderRadius: '50%', objectFit: 'cover'}}
                              />)
                          }
                          <Stack sx={{gap: 1, flexGrow: 1}}>
                            <Stack
                                direction="row"
                                sx={{
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  gap: 2,
                                }}
                            >
                              <Typography variant="body2" sx={{ fontWeight: '500' }}>
                                {asset.label}
                              </Typography>
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {((asset.value / totalValue) * 100).toFixed(2)}%
                              </Typography>
                            </Stack>
                            <LinearProgress
                                key={asset.label}
                                variant="determinate"
                                aria-label={`${asset.label} Progress`}
                                value={(asset.value / totalValue) * 100}
                                sx={{
                                  width: "100%",
                                  [`& .${linearProgressClasses.bar}`]: {
                                    backgroundColor: colors[index] || 'gray',
                                  },
                                }}
                            />
                          </Stack>
                        </Stack>
                    ))
                )}
              </Box>
            </Box>
        </CardContent>
      </Card>
  );
}
