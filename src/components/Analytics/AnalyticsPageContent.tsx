import * as React from 'react';
import {Typography, Box} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {useState} from "react";
import CreateBotModal from "./CreateBotModal";
import TestDataGrid from "./TestDataGrid";
import BotDetails from "./BotDetails";


const AnalyticsPageContent = () => {
    const [open, setOpen] = useState(false);
    const [show] = React.useState(false);

    const bot = {
        name: 'SuperBot',
        is_active: true,
        binance_account_id: '123456',
        tickers: ['BTC/USD', 'ETH/USD'],
        base_prompt: 'Trade based on market trends.',
        additional_notes: 'Monitor volatility closely.',
        risk_tolerance: 'Medium',
        target_profit: '5%',
    };

    return (

        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Trading Bots
            </Typography>
            <Button
                sx={{my:2}}
                variant="contained"
                endIcon={<AddIcon/>}
                onClick={() => setOpen(true)}
            >
                Create Bot
            </Button>
            <TestDataGrid />

            <CreateBotModal open={open} setOpen={setOpen}/>
            {show ? <BotDetails bot={bot}/> : null}
        </Box>
    );
};

export default AnalyticsPageContent;