import TrainingPlanTableRow from "./TrainingPlanTableRow";
import {Table} from "react-bootstrap";
import SortAnchor from "../crud/SortAnchor";
import {isAtLeastModerator} from "../../../utils/RoleUtils";

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

function TrainingPlanTable(
    {
        plans,
        weekdays,
        setActionData
    }
) {
    return (
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
                {
                    plans.map(
                        plan => (
                            <tr key={`plansRow${plan.id}`}>
                                <TrainingPlanTableRow
                                    plan={plan}
                                    weekdays={weekdays}
                                    setActionData={setActionData}
                                />
                            </tr>
                        )
                    )
                }
            </tbody>
        </Table>
    );
}

export default TrainingPlanTable;