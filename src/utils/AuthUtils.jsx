import { json, redirect } from 'react-router-dom';
import { defaultHeaders } from './CRUDUtils';

const AUTH_RESPONSE_KEYS = {
    token: 'token',
    firstName: 'firstName',
    lastName: 'lastName'
};

function saveResponse(authResponse) {
    Object.values(AUTH_RESPONSE_KEYS).forEach(
        key => localStorage.setItem(key, authResponse[key])
    );
}

function clearResponse() {
    Object.values(AUTH_RESPONSE_KEYS).forEach(
        key => localStorage.removeItem(key)
    );
}

function getAuthData(key) {
    return localStorage.getItem(key);
}

function getToken() {
    return getAuthData(AUTH_RESPONSE_KEYS.token);
}

export function getFirstName() {
    return getAuthData(AUTH_RESPONSE_KEYS.firstName);
}

export function getLastName() {
    return getAuthData(AUTH_RESPONSE_KEYS.lastName);
}

export function injectToken(headers) {
    return {...headers, Authorization: 'Bearer ' + getToken()};
}

export function isAuthenticated() {
    return getToken() !== null;
}

export function tokenExpired(response) {
    return response.status === 401 && isAuthenticated();
}


/**
 * This function should be used as loader in paths where
 * users should be prevented from accessing page after authentication
 * (e.g.login page).
 */
export function authenticatedLoader() {
    return isAuthenticated()
        ? redirect('/main')
        : null;
}

export function nonAuthenticatedLoader() {
    return !isAuthenticated()
        ? redirect('/main/login')
        : null;
}

export async function login(userCredentials) {
    const response = await fetch(
        'http://localhost:8080/api/auth/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userCredentials)
        }
    );

    // Wrong password
    if (response.status === 401) {
        return json({error: 'Hasło jest nieprawidłowe.'});
    }

    // User does not exist
    if (response.status === 404) {
        return json({error: `Użytkownik ${userCredentials.username} nie istnieje.`});
    }

    const data = await response.json();
    saveResponse(data);

    return null;
}

export async function logout() {
    if (!isAuthenticated())
        return json({error: 'Nie można wylogować. Użytkownik niezalogowany.'});

    await fetch(
        'http://localhost:8080/api/auth/logout',
        {
            method: 'POST',
            headers: defaultHeaders()
        }
    );

    clearResponse();
    return null;
}