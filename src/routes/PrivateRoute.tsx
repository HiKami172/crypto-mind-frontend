import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { isAuthenticated } = authContext;

    return isAuthenticated ? <>{children}</> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
