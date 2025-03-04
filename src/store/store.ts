import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import chatReducer from './chatSlice';
import binanceReducer from './binanceSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer,
        binance: binanceReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
