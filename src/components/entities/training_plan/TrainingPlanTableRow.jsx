import {isAtLeastModerator} from "../../../utils/RoleUtils";
import TrainingPlanOptions from "./TrainingPlanOptions";

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
    const {
        id,
        active,
        owner,
        schedules
    } = plan;
    return (
        <>
            {getColumnsByWeekdays(schedules, weekdays)}
            <td>
                {active ? 'Tak' : 'Nie'}
            </td>
            {
                isAtLeastModerator() && (
                    <td>
                        {owner.username}
                    </td>
                )
            }
            <td>
                <TrainingPlanOptions
                    plan={plan}
                    setActionData={setActionData}
                />
            </td>
        </>
    );
}

export default TrainingPlanTableRow;