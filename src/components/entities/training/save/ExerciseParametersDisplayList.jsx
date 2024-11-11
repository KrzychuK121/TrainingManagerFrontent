import {getEntityParamGetter} from "../../../../utils/EntitiesUtils";
import ExerciseParametersDisplay from "./ExerciseParametersDisplay";

function ExerciseParametersDisplayList({parametersData}) {
    const getParametersParam = getEntityParamGetter(parametersData);

    return (
        <>
            <ExerciseParametersDisplay
                label='Serie'
                value={getParametersParam('rounds')}
            />

            <ExerciseParametersDisplay
                label='Powtórzenia'
                value={getParametersParam('repetition')}
            />

            <ExerciseParametersDisplay
                label='Czas wykonania'
                value={getParametersParam('time')}
            />

            <ExerciseParametersDisplay
                label='Obciążenie'
                value={getParametersParam('weights')}
            />
        </>
    );
}

export default ExerciseParametersDisplayList;