// src/components/BotDetails.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

interface BotDetailsProps {
    bot: any;
}

const BotDetails: React.FC<BotDetailsProps> = ({ bot }) => {
    return (
        <Box>
            <Typography variant="h6">Bot Details</Typography>
            <Typography>Name: {bot.name}</Typography>
            <Typography>Active: {bot.is_active ? 'Yes' : 'No'}</Typography>
            <Typography>Binance Account ID: {bot.binance_account_id}</Typography>
            <Typography>Tickers: {bot.tickers.join(', ')}</Typography>
            <Typography>Base Prompt: {bot.base_prompt}</Typography>
            <Typography>Additional Notes: {bot.additional_notes}</Typography>
            <Typography>Risk Tolerance: {bot.risk_tolerance}</Typography>
            <Typography>Target Profit: {bot.target_profit}</Typography>
        </Box>
    );
};

export default BotDetails;
