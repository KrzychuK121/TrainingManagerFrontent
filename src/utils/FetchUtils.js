import { redirect } from 'react-router-dom';
import { injectToken, logout, tokenExpired } from './AuthUtils';

export function defaultHeaders(headers) {
    return injectToken({
        ...headers,
        'Content-Type': 'application/json'
    });
}

export async function handleResponseUnauthorized(response) {
    if (tokenExpired(response)) {
        const logoutResponse = await logout();
        return redirect('/main/login');
    } else
        return null;
}