import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Default from './routes/Default';
import Welcome from './routes/Welcome';
import MainPage from './routes/main/MainPage';
import MainWelcome from "./routes/main/MainWelcome";
import LoginPage, { action as loginAction } from './routes/navigations/authentication/Login';
import RegisterPage, { action as registerAction } from './routes/navigations/authentication/Register';
import LogoutPage from './routes/navigations/authentication/Logout';

export const router = createBrowserRouter(
    [
        {
            path: '/', element: <Default/>, children: [
                {
                    path: '/',
                    index: true,
                    element: <Welcome/>
                },
                {
                    path: 'main',
                    element: <MainPage/>,
                    children: [
                        {
                            index: true,
                            element: <MainWelcome/>
                        },
                        {
                            path: 'login',
                            element: <LoginPage/>,
                            action: loginAction
                        },
                        {
                            path: 'register',
                            element: <RegisterPage/>,
                            action: registerAction
                        },
                        {
                            path: 'logout',
                            element: <LogoutPage/>
                        }
                    ]
                }
            ]
        }
    ]
);
