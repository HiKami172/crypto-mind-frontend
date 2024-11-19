import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/axiosInstance'; // Import axios instance or API client to make requests
import { RootState } from './store';

// Define the types for the state
interface Message {
    role: string;
    content: string;
    timestamp: string;
}

interface Thread {
    id: number;
    title: string;
    createdAt: string;
    messages: Array<Message>;
}

interface ChatState {
    threads: Thread[];
    currentThread: Thread | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ChatState = {
    threads: [],
    currentThread: null,
    status: 'idle',
};

// Async thunk to fetch threads from the backend
export const fetchThreads = createAsyncThunk('chat/fetchThreads', async () => {
    const response = await apiClient.get('/threads/'); // Adjust to the actual endpoint for threads
    return response.data; // Assuming it returns the threads
});

// Async thunk to create a new thread
export const createThread = createAsyncThunk(
    'chat/createThread',
    async (newThreadTitle: string) => {
        const response = await apiClient.post('/threads/', {
            title: newThreadTitle,
        });
        return response.data; // Assuming it returns the created thread
    }
);

// Async thunk to send a message in the current thread
export const sendMessageToThread = createAsyncThunk(
    'chat/sendMessageToThread',
    async ({ threadId, message }: { threadId: number; message: string }) => {
        const response = await apiClient.post(`/threads/${threadId}/messages/`, {
            message,
        });
        return response.data; // Assuming it returns the message sent
    }
);

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        // Actions for managing the current thread
        setCurrentThread: (state, action) => {
            state.currentThread = action.payload;
        },
        addNewThread: (state, action) => {
            state.threads.push(action.payload);
        },
        updateThread: (state, action) => {
            state.threads = state.threads.map((thread) =>
                thread.id === action.payload.id ? action.payload : thread
            );
        },
        removeThread: (state, action) => {
            state.threads = state.threads.filter((thread) => thread.id !== action.payload);
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
            .addCase(fetchThreads.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(createThread.fulfilled, (state, action) => {
                state.threads.push(action.payload);
                state.currentThread = action.payload; // Automatically set the current thread
            })
            .addCase(sendMessageToThread.fulfilled, (state, action) => {
                if (state.currentThread) {
                    state.currentThread.messages.push(action.payload);
                }
            });
    },
});

export const { setCurrentThread, addNewThread, updateThread, removeThread } = chatSlice.actions;

export const selectThreads = (state: RootState) => state.chat.threads;
export const selectCurrentThread = (state: RootState) => state.chat.currentThread;
export const selectChatStatus = (state: RootState) => state.chat.status;

export default chatSlice.reducer;
