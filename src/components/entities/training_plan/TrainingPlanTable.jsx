import TrainingPlanTableRow from "./TrainingPlanTableRow";

function TrainingPlanTable(
    {
        plans,
        weekdays,
        setActionData
    }
) {
    return plans.map(
        plan => (
            <tr key={`plansRow${plan.id}`}>
                <TrainingPlanTableRow
                    plan={plan}
                    weekdays={weekdays}
                    setActionData={setActionData}
                />
            </tr>
        )
    );
}

export default TrainingPlanTable;