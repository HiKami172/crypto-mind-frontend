import * as React from 'react';
import { Box, Typography, Stack, Slider, TextField, FormControl, InputLabel, Select, MenuItem, Button, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import {SelectChangeEvent} from "@mui/material/Select";


interface ModelResults {
    strategy: string;
    risk: number;
    profit: number;
}

const TradingModelConfig = () => {
    const [strategy, setStrategy] = useState('');
    const [riskTolerance, setRiskTolerance] = useState(50);
    const [targetProfit, setTargetProfit] = useState(10);
    const [modelResults, setModelResults] = useState<ModelResults | null>(null);
    const [tabIndex, setTabIndex] = useState(0);

    const handleStrategyChange = (event: SelectChangeEvent<string>) => {
        setStrategy(event.target.value as string);
    };

    const handleRiskChange = (event: Event, newValue: number | number[]) => {
        setRiskTolerance(newValue as number);
    };

    const handleProfitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTargetProfit(Number(event.target.value));
    };

    const handleTabChange = (event: React.SyntheticEvent, newTabIndex: number) => {
        setTabIndex(newTabIndex);
    };

    const handleSubmitModel = () => {
        // Simulate fetching model data based on the configuration
        setModelResults({
            profit: Math.random() * targetProfit,
            risk: Math.random() * riskTolerance,
            strategy: strategy,
        });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Trading Model Configuration
            </Typography>

            <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Trading Model Tabs">
                <Tab label="Configure Model" />
                <Tab label="Model Results" />
            </Tabs>

            {tabIndex === 0 && (
                <Box sx={{ mt: 3 }}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="strategy-select-label">Strategy</InputLabel>
                        <Select
                            labelId="strategy-select-label"
                            value={strategy}
                            label="Strategy"
                            onChange={handleStrategyChange}
                        >
                            <MenuItem value="long">Long</MenuItem>
                            <MenuItem value="short">Short</MenuItem>
                            <MenuItem value="scalping">Scalping</MenuItem>
                        </Select>
                    </FormControl>

                    <Typography variant="h6">Risk Tolerance: {riskTolerance}</Typography>
                    <Slider
                        value={riskTolerance}
                        min={0}
                        max={100}
                        onChange={handleRiskChange}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `${value}%`}
                    />

                    <TextField
                        label="Target Profit (%)"
                        type="number"
                        value={targetProfit}
                        onChange={handleProfitChange}
                        fullWidth
                        sx={{ my: 2 }}
                    />

                    <Button variant="contained" onClick={handleSubmitModel}>
                        Submit Model
                    </Button>
                </Box>
            )}

            {tabIndex === 1 && modelResults && (
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h5">Model Results</Typography>
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <Typography>Strategy: {modelResults.strategy}</Typography>
                        <Typography>Risk: {modelResults.risk.toFixed(2)}%</Typography>
                        <Typography>Expected Profit: {modelResults.profit.toFixed(2)}%</Typography>
                    </Stack>
                </Box>
            )}
        </Box>
    );
};

export default TradingModelConfig;