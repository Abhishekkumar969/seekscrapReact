import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // To prevent flicker

    useEffect(() => {
        const loadUser = async () => {
            const json = await AsyncStorage.getItem('user');
            if (json) setUser(JSON.parse(json));
            setLoading(false);
        };
        loadUser();
    }, []);

    const login = async (userData) => {
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('user');
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};
