import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import API from "../api/axiosInstance";

const ACCOUNTS_ROUTER_URL = "/binance/accounts";

interface BinanceAccount {
    id: string;
    name: string;
    api_key: string;
    secret_key: string;
    account_type: string;
}

interface BinanceState {
    accounts: BinanceAccount[];
    loading: boolean;
    error: string | null;
}

const initialState: BinanceState = {
    accounts: [],
    loading: false,
    error: null,
};

export const fetchBinanceAccounts = createAsyncThunk(
    "binance/fetchAccounts",
    async () => {
        const response = await API.get(`${ACCOUNTS_ROUTER_URL}`);
        return response.data;
    }
);

export const addBinanceCredential = createAsyncThunk(
    "binance/addAccount",
    async (accountData: Omit<BinanceAccount, "id">) => {
        const response = await API.post(`${ACCOUNTS_ROUTER_URL}`, accountData);
        return response.data;
    }
);

export const deleteBinanceCredential = createAsyncThunk(
    "binance/deleteAccount",
    async (accountId: string) => {
        await API.delete(`${ACCOUNTS_ROUTER_URL}/${accountId}`);
        return accountId;
    }
);

const binanceSlice = createSlice({
    name: "binance",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBinanceAccounts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchBinanceAccounts.fulfilled, (state, action: PayloadAction<BinanceAccount[]>) => {
            state.loading = false;
            state.accounts = action.payload;
        });
        builder.addCase(fetchBinanceAccounts.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Add Account
        builder.addCase(addBinanceCredential.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addBinanceCredential.fulfilled, (state, action: PayloadAction<BinanceAccount>) => {
            state.loading = false;
            state.accounts.push(action.payload);
        });
        builder.addCase(addBinanceCredential.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Delete Account
        builder.addCase(deleteBinanceCredential.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteBinanceCredential.fulfilled, (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.accounts = state.accounts.filter(account => account.id !== action.payload);
        });
        builder.addCase(deleteBinanceCredential.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default binanceSlice.reducer;
