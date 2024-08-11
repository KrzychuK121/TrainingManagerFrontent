import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Default from './routes/Default';
import Welcome from './routes/Welcome';
import MainPage from './routes/MainPage';

export const router = createBrowserRouter(
    [
        {
            path: '/', element: <Default />, children: [
                {
                    path: '/',
                    index: true,
                    element: <Welcome />
                },
                {
                    path: '/glowna',
                    element: <MainPage />
                }
            ]
        }
    ]
);
