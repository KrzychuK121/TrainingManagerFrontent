import { Stomp } from '@stomp/stompjs';
import { useCallback, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { isAuthenticated } from '../../utils/AuthUtils';
import { defaultHeaders } from '../../utils/CRUDUtils';
import { WebsocketContext } from './WebsocketContext';

function injectTime() {
    return `[${new Date().toISOString()}]: `;
}

function onTestMessage(payload) {
    const mess = JSON.stringify(payload.body);
    console.log(`${injectTime()}test`);
    console.log(`${injectTime()}message: ${mess}`);
}

function onError() {
    console.log(`${injectTime()}Error occured`);
}

function WebsocketProvider({children}) {
    const WS_DOMAIN = '/topic';
    const stompClientRef = useRef(null);

    function onConnect() {
        console.log(`${injectTime()}Created new ws connection`);
        stompClientRef.current.subscribe(`${WS_DOMAIN}/test`, onTestMessage);
    }

    function connect() {
        if (stompClientRef.current)
            return;

        console.log(`${injectTime()}No ws connection yet. Creating new one...`);
        stompClientRef.current = Stomp.over(
            new SockJS('http://localhost:8080/ws')
        );

        stompClientRef.current.connect(defaultHeaders(), onConnect, onError);
    }

    const disconnect = useCallback(() => {
        if (!stompClientRef.current)
            return;

        console.log(`${injectTime()}Disconnecting from WS...`);
        stompClientRef.current.disconnect();
        stompClientRef.current = null;
    }, []);

    useEffect(() => {
        function connLogic() {
            if (isAuthenticated())
                connect();
            else
                disconnect();
        }

        connLogic();
        window.addEventListener('storage', connLogic);

        return () => {
            window.removeEventListener('storage', () => {
            });
        };
    }, []);

    return (
        <WebsocketContext.Provider value={
            {
                stompClientRef
            }
        }>
            {children}
        </WebsocketContext.Provider>
    );
}

export default WebsocketProvider;