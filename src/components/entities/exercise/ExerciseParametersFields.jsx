import DefaultFormField from "../../form/DefaultFormField";
import {getEntityParamGetter} from "../../../utils/EntitiesUtils";

export const PARAMETERS_PREFIX = 'parameters.';

export function getExerciseParametersData(exercise) {
    const getExerciseParams = getEntityParamGetter(exercise);

    return {
        rounds: getExerciseParams('rounds'),
        repetition: getExerciseParams('repetition'),
        weights: getExerciseParams('weights'),
        time: getExerciseParams('time')
    }
}

function ExerciseParametersFields(
    {
        parametersData,
        parametersPrefix = PARAMETERS_PREFIX,
        useFormValidationObj
    }
) {
    const getParametersParam = getEntityParamGetter(parametersData);

    return (
        <>
            <DefaultFormField
                label='Serie'
                name={`${parametersPrefix}rounds`}
                useFormValidationObj={useFormValidationObj}
                defaultValue={getParametersParam('rounds')}
                type='number'
            />

            <DefaultFormField
                label='Powtórzenia'
                name={`${parametersPrefix}repetition`}
                useFormValidationObj={useFormValidationObj}
                defaultValue={getParametersParam('repetition')}
                type='number'
                helperText='Jeśli ćwiczenie polegają długości wykonywania, zostaw puste pole
                        lub wpisz 0'
            />

            <DefaultFormField
                label='Czas wykonania'
                name={`${parametersPrefix}time`}
                useFormValidationObj={useFormValidationObj}
                defaultValue={getParametersParam('time')}
                helperText='Jeśli ćwiczenia polegają na ilości powtórzeń, możesz zostawić
                        to pole puste (lub wpisz przewidywaną długość treningu)'
            />

            <DefaultFormField
                label='Obciążenie'
                name={`${parametersPrefix}weights`}
                useFormValidationObj={useFormValidationObj}
                defaultValue={getParametersParam('weights')}
                type='number'
            />
        </>
    );
}

export default ExerciseParametersFields;