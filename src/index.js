import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import WebsocketProvider from './contexts/ws/WebsocketProvider';
import { router } from './router_definition/Router';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <WebsocketProvider>
            <RouterProvider router={router}/>
        </WebsocketProvider>
    </React.StrictMode>
);
