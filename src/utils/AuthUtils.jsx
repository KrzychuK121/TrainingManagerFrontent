import { json, redirect } from 'react-router-dom';

const TOKEN_KEY = 'token';

function saveToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
}

function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function injectToken(headers) {
    return {...headers, Authorization: 'Bearer ' + getToken()};
}

export function isAuthenticated() {
    return getToken() !== null;
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
    const token = data.token;
    saveToken(token);

    return null;
}

export async function logout() {
    if (!isAuthenticated())
        return json({error: 'Nie można wylogować. Użytkownik niezalogowany.'});

    await fetch(
        'http://localhost:8080/api/auth/logout',
        {
            method: 'POST',
            headers: injectToken({
                'Content-Type': 'application/json'
            })
        }
    );

    clearToken();

    return null;
}