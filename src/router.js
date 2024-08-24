import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Default from './routes/Default';
import Welcome from './routes/Welcome';
import MainPage from './routes/main/MainPage';
import NonAuthWelcome from "./routes/main/NonAuthWelcome";
import LoginPage from './routes/navigations/authentication/Login';
import RegisterPage, { action as registerAction } from './routes/navigations/authentication/Register';
import LogoutPage from './routes/navigations/authentication/Logout';

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
                    path: 'main',
                    element: <MainPage />,
                    children: [
                        {
                            index: true,
                            element: <NonAuthWelcome />
                        },
                        {
                            path: 'login',
                            element: <LoginPage />
                        },
                        {
                            path: 'register',
                            element: <RegisterPage />,
                            action: registerAction
                        },
                        {
                            path: 'logout',
                            element: <LogoutPage />
                        }
                    ]
                }
            ]
        }
    ]
);
