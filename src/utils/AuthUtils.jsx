const TOKEN_KEY = 'token';

function saveToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
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

    // Wrong login or password
    if (response.status === 401) {
        return;
    }

    // User does not exist
    if (response.status === 404) {
        return;
    }

    const data = await response.json();
    const token = data.token;
    saveToken(token);
}