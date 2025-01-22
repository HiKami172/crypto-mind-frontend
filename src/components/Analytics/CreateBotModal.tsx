import React, { useState } from 'react';
import {
    Button,
    Modal,
    Box,
    TextField,
    Typography,
    Slider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    OutlinedInput,
    Collapse,
    FormLabel,
} from '@mui/material';

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    maxHeight: '80vh', // Set the max height to 80% of the viewport height
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    overflowY: 'auto', // Allow vertical scrolling when content overflows
};


const tickersList = ['BTC/USDT', 'ETH/USDT', 'ADA/USDT', 'XRP/USDT']; // Example trading pairs

interface CreateBotModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

export const CreateBotModal: React.FC<CreateBotModalProps> = ({ open, setOpen }) => {
    const [formValues, setFormValues] = useState({
        name: '',
        description: '',
        additional_notes: '',
        base_prompt: '',
        risk_tolerance: 50,
        target_profit: 10,
        tickers: [] as string[],
    });
    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleClose = () => setOpen(false);

    const handleChange = (field: string, value: any) => {
        setFormValues((prevValues) => ({ ...prevValues, [field]: value }));
    };

    const handleSubmit = () => {
        console.log('Bot Data:', formValues);
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6" gutterBottom>
                    Create New Bot
                </Typography>

                <FormControl fullWidth margin="normal">
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <TextField
                        id="name"
                        placeholder="John the Ripper"
                        value={formValues.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                        variant="outlined"
                        margin="normal"
                    />
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <TextField
                        id="description"
                        placeholder="Short description of the configuration."
                        value={formValues.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        required
                        variant="outlined"
                        margin="normal"
                    />
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <FormLabel htmlFor="risk-tolerance">Risk Tolerance (%)</FormLabel>
                    <Box sx={{ display: 'flex', alignItems: 'center', mx: '1em' }}>
                        <Slider
                            value={formValues.risk_tolerance}
                            onChange={(e, value) => handleChange('risk_tolerance', value)}
                            min={0}
                            max={100}
                            valueLabelDisplay="auto"
                            sx={{ width: '70%', mr: 2 }}
                        />
                        <TextField
                            type="number"
                            value={formValues.risk_tolerance}
                            onChange={(e) => handleChange('risk_tolerance', Number(e.target.value))}
                            margin="normal"
                        />
                    </Box>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <FormLabel htmlFor="target-profit">Target Profit (%)</FormLabel>
                    <Box sx={{ display: 'flex', alignItems: 'center', mx: '1em' }}>
                        <Slider
                            value={formValues.target_profit}
                            onChange={(e, value) => handleChange('target_profit', value)}
                            min={0}
                            max={100}
                            valueLabelDisplay="auto"
                            sx={{ width: '70%', mr: 2 }}
                        />
                        <TextField
                            type="number"
                            value={formValues.target_profit}
                            onChange={(e) => handleChange('target_profit', Number(e.target.value))}
                            margin="normal"
                        />
                    </Box>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <FormLabel htmlFor="addition-notes">Additional Notes</FormLabel>
                    <TextField
                        value={formValues.additional_notes}
                        multiline
                        maxRows={4}
                        onChange={(e) => handleChange('additional_notes', e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                </FormControl>
                <Button variant="text" onClick={() => setShowAdvanced(!showAdvanced)}>
                    {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
                </Button>
                <Collapse in={showAdvanced}>
                    <TextField
                        label="Base Prompt"
                        value={formValues.base_prompt}
                        onChange={(e) => handleChange('base_prompt', e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                </Collapse>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Tickers</InputLabel>
                    <Select
                        multiple
                        value={formValues.tickers}
                        onChange={(e) => handleChange('tickers', e.target.value as string[])}
                        input={<OutlinedInput label="Tickers" />}
                        renderValue={(selected) => (selected as string[]).join(', ')}
                    >
                        {tickersList.map((ticker) => (
                            <MenuItem key={ticker} value={ticker}>
                                <Checkbox checked={formValues.tickers.includes(ticker)} />
                                <ListItemText primary={ticker} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    sx={{ display: 'block', mt: 2 }}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Create Bot
                </Button>
            </Box>
        </Modal>
    );
};

export default CreateBotModal;
