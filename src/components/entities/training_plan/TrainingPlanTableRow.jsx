import {Form as RouterForm, Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import DeleteModal from "../crud/DeleteModal";
import SubmitButton from "../../form/SubmitButton";

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

function TrainingPlanTableRow(
    {
        plan,
        weekdays,
        setActionData
    }
) {
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

export default TrainingPlanTableRow;