import './App.css';
import Main from './components/Main';
import {AuthProvider} from './components/AuthContext';
import React from 'react';

export default function App() {
    return (
        <AuthProvider>
            <Main />
        </AuthProvider>
    );
}
