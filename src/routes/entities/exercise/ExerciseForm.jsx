import { useEffect, useRef } from 'react';
import { Form as RouterForm, json, Link, redirect, useActionData, useLoaderData, useLocation } from 'react-router-dom';
import AlertComponent from '../../../components/alerts/AlertComponent';
import DefaultFormField from '../../../components/form/DefaultFormField';
import FormField from '../../../components/form/FormField';
import SelectField from '../../../components/form/SelectField';
import SubmitButton from '../../../components/form/SubmitButton';
import useFormValidation from '../../../hooks/UseFormValidation';
import {
    createObjFromEntries,
    filterObject,
    getEntityParamGetter,
    getSelectedIdFrom,
    toSelectFieldData
} from '../../../utils/EntitiesUtils';
import { defaultHeaders, handleResponseUnauthorized } from '../../../utils/FetchUtils';
import defaultClasses from '../../Default.module.css';

function ExerciseForm({method = 'post'}) {
    const actionData = useActionData();
    const loaderData = useLoaderData();
    const location = useLocation();

    const {exercise, allTrainings} = loaderData;
    const bodyParts = loaderData.bodyParts.bodyParts;
    const difficulties = loaderData.difficulties.difficulties;
    const selectTrainings = toSelectFieldData(allTrainings, 'id', 'title');

    const formRef = useRef();

    const message = actionData && actionData.message
        ? actionData.message
        : null;

    useEffect(() => {
        if (message) {
            formRef.current.reset();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [message]);

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

                    <FormField
                        label='Poziom trudności'
                        errorMessages={getValidationMessages('difficulty')}
                    >
                        <SelectField
                            title='Lista rozwijana wyboru poziomu trudności'
                            name='difficulty'
                            {...getValidationProp('difficulty')}
                            options={difficulties}
                            firstElemDisplay='Wybierz poziom trudności'
                            selectedValues={getExerciseParam('difficulty')}
                        />
                    </FormField>

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
    const exerciseId = params.id
        ? `/${params.id}`
        : '';

    const response = await fetch(
        `http://localhost:8080/api/exercise/createModel${exerciseId}`,
        {
            headers: defaultHeaders()
        }
    );

    const handledResponse = handleResponseUnauthorized(response);
    if (handledResponse)
        return handledResponse;

    return await response.json();
}

export const EDIT_SUCCESS = 'edit-success';

export async function action({request, params}) {
    const exerciseId = params.id
        ? `/${params.id}`
        : '';
    const data = await request.formData();
    const dataObject = createObjFromEntries(
        data,
        {
            bodyPart: null,
            repetition: null,
            time: null,
            weights: null,
            difficulty: null
        }
    );
    const toSave = {};

    toSave['toSave'] = filterObject(dataObject, ['trainings']);
    if (dataObject.hasOwnProperty('trainings'))
        toSave['selectedTrainings'] = [...dataObject.trainings];

    const response = await fetch(
        `http://localhost:8080/api/exercise${exerciseId}`,
        {
            method: request.method,
            headers: defaultHeaders(),
            body: JSON.stringify(toSave)
        }
    );

    if (response.status === 204)
        return redirect(`/main/exercise?${EDIT_SUCCESS}`);
    if (response.status !== 201)
        return await response.json();

    return json(
        {message: 'Utworzono nowe ćwiczenie!'},
        {status: 201}
    );
}