import TrainingPlanerForm, {
    action as trainingPlanerFormAction
} from "../../../components/calculators/assistant/write/TrainingPlanerForm";
import {useActionData} from "react-router-dom";
import TrainingPlanerDisplay, {
    action as trainingPlanerDisplayAction
} from "../../../components/calculators/assistant/read/TrainingPlanerDisplay";

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

export const ACTION_TYPE_NAME = 'action';

export async function action({request}) {
    const data = await request.formData();
    const action = data.get(ACTION_TYPE_NAME);
    data.delete(ACTION_TYPE_NAME);
    switch (action) {
        case 'plan':
            return await trainingPlanerFormAction({data, request});
        case 'create':
            return await trainingPlanerDisplayAction({data, request});
    }
}