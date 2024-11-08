import { useRef } from 'react';
import { Form as RouterForm, Link, useActionData, useLoaderData, useLocation } from 'react-router-dom';
import AlertComponent from '../../../components/alerts/AlertComponent';
import DefaultFormField from '../../../components/form/DefaultFormField';
import FormField from '../../../components/form/FormField';
import SelectField from '../../../components/form/SelectField';
import SubmitButton from '../../../components/form/SubmitButton';
import useClearForm from '../../../hooks/UseClearForm';
import useFormValidation from '../../../hooks/UseFormValidation';
import { createModelLoader, sendSaveRequest } from '../../../utils/CRUDUtils';
import {
    createObjFromEntries,
    filterObject,
    getEntityParamGetter,
    getSelectedIdFrom,
    toSelectFieldData
} from '../../../utils/EntitiesUtils';
import defaultClasses from '../../Default.module.css';

function ExerciseForm({method = 'post'}) {
    const actionData = useActionData();
    const loaderData = useLoaderData();
    const location = useLocation();

    const {exercise, allTrainings} = loaderData;
    const bodyParts = loaderData.bodyParts.bodyParts;
    const selectTrainings = toSelectFieldData(allTrainings, 'id', 'title');

    const formRef = useRef();

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

    function getSelectedTrainings() {
        const trainings = getExerciseParam('trainings');
        return getSelectedIdFrom(trainings);
    }

    return (
        <>
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

                    <DefaultFormField
                        label='Serie'
                        name='rounds'
                        useFormValidationObj={useFormValidationObj}
                        defaultValue={getExerciseParam('rounds')}
                        type='number'
                    />

                    <DefaultFormField
                        label='Powtórzenia'
                        name='repetition'
                        useFormValidationObj={useFormValidationObj}
                        defaultValue={getExerciseParam('repetition')}
                        type='number'
                        helperText='Jeśli ćwiczenie polegają długości wykonywania, zostaw puste pole
                        lub wpisz 0'
                    />

                    <DefaultFormField
                        label='Czas wykonania'
                        name='time'
                        useFormValidationObj={useFormValidationObj}
                        defaultValue={getExerciseParam('time')}
                        helperText='Jeśli ćwiczenia polegają na ilości powtórzeń, możesz zostawić
                        to pole puste (lub wpisz przewidywaną długość treningu)'
                    />

                    <DefaultFormField
                        label='Obciążenie'
                        name='weights'
                        useFormValidationObj={useFormValidationObj}
                        defaultValue={getExerciseParam('weights')}
                        type='number'
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
        '/main/training/create',
        params,
        'exercise'
    );
}

export async function action({request, params}) {
    const data = await request.formData();
    const dataObject = createObjFromEntries(
        data,
        {
            bodyPart: null,
            repetition: null,
            time: null,
            weights: null,
            defaultBurnedKcal: null
        }
    );
    const toSave = {};

    toSave['toSave'] = filterObject(dataObject, ['trainings']);
    if (dataObject.hasOwnProperty('trainings'))
        toSave['selectedTrainings'] = [...dataObject.trainings];

    return await sendSaveRequest(
        toSave,
        'exercise',
        '/main/exercise',
        params,
        request,
        'nowe ćwiczenie'
    );
}