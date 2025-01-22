import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";
import {deleteBinanceCredential, fetchBinanceAccounts} from "../../store/binanceSlice";
import {
    Box,
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import {Add as AddIcon, Delete as DeleteIcon} from "@mui/icons-material";
import {AddBinanceAccountModal} from "./AddBinanceAccountModal";



const BinanceAccounts: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const binanceAccounts = useSelector((state: RootState) => state.binance.accounts);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchBinanceAccounts());
    }, [dispatch]);

    const handleDeleteAccount = (id: string) => {
        dispatch(deleteBinanceCredential(id));
    };

    const partiallyHideKey = (key: string) => `${key.slice(0, 4)}****${key.slice(-4)}`;

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Binance Accounts
            </Typography>
            <Button
                variant="contained"
                color="primary"
                endIcon={<AddIcon />}
                onClick={() => setOpen(true)}
                sx={{ mt: 2, mb: 2 }}
            >
                Add Account
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>API Key</TableCell>
                            <TableCell>Secret Key</TableCell>
                            <TableCell>Account Type</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {binanceAccounts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No Binance accounts available. Add one to get started.
                                </TableCell>
                            </TableRow>
                        ) : (
                            binanceAccounts.map((account) => (
                                <TableRow key={account.id}>
                                    <TableCell>{account.name}</TableCell>
                                    <TableCell>{partiallyHideKey(account.api_key)}</TableCell>
                                    <TableCell>********</TableCell>
                                    <TableCell>{account.account_type}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleDeleteAccount(account.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <AddBinanceAccountModal open={open} setOpen={setOpen} />
        </Box>
    );
};

export default BinanceAccounts;
