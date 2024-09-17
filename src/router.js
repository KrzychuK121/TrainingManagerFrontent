import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Default from './routes/Default';
import ExercisesDisplay, { loader as exercisesLoader } from './routes/entities/exercise/ExercisesDisplay';
import MainPage from './routes/main/MainPage';
import MainWelcome from './routes/main/MainWelcome';
import LoginPage, { action as loginAction } from './routes/navigations/authentication/Login';
import LogoutPage, { action as logoutAction } from './routes/navigations/authentication/Logout';
import RegisterPage, { action as registerAction } from './routes/navigations/authentication/Register';
import Welcome from './routes/Welcome';
import { authenticatedLoader, isAuthenticated as isAuthLoader, nonAuthenticatedLoader } from './utils/AuthUtils';

export const router = createBrowserRouter(
    [
        {
            id: 'root',
            path: '/',
            element: <Default/>,
            loader: isAuthLoader,
            children: [
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
                            action: loginAction,
                            loader: authenticatedLoader
                        },
                        {
                            path: 'register',
                            element: <RegisterPage/>,
                            action: registerAction,
                            loader: authenticatedLoader
                        },
                        {
                            path: 'logout',
                            element: <LogoutPage/>,
                            action: logoutAction
                        },
                        {
                            path: '',
                            loader: nonAuthenticatedLoader,
                            children: [
                                {
                                    path: 'exercise',
                                    element: <ExercisesDisplay/>,
                                    loader: exercisesLoader
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
);
