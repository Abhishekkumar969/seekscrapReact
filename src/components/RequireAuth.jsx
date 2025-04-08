// src/components/RequireAuth.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        // Not logged in, redirect to homepage/login
        return <Navigate to="/" replace />;
    }

    return children;
};

export default RequireAuth;
