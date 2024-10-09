import { Table } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';
import AlertComponent from '../../../components/alerts/AlertComponent';
import { sendDefaultRequest } from '../../../utils/FetchUtils';

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

function getTableRow(plan, weekdays) {
    const {active, schedules} = plan;
    return (
        <>
            {getColumnsByWeekdays(schedules, weekdays)}
            <td>
                {active ? 'Tak' : 'Nie'}
            </td>
            <td>
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
                                <form
                                        method="get"
                                        action="#"
                                        sec:authorize="hasRole('ROLE_ADMIN')"
                                        th:action="@{/exercise/delete/{id}(id=${exercise.id})}"
                                >-->
                                    <!-- Modal -->
                                    <!--<div
                                            th:replace="~{defaulttemplate :: modal-delete('delItem' + ${i.index})}"
                                    ></div>
                                    <button
                                            type="button"
                                            class="btn btn-primary"
                                            data-bs-toggle="modal"
                                            th:data-bs-target="'#delItem' + ${i.index}"
                                    >
                                        Usuń
                                    </button> |
                                </form>
                            </fieldset>*/}
            </td>
        </>
    );
}

function getTableContent(plans, weekdays) {
    const rows = [];
    for (let i = 0; i < plans.length; i++) {
        rows.push(
            <tr key={`plansRow${i}`}>
                {getTableRow(plans[i], weekdays)}
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
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {getTableContent(plans, weekdays)}
                </tbody>
            </Table>
        </>
    );
}

export default TrainingPlanDisplay;

export async function loader() {
    return await sendDefaultRequest('plans');
}