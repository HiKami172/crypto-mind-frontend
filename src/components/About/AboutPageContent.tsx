import React from 'react';
import { Container, Typography, Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';

const AboutPageContent: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ paddingTop: '20px' }}>
            <Typography variant="h3" align="center" gutterBottom>
                About Us
            </Typography>
            <Typography variant="h6" align="center" paragraph>
                CryptoMind is an innovative platform designed to help you trade cryptocurrency assets more effectively by
                harnessing the power of Artificial Intelligence. With integrated trading tools and an AI-powered assistant,
                CryptoMind offers personalized insights and strategies to improve your trading decisions.
            </Typography>

            <Grid
                container
                spacing={4}
                justifyContent="center"  // This centers the grid items horizontally
                alignItems="stretch"      // Ensures vertical centering for small screens
            >
                {/* Card 1: AI-Powered Trading Assistant */}
                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                    <Card elevation={3} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                AI-Powered Trading Assistant
                            </Typography>
                            <Typography variant="body2" color="textSecondary" paragraph>
                                Our integrated AI assistant provides real-time advice and personalized insights, helping you make smarter
                                decisions in the fast-paced world of cryptocurrency trading.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Card 2: Binance Account Insights */}
                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                    <Card elevation={3} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                Binance Account Insights
                            </Typography>
                            <Typography variant="body2" color="textSecondary" paragraph>
                                Link your Binance account to view detailed trading statistics, insights, and performance analysis
                                to optimize your crypto trading strategies.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Card 3: AI Bot Creation & Testing */}
                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                    <Card elevation={3} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                AI Bot Creation & Testing
                            </Typography>
                            <Typography variant="body2" color="textSecondary" paragraph>
                                Create, test, and refine AI trading bots with CryptoMind. Automate your trading strategies and optimize
                                your portfolio with advanced AI-powered bots.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AboutPageContent;
