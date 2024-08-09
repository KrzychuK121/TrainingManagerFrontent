import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './components/App';
import Welcome from './components/Welcome';

export const router = createBrowserRouter(
    [
        {
            path: '/', element: <App />
        },
        {
            path: '/welcome', element: <Welcome />
        }
    ]
);
