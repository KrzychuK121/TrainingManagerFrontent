import {defaultHeaders, sendDefaultRequest} from "../../../utils/CRUDUtils";
import {DOMAIN, getFilteredQueryString} from "../../../utils/URLUtils";
import {json, useActionData, useLoaderData} from "react-router-dom";
import PaginationEntity from "../../../components/entities/crud/PaginationEntity";
import UserElement from "../../../components/admin/users/UserElement";
import {Row} from "react-bootstrap";
import AlertComponent from "../../../components/alerts/AlertComponent";
import useFormValidation from "../../../hooks/UseFormValidation";

function UsersDisplay() {
    const loadedData = useLoaderData();
    const actionData = useActionData();
    const page = loadedData
    const users = loadedData.content;
    const {message} = actionData || {};
    const {globalMessage} = useFormValidation(actionData);

    if(!Array.isArray(users) || !users.length)
        return (
            <div>
                <AlertComponent
                    message={message}
                    showTrigger={actionData}
                    closeDelay={5000}
                    scrollOnTrigger={true}
                />
                <AlertComponent
                    message={globalMessage}
                    showTrigger={actionData}
                    variant='danger'
                    closeDelay={5000}
                    scrollOnTrigger={true}
                />
                <span>Brak użytkowników</span>
            </div>
        );

    return (
        <>
            <AlertComponent
                message={message}
                showTrigger={actionData}
                closeDelay={5000}
                scrollOnTrigger={true}
            />
            <AlertComponent
                message={globalMessage}
                showTrigger={actionData}
                variant='danger'
                closeDelay={5000}
                scrollOnTrigger={true}
            />
            <Row>
                {users.map(user => (<UserElement key={user.id} user={user} />))}
            </Row>
            <PaginationEntity pages={page} />
        </>
    );
}

export default UsersDisplay;

export async function loader({request}) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const filteredQueryString = getFilteredQueryString(searchParams, ['page', 'sort', 'size']);

    return sendDefaultRequest(`auth/all-users${filteredQueryString}`);
}

async function handleRoleChange(
    userId,
    formData,
    request
) {
    const role = formData.get('promoteTo');
    const response = await fetch(
        `${DOMAIN}/auth/change-role/${userId}/${role}`,
        {
            method: request.method,
            headers: defaultHeaders()
        }
    );

    if(response.status === 404)
        return json({error: 'Nie znaleziono użytkownika.'});

    if(response.status === 400) {
        const errorMessage = await response.text();
        if(errorMessage.includes('not switch') && errorMessage.includes('to admin'))
            return json({error: 'Nie można zmienić roli. Nie może istnieć więcej jak jeden administrator w systemie.'});
        if(errorMessage.includes('no such role'))
            return json({error: `Rola '${errorMessage.split(': ')[1]}' nie istnieje`})
    }

    if(response.status !== 204)
        return json({error: 'Wystąpił nieoczekiwany błąd.'});

    return json({message: 'Zmieniono rolę dla użytkownika.'});
}

async function handleLockChange(
    userId,
    formData,
    request
) {
    const toLock = formData.get('toLock');
    const response = await fetch(
        `${DOMAIN}/auth/change-user-lock/${userId}/${toLock}`,
        {
            method: request.method,
            headers: defaultHeaders()
        }
    );

    if(response.status === 404)
        return json({error: 'Nie znaleziono użytkownika.'});
    if(response.status === 400)
        return json({error: 'Nie można zablokować konta administratora.'});
    if(response.status !== 204)
        return json({error: 'Wystąpił nieoczekiwany błąd.'});

    return json(
        {
            message: 'Użytkownik został ' + (
                toLock === 'true'
                    ? 'zablokowany'
                    : 'odblokowany'
            )
        }
    );
}

export async function action({request}) {
    const formData = await request.formData();
    const userId = formData.get('userId');

    switch(formData.get('actionName')) {
        case 'lock':
            return await handleLockChange(userId, formData, request);
        case 'changeRole':
            return await handleRoleChange(userId, formData, request);
        default:
            throw new Error('Unknown action provided in UserDisplay.');
    }
}