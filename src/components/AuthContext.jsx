import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export async function getAccessToken() {
    const headers = { "Content-Type": "application/x-www-form-urlencoded" };
    const data = {
        grant_type: 'client_credentials',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
    };
    const res = await axios.post(`https://accounts.spotify.com/api/token`, data, { headers });
    return res.data;
}

export function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(() => {
        return localStorage.getItem('accessToken') || null;
    });

    useEffect(() => {
        async function fetchToken() {
            const tokenData = JSON.parse(localStorage.getItem('tokenData'));
            const now = Math.floor(Date.now() / 1000);

            if (!tokenData || now >= tokenData.expiration) {
                const { access_token, expires_in } = await getAccessToken();

                const expiration = now + expires_in;

                setAccessToken(access_token);
                localStorage.setItem('accessToken', access_token);
                localStorage.setItem('tokenData', JSON.stringify({ expiration }));
            } else {
                setAccessToken(tokenData.accessToken);
            }
        }

        fetchToken();
    }, []);

    const value = { accessToken, setAccessToken };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
