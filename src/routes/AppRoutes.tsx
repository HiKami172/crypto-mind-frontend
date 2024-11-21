import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ProtectedRoute from './PrivateRoute';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<Navigate to="/sign-in" replace />} />
        </Routes>
    );
};

export default AppRoutes;
