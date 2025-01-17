import {json, redirect} from 'react-router-dom';
import {injectToken, logout, tokenExpired} from './AuthUtils';
import {DELETE_SUCCESS, DOMAIN, EDIT_SUCCESS, getIdPath, setGoBackPath} from './URLUtils';

export function defaultHeaders(headers) {
    return injectToken({
        ...headers,
        'Content-Type': 'application/json'
    });
}

export async function defaultAuthHandler(response) {
    if(response.status === 423) {
        const logoutResponse = await logout();
        throw json({message: 'Twoje konto zostało zablokowane.'}, {status: 423});
    }

    if(response.status === 403)
        throw json({message: 'Nie masz uprawnień by wyświetlić zawartość strony.'}, {status: 403});

    if (tokenExpired(response)) {
        setGoBackPath();
        const logoutResponse = await logout();
        return redirect('/main/login');
    }

    return null;
}

export async function sendDefaultRequest(
    path,
    domain = DOMAIN,
    headers = null
) {
    const response = await fetch(
        `${domain}/${path}`,
        {
            headers: defaultHeaders(headers)
        }
    );

    const handledResponse = await defaultAuthHandler(response);
    if (handledResponse)
        return handledResponse;

    return response.json();
}

export async function sendDefaultParallelRequests(
    paths,
    headers = null,
    domain = DOMAIN
) {
    const promises = paths.map(
        path => fetch(
            `${domain}/${path}`,
            {
                headers: defaultHeaders(headers)
            }
        )
    );

    const responses = await Promise.all(promises);

    const handledResponse = await defaultAuthHandler(responses[0]);
    if (handledResponse)
        return handledResponse;

    return await Promise.all(
        responses.map(response => response.json())
    );
}

const DEFAULT_ENTITY_LABEL = 'obiekt';

export async function sendSaveRequest(
    toSave,
    path,
    redirectPath,
    params,
    request,
    entityLabel = DEFAULT_ENTITY_LABEL,
    headers = null,
    domain = DOMAIN
) {
    const entityId = getIdPath(params);
    const response = await fetch(
        `${domain}/${path}${entityId}`,
        {
            method: request.method,
            headers: defaultHeaders(headers),
            body: JSON.stringify(toSave)
        }
    );

    if (response.status === 204)
        return redirect(`${redirectPath}?${EDIT_SUCCESS}`);
    if (response.status !== 201)
        return await response.json();

    return json(
        {
            message: entityLabel === DEFAULT_ENTITY_LABEL
                ? `Utworzono nowy ${entityLabel}!`
                : `Utworzono ${entityLabel}!`
        },
        {status: 201}
    );
}

export async function createModelLoader(
    path,
    redirectPath,
    params,
    editAttribute
) {
    const entityId = getIdPath(params);

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
    const entityId = getIdPath(params);

    const response = await fetch(
        `${requestPath}${entityId}`,
        {
            method: request.method,
            headers: defaultHeaders()
        }
    );

    const handledResponse = await defaultAuthHandler(response);
    if (handledResponse)
        return handledResponse;

    if (response.status === 204) {
        return redirect(`${redirectPath}?${DELETE_SUCCESS}`);
    }

    return response;
}