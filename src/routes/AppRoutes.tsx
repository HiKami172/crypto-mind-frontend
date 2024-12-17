import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ProtectedRoute from './PrivateRoute';
import SignInGoogle from "../pages/SignInGoogle";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";
import About from "../pages/About";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/associate/google/callback" element={<SignInGoogle />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/analytics"
                element={
                    <ProtectedRoute>
                        <Analytics />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/settings"
                element={
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/about"
                element={
                    <ProtectedRoute>
                        <About />
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<Navigate to="/sign-in" replace />} />
        </Routes>
    );
};

export default AppRoutes;
