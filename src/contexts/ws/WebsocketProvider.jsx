import { Stomp } from '@stomp/stompjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import NotificationAlert from '../../components/notification/NotificationAlert';
import { isAuthenticated, logout } from '../../utils/AuthUtils';
import { defaultHeaders } from '../../utils/CRUDUtils';
import { WebsocketContext } from './WebsocketContext';

export const WS_DOMAIN = '/topic';

function injectTime() {
    return `[${new Date().toISOString()}]: `;
}

function WebsocketProvider({children}) {
    const stompClientRef = useRef(null);

    const [reminderComponent, setReminderComponent] = useState(null);

    function showTrainingReminder(payload) {
        console.log('reminder info received');
        const data = JSON.parse(payload.body);

        setReminderComponent(
            <NotificationAlert
                reminderTitle={data.reminderTitle}
                trainingTitle={data.trainingTitle}
                time={data.time}
                type={data.type}
                onClose={() => setReminderComponent(false)}
            />
        );
    }

    function onError() {
        console.log(`${injectTime()}Error occured`);
        logout();
        stompClientRef.current = null;
    }

    function onConnect() {
        const stompClient = stompClientRef.current;
        stompClient.subscribe(
            `/user/topic/training/notification`,
            showTrainingReminder
        );
        stompClient.debug = (message) => {
            console.log(`${injectTime()}${message}`);
        };
        stompClient.send(
            '/websockets/plans.reminders'
        );
    }

    function connect() {
        if (stompClientRef.current)
            return;

        console.log(`${injectTime()}No ws connection yet. Creating new one...`);
        stompClientRef.current = Stomp.over(
            new SockJS('http://localhost:8080/ws')
        );
        const stompClient = stompClientRef.current;

        stompClient.connect(defaultHeaders(), onConnect, onError);
    }

    const disconnect = useCallback(() => {
        if (!stompClientRef.current)
            return;

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
                stompClientRef,
                reminderComponent
            }
        }>
            {children}
        </WebsocketContext.Provider>
    );
}

export default WebsocketProvider;