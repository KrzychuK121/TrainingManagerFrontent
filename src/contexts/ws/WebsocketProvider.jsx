import { Stomp } from '@stomp/stompjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import SockJS from 'sockjs-client';
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
        const alertComponent = (
            <Alert dismissible onClose={() => setReminderComponent(false)}>
                <Alert.Heading className='d-flex justify-content-between'>
                    {`${data.reminderTitle}: ${data.trainingTitle}`}
                </Alert.Heading>
                <hr/>
                <p>{`Trening rozpocznie się o godzinie ${data.time}. Nie przegap treningu!`}</p>
            </Alert>
        );
        console.log(alertComponent);
        setReminderComponent(alertComponent);
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