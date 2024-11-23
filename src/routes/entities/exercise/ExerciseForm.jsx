import {useRef} from 'react';
import {Form as RouterForm, Link, useActionData, useLoaderData} from 'react-router-dom';
import AlertComponent from '../../../components/alerts/AlertComponent';
import DefaultFormField from '../../../components/form/DefaultFormField';
import FormField from '../../../components/form/FormField';
import SelectField from '../../../components/form/SelectField';
import SubmitButton from '../../../components/form/SubmitButton';
import useClearForm from '../../../hooks/UseClearForm';
import useFormValidation from '../../../hooks/UseFormValidation';
import {createModelLoader, sendSaveRequest} from '../../../utils/CRUDUtils';
import {
    createObjFromEntries,
    filterAndCollectProps,
    filterObject,
    getEntityParamGetter,
    getSelectedIdFrom,
    toSelectFieldData
} from '../../../utils/EntitiesUtils';
import defaultClasses from '../../Default.module.css';
import ExerciseParametersFields, {
    getExerciseParametersData
} from "../../../components/entities/exercise/ExerciseParametersFields";
import ToggleField from "../../../components/form/ToggleField";
import {EDIT_ACCESS_DENIED} from "../../../utils/URLUtils";
import {useMessageParams} from "../../../hooks/UseMessageParam";

function ExerciseForm({method = 'post'}) {
    const actionData = useActionData();
    const loaderData = useLoaderData();

    const {exercise, allTrainings} = loaderData;
    const bodyParts = loaderData.bodyParts.bodyParts;
    const selectTrainings = toSelectFieldData(allTrainings, 'id', 'title');

    const formRef = useRef();

    const {messages: errorMessages, UrlAlertsList} = useMessageParams(
        [
            {
                messageParam: EDIT_ACCESS_DENIED,
                displayIfSuccess: 'Nie możesz edytować wybranego ćwiczenia.'
            }
        ],
        {
            variant: 'danger'
        }
    );

    const message = actionData && actionData.message
        ? actionData.message
        : null;

    useClearForm(message, formRef);

    const useFormValidationObj = useFormValidation(actionData);
    const {
        globalMessage,
        getValidationProp,
        getValidationMessages
    } = useFormValidationObj;


    const getExerciseParam = getEntityParamGetter(exercise);
    const parametersData = getExerciseParametersData(exercise);

    function getSelectedTrainings() {
        const trainings = getExerciseParam('trainings');
        return getSelectedIdFrom(trainings);
    }

    return (
        <>
            {UrlAlertsList}
            <AlertComponent
                message={message}
                showTrigger={actionData}
                closeDelay={3000}
            />
            <RouterForm
                method={method}
                ref={formRef}
            >
                <fieldset className={defaultClasses.authForms}>
                    <legend>Stwórz nowe ćwiczenie</legend>
                    <Link to='/main/exercise'>Powrót do ćwiczeń</Link>

                    <ToggleField
                        name='exercisePrivate'
                        label='Prywatny'
                        defaultValue={Boolean(getExerciseParam('exercisePrivate'))}
                        disabled={
                            exercise
                            && Boolean(getExerciseParam('exercisePrivate'))
                        }
                    />

                    <DefaultFormField
                        label='Nazwa'
                        name='name'
                        useFormValidationObj={useFormValidationObj}
                        defaultValue={getExerciseParam('name')}
                    />

                    <DefaultFormField
                        label='Opis'
                        name='description'
                        useFormValidationObj={useFormValidationObj}
                        defaultValue={getExerciseParam('description')}
                    />
                    <FormField
                        label='Trenowana część ciała'
                        errorMessages={getValidationMessages('bodyPart')}
                    >
                        <SelectField
                            title='Lista rozwijana wyboru trenowanej części ciała'
                            name='bodyPart'
                            {...getValidationProp('bodyPart')}
                            options={bodyParts}
                            firstElemDisplay='Wybierz część ciała'
                            selectedValues={getExerciseParam('bodyPart')}
                        />
                    </FormField>

                    <ExerciseParametersFields
                        parametersData={parametersData}
                        useFormValidationObj={useFormValidationObj}
                    />

                    <DefaultFormField
                        label='Domyślne spalanie kaloryczne'
                        name='defaultBurnedKcal'
                        useFormValidationObj={useFormValidationObj}
                        defaultValue={getExerciseParam('defaultBurnedKcal')}
                        type='number'
                    />

                    <FormField
                        label='Lista treningów do przypisania'
                        errorMessages={getValidationMessages('trainings')}
                    >
                        <SelectField
                            title='Lista rozwijana wyboru treningu'
                            name='trainings'
                            {...getValidationProp('trainings')}
                            options={selectTrainings}
                            multiple={true}
                            selectedValues={getSelectedTrainings()}
                        />
                    </FormField>

                    <SubmitButton
                        display='Zapisz'
                        submittingDisplay='Zapisuję'
                    />
                    <Link to='/main/exercise'>Powrót do ćwiczeń</Link>
                </fieldset>
            </RouterForm>
        </>
    );
}

export default ExerciseForm;

export async function loader({params}) {
    return await createModelLoader(
        'exercise/createModel',
        `/main/exercise/create?${EDIT_ACCESS_DENIED}`,
        params,
        'exercise'
    );
}

export async function action({request, params}) {
    const PARAMETERS_PREFIX = 'parameters.';
    const data = await request.formData();
    const dataObject = createObjFromEntries(
        data,
        {
            bodyPart: null,
            repetition: null,
            time: null,
            weights: null,
            defaultBurnedKcal: null
        },
        ['trainings']
    );
    const toSave = {};

    toSave['toSave'] = filterObject(dataObject, ['trainings', PARAMETERS_PREFIX]);
    if (dataObject.hasOwnProperty('trainings'))
        toSave['selectedTrainings'] = [...dataObject.trainings];

    toSave['toSave'].parameters = filterAndCollectProps(dataObject, PARAMETERS_PREFIX);

    return await sendSaveRequest(
        toSave,
        'exercise',
        '/main/exercise',
        params,
        request,
        'nowe ćwiczenie'
    );
}