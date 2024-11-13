import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

interface ChatState {
    threads: Array<{ id: string; title: string; messages: Array<{ content: string; id: string }> }>;
    currentThreadId: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ChatState = {
    threads: [],
    currentThreadId: null,
    status: 'idle',
};

export const fetchThreads = createAsyncThunk('chat/fetchThreads', async () => {
    const response = await axios.get('/threads/');
    return response.data.threads;
});

export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async ({ threadId, message }: { threadId: string; message: string }) => {
        await axios.post(`/threads/${threadId}/messages/`, { message });
        return { threadId, message };
    }
);

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setCurrentThreadId(state, action) {
            state.currentThreadId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchThreads.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchThreads.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.threads = action.payload;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                const thread = state.threads.find((t) => t.id === action.payload.threadId);
                if (thread) {
                    thread.messages.push({ content: action.payload.message, id: String(Date.now()) });
                }
            });
    },
});

export const { setCurrentThreadId } = chatSlice.actions;
export const selectChat = (state: RootState) => state.chat;
export default chatSlice.reducer;
