import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/axiosInstance';
import { RootState } from './store';

interface UserState {
    id: number;
    name: string;
    email: string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UserState = {
    id: 0,
    name: '',
    email: '',
    status: 'idle',
};

export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', async () => {
    const response = await apiClient.get('users/me');  // Update with actual endpoint base URL if necessary
    return response.data;
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.id = action.payload.id;
                state.name = action.payload.full_name;
                state.email = action.payload.email;
            })
            .addCase(fetchUserInfo.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
