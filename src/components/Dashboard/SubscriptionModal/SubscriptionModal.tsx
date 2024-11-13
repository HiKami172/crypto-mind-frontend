import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, ToggleButton, ToggleButtonGroup, Box } from '@mui/material';

interface SubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cardholderName, setCardholderName] = useState('');
    const [cvc, setCvc] = useState('');
    const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
    const [error, setError] = useState<string>('');

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => setCardNumber(e.target.value);
    const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setExpiryDate(e.target.value);
    const handleCardholderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setCardholderName(e.target.value);
    const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => setCvc(e.target.value);

    const handlePlanSelect = (_: React.MouseEvent<HTMLElement>, newPlan: 'monthly' | 'yearly') => {
        if (newPlan) setSelectedPlan(newPlan);
    };

    const validateForm = (): string => {
        if (cardNumber.length !== 16) return 'Invalid card number';
        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) return 'Invalid expiry date';
        if (cvc.length !== 3) return 'Invalid CVC';
        if (cardholderName.trim() === '') return "Cardholder's name required";
        return '';
    };

    const handleSubmit = () => {
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
        } else {
            setError('');
            // Perform the subscription action here (e.g., API call)
            console.log('Subscription successful');
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>Billing Details</DialogTitle>
            <DialogContent>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">Card Number & CVV/CVC</Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <TextField
                            type="text"
                            placeholder="**** **** **** ****"
                            variant="outlined"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            inputProps={{ maxLength: 16 }}
                            fullWidth
                        />
                        <TextField
                            type="password"
                            placeholder="CVC"
                            variant="outlined"
                            value={cvc}
                            onChange={handleCvcChange}
                            inputProps={{ maxLength: 3 }}
                            sx={{ width: 80 }}
                        />
                    </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">Expiry Date</Typography>
                    <TextField
                        type="text"
                        placeholder="MM/YY"
                        variant="outlined"
                        value={expiryDate}
                        onChange={handleExpiryDateChange}
                        inputProps={{ maxLength: 5 }}
                        fullWidth
                    />
                </Box>

                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">Cardholder's Name</Typography>
                    <TextField
                        type="text"
                        placeholder="Type here"
                        variant="outlined"
                        value={cardholderName}
                        onChange={handleCardholderNameChange}
                        fullWidth
                    />
                </Box>

                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" textAlign="center">Select Plan</Typography>
                    <ToggleButtonGroup
                        value={selectedPlan}
                        exclusive
                        onChange={handlePlanSelect}
                        fullWidth
                        sx={{ justifyContent: 'center' }}
                    >
                        <ToggleButton value="monthly" aria-label="monthly">
                            Monthly $50
                        </ToggleButton>
                        <ToggleButton value="yearly" aria-label="yearly">
                            Yearly $500
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                {error && <Typography color="error" variant="body2">{error}</Typography>}
            </DialogContent>

            <DialogActions>
                <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                    Buy
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SubscriptionModal;
