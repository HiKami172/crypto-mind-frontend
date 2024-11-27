import React from 'react';
import { Provider } from 'react-redux';
import { AuthProvider } from '../context/AuthContext';
import { store } from '../store/store';

const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Provider store={store}>
            <AuthProvider>{children}</AuthProvider>
        </Provider>
    );
};

export default AppProviders;
