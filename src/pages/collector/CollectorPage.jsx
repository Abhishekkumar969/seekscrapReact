import React from 'react';
import { useNavigate } from 'react-router-dom';

const CollectorPage = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="container">
            <h1 className="heading">Welcome Collector ♻️</h1>
            <p className="description">This is the collector dashboard.</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default CollectorPage;
