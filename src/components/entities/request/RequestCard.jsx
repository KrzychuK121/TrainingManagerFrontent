import {Button, Card} from "react-bootstrap";
import {isAtLeastModerator} from "../../../utils/RoleUtils";
import {Tooltip} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import ConfirmModal from "../crud/ConfirmModal";
import {useState} from "react";
import {json, redirect, useSubmit} from "react-router-dom";
import {defaultHeaders, deleteAction} from "../../../utils/CRUDUtils";
import {DOMAIN, getIdPath, UNKNOWN_ERROR} from "../../../utils/URLUtils";
import DeleteModal from "../crud/DeleteModal";

const { format } = require('date-fns');

function getFormattedDate(date) {
    const dateObj = new Date(date);
    return format(dateObj, 'yyyy-MM-dd HH:mm:ss');
}

function RequestCard(
    {
        request,
        setActionData
    }
) {
    const closedBy = request.closing;
    const submit = useSubmit();
    const [confirmCloseRequest, setConfirmCloseRequest] = useState(false);

    return (
        <>
            <Card className='my-4'>
                <Card.Header className='d-flex justify-content-between'>
                    <span className='text-uppercase'>
                        {request.title}
                    </span>
                    {
                        !closedBy && (
                            <div>
                                {
                                    isAtLeastModerator() && (
                                        <>
                                            <ConfirmModal
                                                body='Czy na pewno chcesz zamknąć to zgłoszenie?'
                                                show={confirmCloseRequest}
                                                setShow={setConfirmCloseRequest}
                                                onConfirm={
                                                    (event) => {
                                                        event.preventDefault();
                                                        submit(
                                                            null,
                                                            {
                                                                method: 'PATCH',
                                                                action: `/main/request/close/${request.id}`
                                                            }
                                                        );
                                                    }
                                                }
                                            />
                                            <Tooltip
                                                title='Zamknij zgłoszenie'
                                                placement='top'
                                                enterDelay={250}
                                                leaveDelay={400}
                                            >
                                                <Button
                                                    variant='primary'
                                                    className='m-1'
                                                    onClick={() => setConfirmCloseRequest(true)}
                                                >
                                                    <FontAwesomeIcon icon={faXmark} />
                                                </Button>
                                            </Tooltip>
                                        </>
                                    )
                                }

                                <DeleteModal
                                    action={`/main/request/delete/${request.id}`}
                                    setActionData={setActionData}
                                    deleteEntityName='żądanie'
                                />
                            </div>
                        )
                    }
                </Card.Header>
                <Card.Body>

                    <p>{request.description}</p>
                </Card.Body>
                <Card.Footer className='d-flex justify-content-between'>
                    <span>Dodano przez: {request.requesting.username}</span>
                    <span>Zgłoszono: {getFormattedDate(request.requestDate)}</span>
                    {
                        closedBy && <span>Zamknięto przez: {closedBy.username}</span>
                    }
                </Card.Footer>
            </Card>
        </>
    );
}

export default RequestCard;

export const CLOSE_SUCCESS = 'close-success';
export const CLOSE_ERROR_CLOSED = 'close-error-closed';
export const CLOSE_ERROR_NOT_FOUND = 'close-error-not-found';

export async function closeAction(
    {
        request,
        params
    }
) {
    const requestId = getIdPath(params);
    if(!requestId)
        throw new Error('Request id should be provided.');

    const response = await fetch(
        `${DOMAIN}/user-request${requestId}`,
        {
            headers: defaultHeaders(),
            method: 'PATCH'
        }
    );

    if(response.status  === 400)
        return redirect(`/main/request?${CLOSE_ERROR_CLOSED}`);

    if(response.status === 404)
        return redirect(`/main/request?${CLOSE_ERROR_NOT_FOUND}`);

    if(response.status !== 204)
        return redirect(`/main/request?${UNKNOWN_ERROR}`);

    return redirect(`/main/request?${CLOSE_SUCCESS}`);
}

export async function deleteRequestAction({request, params}) {
    const response = await deleteAction(
        `${DOMAIN}/user-request`,
        '/main/request',
        request,
        params
    );

    if(response.status === 404)
        return json({error: 'Wybrane zgłoszenie nie istnieje.'});

    const responseText = await response.text();
    if(response.status === 400) {
        if (responseText.includes('not allowed'))
            return json({error: 'Nie możesz usunąć tego zgłoszenia.'});
        if (responseText.includes('can\'t delete closed'))
            return json({error: 'Nie można usunąć zamkniętego zgłoszenia.'});
    }

    return response;
}