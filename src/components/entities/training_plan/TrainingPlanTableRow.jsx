import {Form as RouterForm} from "react-router-dom";
import DeleteModal from "../crud/DeleteModal";
import EditButton from "../crud/EditButton";
import SubmitButtonIcon from "../../form/SubmitButtonIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar as faStarSolid} from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-regular-svg-icons";
import {isAtLeastModerator, isUser} from "../../../utils/RoleUtils";

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
                {
                isUser() && !active && (
                        <RouterForm
                            action={`/main/plans/${id}`}
                            method='patch'
                        >
                            <SubmitButtonIcon
                                tooltip='Aktywuj'
                                display={<FontAwesomeIcon icon={faStar} />}
                                hover={<FontAwesomeIcon icon={faStarSolid} />}
                                className='m-1'
                            />
                        </RouterForm>
                    )
                }
                <EditButton moveTo={`/main/plans/edit/${id}`}/>
                <DeleteModal
                    action={`/main/plans/delete/${id}`}
                    setActionData={setActionData}
                />
            </td>
        </>
    );
}

export default TrainingPlanTableRow;