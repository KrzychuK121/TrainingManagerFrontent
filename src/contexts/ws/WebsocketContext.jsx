import { createContext, useContext } from 'react';

export const WebsocketContext = createContext(null);

export function useWebsocket() {
    return useContext(WebsocketContext);
}