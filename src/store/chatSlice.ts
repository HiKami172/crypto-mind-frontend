import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/axiosInstance';
import { RootState } from './store';
import {Message, Thread} from "../types";


interface ThreadState extends Thread {
    messages: {
        items: Message[];
        next_page: number | null;
        previous_page: number | null;
        count: number
    };
    status: 'idle' | 'loading' | 'succeeded' | 'failed' | 'generating';

}

interface ChatState {
    threads: {
        items: { [id: string]: ThreadState };
        next_page: number | null;
        previous_page: number | null;
        count: number;
    };
    currentThreadId: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ChatState = {
    threads: {
        items: {},
        next_page: null,
        previous_page: null,
        count: 0
    },
    currentThreadId: null,
    status: 'idle',
};


export const fetchThreads = createAsyncThunk(
    'chat/fetchThreads',
    async () => {
    const response = await apiClient.get('/threads/');
    return response.data;
});

export const createThread = createAsyncThunk(
    'chat/createThread',
    async ({ threadTitle }: { threadTitle: string }) => {
        const response = await apiClient.post('/threads/', {title: threadTitle});
        return response.data;
    }
);

export const sendMessageToThread = createAsyncThunk(
    'chat/sendMessageToThread',
    async ({ threadId, message }: { threadId: string; message: string }) => {
        const response = await apiClient.post(`/threads/${threadId}/messages/`, {
            message,
        });
        return {threadId: threadId, message: response.data};
    }
);

export const fetchThreadMessages = createAsyncThunk(
    'chat/fetchThreadMessages',
    async ({ threadId, page }: { threadId: string, page: number | null }) => {
        if (!page)
            page = 1;
        const response = await apiClient.get(`/threads/${threadId}/messages/`, {
            params: { page }
        });
        return response.data;
    }
);

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setCurrentThread: (state, action) => {
            state.currentThreadId = action.payload;
        },
        addNewThread: (state, action) => {
            state.threads.items[action.payload.id] = {...action.payload,};
        },
        updateThread: (state, action) => {
            const { id } = action.payload;
            if (state.threads.items[id]) {
                state.threads.items[id] = action.payload;
            }
        },
        removeThread: (state, action) => {
            const threadId = action.payload;
            delete state.threads.items[threadId];
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

                const threads = action.payload.items;
                Object.entries(threads).forEach(([threadId, thread]) => {
                    threads[threadId].messages = {
                        items: [],
                        next_page: null,
                        previous_page: null,
                        count: 0
                    }
                    threads[threadId].status = 'idle';
                });

                state.threads.items = threads;
            })
            .addCase(fetchThreads.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(fetchThreadMessages.fulfilled, (state, action) => {
                const {count, items, next_page, previous_page} = action.payload;
                if (!state.currentThreadId)
                    return;
                const currentThread = state.threads.items[state.currentThreadId] ;
                currentThread.status = 'succeeded';
                currentThread.messages.items.unshift(...items);
                currentThread.messages.count = count;
                currentThread.messages.next_page = next_page;
                currentThread.messages.previous_page = previous_page;

            })
            .addCase(fetchThreadMessages.pending, (state, action) => {
                if (!state.currentThreadId)
                    return;
                const currentThread = state.threads.items[state.currentThreadId] ;
                currentThread.status = 'loading';
            })
            .addCase(createThread.fulfilled, (state, action) => {
                const newThread = action.payload;
                state.threads.items[newThread.id] = {
                    ...newThread,
                    messages: {
                        items: [],
                        previous_page: null,
                        next_page: null,
                        count: 1
                    },
                    status: 'succeeded'
                };
                state.currentThreadId = newThread.id;
            })
            .addCase(sendMessageToThread.pending, (state, action) => {
                const { threadId, message } = action.meta.arg;
                const timestamp = new Date().toISOString();
                if (threadId && message) {
                    const thread = state.threads.items[threadId];
                    if (thread) {
                        thread.messages.items.push({
                            role: 'user',
                            content: message,
                            created_at: timestamp
                        });
                    }
                    thread.status = "generating";
                }
            })
            .addCase(sendMessageToThread.fulfilled, (state, action) => {
                const {threadId, message} = action.payload;
                if (!threadId)
                    return;
                const thread = state.threads.items[threadId];
                thread.status = "succeeded";
                thread.messages.items.push(message);
            });
    },
});

export const { setCurrentThread, addNewThread, updateThread, removeThread } = chatSlice.actions;

export const selectThreads = (state: RootState) => {
    console.log("Threads: ", Object.values(state.chat.threads.items));
    return Object.values(state.chat.threads.items)
};

export const selectCurrentThread = (state: RootState) =>
    state.chat.currentThreadId ? state.chat.threads.items[state.chat.currentThreadId] : null;
export const selectCurrentMessages = (state: RootState) =>
    state.chat.currentThreadId ? state.chat.threads.items[state.chat.currentThreadId]?.messages.items : [];
export const selectChatStatus = (state: RootState) => state.chat.status;

export default chatSlice.reducer;