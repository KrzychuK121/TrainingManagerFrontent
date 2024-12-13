import TrainingPlanerForm from "../../../components/calculators/assistant/write/TrainingPlanerForm";
import {useActionData} from "react-router-dom";

function TrainingPlaner() {
    const actionData = useActionData();
    const schedules = actionData.hasOwnProperty('schedules')
        ? actionData['schedules']
        : null;
    console.log(actionData);

    if(!schedules)
        return <TrainingPlanerForm />;

    return (
        <>
        </>
    );
}

export default TrainingPlaner;