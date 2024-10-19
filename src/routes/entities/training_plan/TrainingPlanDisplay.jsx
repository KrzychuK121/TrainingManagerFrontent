import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';
import AlertComponent from '../../../components/alerts/AlertComponent';
import DeleteModal from '../../../components/entities/crud/DeleteModal';
import useFormValidation from '../../../hooks/UseFormValidation';
import { useMessageParams } from '../../../hooks/UseMessageParam';
import { deleteAction, sendDefaultRequest } from '../../../utils/CRUDUtils';
import { DELETE_SUCCESS, EDIT_SUCCESS } from '../../../utils/URLUtils';

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
                <DeleteModal
                    action={`/main/plans/delete/${id}`}
                    setActionData={setActionData}
                />
                {/*<fieldset>
                    <form
                            method="get"
                            action="#"
                            th:action="@{/exercise/edit/{id}(id=${exercise.id})}"
                    >
                        <button
                                type="submit"
                                class="btn btn-primary"
                        >
                            Edytuj
                        </button> |
                    </form>
                </fieldset>*/}
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

    if (!plans)
        return <span>Brak rutyn treningowych do wyświetlenia</span>;

    return (
        <>
            <AlertComponent
                message={null}
                showTrigger={null}
            />
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

export async function deleteTrainingRoutineAction({request, params}) {
    return await deleteAction(
        'http://localhost:8080/api/routines',
        '/main/plans',
        request,
        params
    );
}