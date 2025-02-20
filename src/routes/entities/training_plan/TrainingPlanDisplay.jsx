import {useState} from 'react';
import {Table} from 'react-bootstrap';
import {redirect, useLoaderData} from 'react-router-dom';
import AlertComponent from '../../../components/alerts/AlertComponent';
import useFormValidation from '../../../hooks/UseFormValidation';
import {useMessageParams} from '../../../hooks/UseMessageParam';
import {defaultAuthHandler, defaultHeaders, deleteAction, sendDefaultRequest} from '../../../utils/CRUDUtils';
import {DELETE_SUCCESS, DOMAIN, EDIT_SUCCESS, getFilteredQueryString, getIdPath} from '../../../utils/URLUtils';
import {NEW_ROUTINE_SAVED} from "../../../components/calculators/assistant/read/TrainingPlanerDisplay";
import {getEntityParamGetter} from "../../../utils/EntitiesUtils";
import TrainingPlanTable from "../../../components/entities/training_plan/TrainingPlanTable";
import PaginationEntity from "../../../components/entities/crud/PaginationEntity";
import SortAnchor from "../../../components/entities/crud/SortAnchor";
import {isAtLeastModerator} from "../../../utils/RoleUtils";

const ROUTINE_NOT_OWNED_OR_ACTIVE = 'routine-not-owned-or-already-active';
const ROUTINE_ACTIVATED = 'routine-activated';

function getTableWeekdaysHeaders(weekdays) {
    return weekdays.map(
        ({weekday, weekdayDisplay}) => (
            <th
                key={weekday}
                className='text-capitalize'
            >
                {weekdayDisplay}
            </th>
        )
    );
}

function TrainingPlanDisplay() {
    const loadedData = useLoaderData();
    const [actionData, setActionData] = useState();

    const getFromLoadedData = getEntityParamGetter(loadedData);
    const plansPaged = getFromLoadedData('plans');
    const plans = plansPaged && plansPaged.hasOwnProperty('content')
        ? plansPaged.content
        : null;
    const weekdays = getFromLoadedData('weekdays');

    const {messages: successMessages, UrlAlertsList: UrlAlertsSuccessList} = useMessageParams(
        [
            {
                messageParam: EDIT_SUCCESS,
                displayIfSuccess: 'Rutyna treningowa została edytowana pomyślnie.'
            },
            {
                messageParam: ROUTINE_ACTIVATED,
                displayIfSuccess: 'Rutyna treningowa została aktywowana pomyślnie.'
            },
            {
                messageParam: DELETE_SUCCESS,
                displayIfSuccess: 'Rutyna treningowa została usunięta pomyślnie.'
            },
            {
                messageParam: NEW_ROUTINE_SAVED,
                displayIfSuccess: 'Nowa rutyna treningowa została stworzona z pomocą asystenta treningowego.'
            }
        ]
    );

    const {messages: errorMessages} = useMessageParams(
        [
            {
                messageParam: ROUTINE_NOT_OWNED_OR_ACTIVE,
                displayIfSuccess: 'Nie jesteś właścicielem rutyny, którą próbujesz aktywować lub rutyna jest już  aktywna.'
            }
        ]
    );

    const {globalMessage} = useFormValidation(actionData);

    if (!plans || (Array.isArray(plans) && plans.length === 0))
        return (
            <>
                <span className='h2'>Brak rutyn treningowych do wyświetlenia</span>
                <hr />
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
            {UrlAlertsSuccessList}
            {
                errorMessages && errorMessages.map(
                    message => (
                        <AlertComponent
                            key={message}
                            message={message}
                            showTrigger={null}
                            closeDelay={4000}
                            variant='danger'
                        />
                    )
                )
            }
            <h1>
                {
                    isAtLeastModerator()
                        ? 'Lista wszystkich planów treningowych użytkowników'
                        : 'Twoje plany treningowe'
                }
            </h1>

            <Table
                bordered
                striped
                responsive={true}
                variant='success'
            >
                <thead>
                    <tr>
                        {getTableWeekdaysHeaders(weekdays)}
                        <th>
                            <SortAnchor
                                display='Aktywny?'
                                field='active'
                            />
                        </th>
                        {isAtLeastModerator() && <th>Właściciel rutyny</th>}
                        <th>Opcje</th>
                    </tr>
                </thead>
                <tbody>
                    <TrainingPlanTable
                        plans={plans}
                        weekdays={weekdays}
                        setActionData={setActionData}
                    />
                </tbody>
            </Table>
            <PaginationEntity pages={plansPaged} />
        </>
    );
}

export default TrainingPlanDisplay;

export async function loader({request}) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const filteredQueryString = getFilteredQueryString(searchParams, ['page', 'sort', 'size']);
    return await sendDefaultRequest(`plans${filteredQueryString}`);
}

export async function switchActiveAction({request, params}) {
    const routineId = getIdPath(params);
    const response = await fetch(
        `${DOMAIN}/routines${routineId}`,
        {
            method: request.method,
            headers: defaultHeaders()
        }
    );

    const handledResponse = await defaultAuthHandler(response);
    if (handledResponse)
        return handledResponse;

    if (response.status === 400)
        return redirect(`/main/plans?${ROUTINE_NOT_OWNED_OR_ACTIVE}`);
    if (response.status === 204)
        return redirect(`/main/plans?${ROUTINE_ACTIVATED}`);
}

export async function deleteTrainingRoutineAction({request, params}) {
    return await deleteAction(
        `${DOMAIN}/routines`,
        '/main/plans',
        request,
        params
    );
}