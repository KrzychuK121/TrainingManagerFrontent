import {DELETE_SUCCESS, getFilteredQueryString, UNKNOWN_ERROR} from "../../../utils/URLUtils";
import {sendDefaultRequest} from "../../../utils/CRUDUtils";
import {useLoaderData} from "react-router-dom";
import RequestCard, {
    CLOSE_ERROR_CLOSED,
    CLOSE_ERROR_NOT_FOUND,
    CLOSE_SUCCESS
} from "../../../components/entities/request/RequestCard";
import PaginationEntity from "../../../components/entities/crud/PaginationEntity";
import {useMessageParams} from "../../../hooks/UseMessageParam";
import {useState} from "react";
import useFormValidation from "../../../hooks/UseFormValidation";
import AlertComponent from "../../../components/alerts/AlertComponent";
import {Col, Row} from "react-bootstrap";

function RequestDisplay() {
    const [actionData, setActionData] = useState();
    const pagedRequests = useLoaderData();
    const requests = pagedRequests.content;

    const {globalMessage} = useFormValidation(actionData);

    const {UrlAlertsList: UrlAlertsSuccessList} = useMessageParams(
        [
            {
                messageParam: CLOSE_SUCCESS,
                displayIfSuccess: 'Pomyślnie zamknięto zgłoszenie.'
            },
            {
                messageParam: DELETE_SUCCESS,
                displayIfSuccess: 'Zgłoszenie zostało usunięte pomyślnie.'
            },
        ]
    );

    const {UrlAlertsList: UrlAlertsErrorList} = useMessageParams(
        [
            {
                messageParam: UNKNOWN_ERROR,
                displayIfSuccess: 'Wystąpił nieoczekiwany błąd.'
            },
            {
                messageParam: CLOSE_ERROR_CLOSED,
                displayIfSuccess: 'Nie możesz zamknąć już zamkniętego zgłoszenia.'
            },
            {
                messageParam: CLOSE_ERROR_NOT_FOUND,
                displayIfSuccess: 'Wybrane zgłoszenie nie istnieje.'
            }
        ],
        {
            variant: 'danger'
        }
    );

    if(!requests || requests.length === 0)
        return (
            <>
                <AlertComponent
                    message={globalMessage}
                    showTrigger={actionData}
                    variant='danger'
                    closeDelay={5000}
                    scrollOnTrigger={true}
                />
                {UrlAlertsErrorList}
                {UrlAlertsSuccessList}
                <span>Brak próśb od użytkowników.</span>
            </>
        );

    return (
        <>
            <AlertComponent
                message={globalMessage}
                showTrigger={actionData}
                variant='danger'
                closeDelay={5000}
                scrollOnTrigger={true}
            />
            {UrlAlertsErrorList}
            {UrlAlertsSuccessList}
            <Row className='justify-content-center align-items-center'>
                {
                    requests.map(
                        request => (
                            <Col sm={5} className='mx-2'>
                                <RequestCard
                                    key={request.id}
                                    request={request}
                                    setActionData={setActionData}
                                />
                            </Col>
                        )
                    )
                }
            </Row>
            <PaginationEntity pages={pagedRequests} />
        </>
    );
}

export default RequestDisplay;

export async function loader({request}) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const filteredQueryString = getFilteredQueryString(searchParams, ['page', 'sort', 'size']);

    return await sendDefaultRequest(`user-request${filteredQueryString}`);
}