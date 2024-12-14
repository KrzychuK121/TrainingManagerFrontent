import TrainingPlanerForm from "../../../components/calculators/assistant/write/TrainingPlanerForm";
import {useActionData} from "react-router-dom";
import TrainingPlanerDisplay from "../../../components/calculators/assistant/read/TrainingPlanerDisplay";

function TrainingPlaner() {
    const actionData = useActionData();
    const retrievedData = actionData && actionData.hasOwnProperty('schedules')
        ? actionData
        : null;

    if(!retrievedData)
        return <TrainingPlanerForm />;

    return <TrainingPlanerDisplay retrievedData={retrievedData} />;
}

export default TrainingPlaner;