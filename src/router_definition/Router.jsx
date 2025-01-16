import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Default from '../routes/Default';
import MainPage from '../routes/main/MainPage';
import MainWelcome from '../routes/main/MainWelcome';
import AccessDenied from '../routes/authentication/AccessDenied';
import LoginPage, {action as loginAction} from '../routes/authentication/Login';
import LogoutPage, {action as logoutAction} from '../routes/authentication/Logout';
import RegisterPage, {action as registerAction} from '../routes/authentication/Register';
import Welcome from '../routes/Welcome';
import {authenticatedLoader, isAuthenticated as isAuthLoader} from '../utils/AuthUtils';
import AuthorizedPaths from './AuthorizedPaths';
import DefaultErrorPage from "../routes/authentication/DefaultErrorPage";

// TODO: add titles to pages https://dev.to/rohitnirban/adding-page-titles-to-react-app-23oe
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
                    errorElement: <DefaultErrorPage />,
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
                            path: 'access-denied',
                            element: <AccessDenied/>
                        },
                        AuthorizedPaths
                    ]
                }
            ]
        }
    ]
);
