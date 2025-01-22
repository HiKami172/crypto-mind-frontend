import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/axiosInstance';
import { RootState } from './store';

interface UserState {
    id: number;
    name: string;
    avatar: string;
    email: string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UserState = {
    id: 0,
    name: '',
    avatar: '',
    email: '',
    status: 'idle',
};

export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', async () => {
    const response = await apiClient.get('users/me');  // Update with actual endpoint base URL if necessary
    return response.data;
});

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (userData: { name: string; avatar: string }, { getState }) => {
        const state = getState() as RootState;
        const userId = state.user.id;

        const response = await apiClient.put(`users/${userId}`, userData);  // Replace with actual backend endpoint
        return response.data;  // Returning updated user data from the server
    }
);

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
                state.avatar = action.payload.avatar;
            })
            .addCase(fetchUserInfo.rejected, (state) => {
                state.status = 'failed';
            });
        builder
            .addCase(updateUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.name = action.payload.full_name;  // Assuming response contains the updated name
                state.avatar = action.payload.avatar;  // Assuming response contains the updated avatar
            })
            .addCase(updateUser.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
