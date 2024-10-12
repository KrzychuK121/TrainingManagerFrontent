import { redirect } from 'react-router-dom';
import { injectToken, logout, tokenExpired } from './AuthUtils';
import { DELETE_SUCCESS } from './URLUtils';

export function defaultHeaders(headers) {
    return injectToken({
        ...headers,
        'Content-Type': 'application/json'
    });
}

export async function handleResponseUnauthorized(response) {
    if (!tokenExpired(response))
        return null;

    const logoutResponse = await logout();
    return redirect('/main/login');
}

export async function sendDefaultRequest(
    path,
    domain = 'http://localhost:8080/api',
    headers = null
) {
    const response = await fetch(
        `${domain}/${path}`,
        {
            headers: defaultHeaders(headers)
        }
    );

    const handledResponse = await handleResponseUnauthorized(response);
    if (handledResponse)
        return handledResponse;

    return response.json();
}

export async function createModelLoader(
    path,
    redirectPath,
    params,
    editAttribute
) {
    const entityId = params.id
        ? `/${params.id}`
        : '';

    const fetchedData = await sendDefaultRequest(
        `${path}${entityId}`
    );

    if (
        fetchedData &&
        params.id && (
            !fetchedData.hasOwnProperty(editAttribute) ||
            fetchedData[editAttribute] === null
        )
    )
        return redirect(redirectPath);
    return fetchedData;
}

export async function deleteAction(
    requestPath,
    redirectPath,
    request,
    params
) {
    const entityId = params.id
        ? `/${params.id}`
        : '';

    const response = await fetch(
        `${requestPath}${entityId}`,
        {
            method: request.method,
            headers: defaultHeaders()
        }
    );

    const handledResponse = await handleResponseUnauthorized(response);
    if (handledResponse)
        return handledResponse;

    if (response.status === 204) {
        return redirect(`${redirectPath}?${DELETE_SUCCESS}`);
    }

    return response;
}