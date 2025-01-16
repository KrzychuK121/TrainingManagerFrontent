import {json, redirect} from 'react-router-dom';
import {defaultHeaders} from './CRUDUtils';
import {DOMAIN, setGoBackPath} from "./URLUtils";

const AUTH_RESPONSE_KEYS = {
    token: 'token',
    firstName: 'firstName',
    lastName: 'lastName',
    role: 'role'
};

function invokeStorageEvent() {
    window.dispatchEvent(new Event('storage'));
}

function saveResponse(authResponse) {
    Object.values(AUTH_RESPONSE_KEYS).forEach(
        key => localStorage.setItem(key, authResponse[key])
    );
    invokeStorageEvent();
}

function clearResponse() {
    Object.values(AUTH_RESPONSE_KEYS).forEach(
        key => localStorage.removeItem(key)
    );
    invokeStorageEvent();
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

export function getRole() {
    return getAuthData(AUTH_RESPONSE_KEYS.role);
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

export function getSiteKey() {
    const siteKey = process.env.REACT_APP_SITE_KEY;
    return siteKey === 'disabled'
        ? false
        : siteKey;
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
    if(isAuthenticated())
        return null;
    setGoBackPath();
    return redirect('/main/login');
}

export async function login(userCredentials) {
    const response = await fetch(
        `${DOMAIN}/auth/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userCredentials)
        }
    );

    const TRY_LATER_OR_CALL_ADMIN_MESS = 'Spróbuj ponownie później bądź skontaktuj się z administratorem';

    // Captcha not verified
    if (response.status === 400)
        return json({error: `Wystąpił problem z weryfikacją captcha. ${TRY_LATER_OR_CALL_ADMIN_MESS}.`});

    // Wrong password
    if (response.status === 401)
        return json({error: 'Hasło jest nieprawidłowe.'});

    // User does not exist
    if (response.status === 404)
        return json({error: `Użytkownik ${userCredentials.username} nie istnieje.`});

    if(response.status === 423)
        return json({error: 'Twoje konto zostało zablokowane.'});

    if(response.status === 500)
        return json({error: `Wystąpił problem po stronie serwera. ${TRY_LATER_OR_CALL_ADMIN_MESS}.`});

    const data = await response.json();
    saveResponse(data);

    return null;
}

export async function logout() {
    if (!isAuthenticated())
        return json({error: 'Nie można wylogować. Użytkownik niezalogowany.'});

    await fetch(
        `${DOMAIN}/auth/logout`,
        {
            method: 'POST',
            headers: defaultHeaders()
        }
    );

    clearResponse();
    return null;
}