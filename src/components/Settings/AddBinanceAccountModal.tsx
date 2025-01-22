import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store";
import {addBinanceCredential} from "../../store/binanceSlice";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    IconButton,
    InputAdornment,
    Modal,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

interface AddBinanceAccountModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}


export const AddBinanceAccountModal: React.FC<AddBinanceAccountModalProps> = ({open, setOpen}) => {
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState({
        name: "",
        apiKey: "",
        secretKey: "",
        accountType: "testnet",
    });
    const [visibility, setVisibility] = useState({
        showApiKey: false,
        showSecretKey: false,
    });

    const handleInputChange = (field: keyof typeof formData, value: string) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    const handleAddAccount = () => {
        const {name, apiKey, secretKey, accountType} = formData;
        if (name && apiKey && secretKey && accountType) {
            dispatch(addBinanceCredential({name, api_key: apiKey, secret_key: secretKey, account_type: accountType}));
            setFormData({name: "", apiKey: "", secretKey: "", accountType: "testnet"});
            setOpen(false);
        }
    };

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    maxWidth: 400,
                    width: "100%",
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Add Binance Account
                </Typography>
                <FormControl fullWidth margin="normal">
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <TextField
                        id="name"
                        placeholder="Descriptive name for your credentials"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        fullWidth
                        variant="outlined"
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <FormLabel htmlFor="apiKey">API Key</FormLabel>
                    <TextField
                        id="apiKey"
                        placeholder="Binance API Key"
                        type={visibility.showApiKey ? "text" : "password"}
                        value={formData.apiKey}
                        onChange={(e) => handleInputChange("apiKey", e.target.value)}
                        required
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        sx={{background: "transparent !important", border: "none"}}
                                        onClick={() => setVisibility((v) => ({...v, showApiKey: !v.showApiKey}))}>
                                        {visibility.showApiKey ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <FormLabel htmlFor="secretKey">Secret Key</FormLabel>
                    <TextField
                        id="secretKey"
                        placeholder="Binance Secret Key"
                        type={visibility.showSecretKey ? "text" : "password"}
                        value={formData.secretKey}
                        onChange={(e) => handleInputChange("secretKey", e.target.value)}
                        required
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        sx={{background: "transparent !important", border: "none"}}
                                        onClick={() => setVisibility((v) => ({...v, showSecretKey: !v.showSecretKey}))}>
                                        {visibility.showSecretKey ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <FormLabel>Account Type</FormLabel>
                    <ToggleButtonGroup
                        value={formData.accountType}
                        exclusive
                        onChange={(e, newValue) => e && newValue && handleInputChange("accountType", newValue)}
                        fullWidth
                    >
                        <ToggleButton value="testnet">Testnet</ToggleButton>
                        <ToggleButton value="live">Live</ToggleButton>
                    </ToggleButtonGroup>
                </FormControl>
                <Box sx={{display: "flex", justifyContent: "space-between", mt: 2}}>
                    <Button variant="outlined" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleAddAccount}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};