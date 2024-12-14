import {useState} from 'react';
import {Button, Table} from 'react-bootstrap';
import {Form as RouterForm, Link, redirect, useLoaderData} from 'react-router-dom';
import AlertComponent from '../../../components/alerts/AlertComponent';
import DeleteModal from '../../../components/entities/crud/DeleteModal';
import SubmitButton from '../../../components/form/SubmitButton';
import useFormValidation from '../../../hooks/UseFormValidation';
import {useMessageParams} from '../../../hooks/UseMessageParam';
import {defaultHeaders, deleteAction, handleResponseUnauthorized, sendDefaultRequest} from '../../../utils/CRUDUtils';
import {DELETE_SUCCESS, DOMAIN, EDIT_SUCCESS, getIdPath} from '../../../utils/URLUtils';

const ROUTINE_NOT_OWNED_OR_ACTIVE = 'routine-not-owned-or-already-active';
const ROUTINE_ACTIVATED = 'routine-activated';

function getColumnsByWeekdays(schedules, weekdays) {
    return weekdays.map(
        ({weekday, weekdayDisplay}) => (
            <td key={weekday}>
                <p>
                    {
                        schedules.hasOwnProperty(weekday)
                            ? (
                                <>
                                    <span>{`Tytuł: ${schedules[weekday].trainingTitle}`}</span>
                                    {'\n'}
                                    <span>{`Opis: ${schedules[weekday].trainingDescription}`}</span>
                                </>
                            )
                            : 'Dzień wolny'
                    }
                </p>
            </td>
        )
    );
}

function getTableRow(plan, weekdays, setActionData) {
    const {id, active, schedules} = plan;
    return (
        <>
            {getColumnsByWeekdays(schedules, weekdays)}
            <td>
                {active ? 'Tak' : 'Nie'}
            </td>
            <td>
                <Link to={`/main/plans/edit/${id}`}>
                    <Button>Edytuj</Button>
                </Link>
                <DeleteModal
                    action={`/main/plans/delete/${id}`}
                    setActionData={setActionData}
                />
                {
                    !active && (
                        <RouterForm
                            action={`/main/plans/${id}`}
                            method='patch'
                        >
                            <SubmitButton
                                display='Aktywuj'
                                submittingDisplay='Aktywowanie rutyny'
                            />
                        </RouterForm>
                    )
                }
            </td>
        </>
    );
}

function getTableContent(plans, weekdays, setActionData) {
    const rows = [];
    for (let i = 0; i < plans.length; i++) {
        rows.push(
            <tr key={`plansRow${i}`}>
                {getTableRow(plans[i], weekdays, setActionData)}
            </tr>
        );
    }
    return rows;
}

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

    const plans = loadedData
        ? loadedData.plans
        : null;
    const weekdays = loadedData
        ? loadedData.weekdays
        : null;

    const {messages: successMessages} = useMessageParams(
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

    if (!plans)
        return <span>Brak rutyn treningowych do wyświetlenia</span>;

    return (
        <>
            <AlertComponent
                message={globalMessage}
                showTrigger={actionData}
                variant='danger'
                closeDelay={5000}
                scrollOnTrigger={true}
            />
            {
                successMessages && successMessages.map(
                    message => (
                        <AlertComponent
                            key={message}
                            message={message}
                            showTrigger={null}
                            closeDelay={4000}
                        />
                    )
                )
            }
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
            <h1>Lista wszystkich planów treningowych</h1>

            <Table
                bordered
                striped
                variant='success'
            >
                <thead>
                <tr>
                    {getTableWeekdaysHeaders(weekdays)}
                    <th>
                        Aktywny?
                    </th>
                    <th>Opcje</th>
                </tr>
                </thead>
                <tbody>
                {getTableContent(plans, weekdays, setActionData)}
                </tbody>
            </Table>
        </>
    );
}

export default TrainingPlanDisplay;

export async function loader() {
    return await sendDefaultRequest('plans');
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

    const handledResponse = await handleResponseUnauthorized(response);
    if (handledResponse)
        return handledResponse;

    if (response.status === 400)
        return redirect(`/main/plans?${ROUTINE_NOT_OWNED_OR_ACTIVE}`);
    if (response.status === 204)
        return redirect(`/main/plans?${ROUTINE_ACTIVATED}`);
}

export async function deleteTrainingRoutineAction({request, params}) {
    return await deleteAction(
        'http://localhost:8080/api/routines',
        '/main/plans',
        request,
        params
    );
}