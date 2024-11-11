import {useEffect, useRef, useState} from 'react';
import {Form as RouterForm, useActionData, useLoaderData, useSubmit} from 'react-router-dom';
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
    toSelectFieldData,
    toSelectFieldObject
} from '../../../utils/EntitiesUtils';
import defaultClasses from '../../Default.module.css';
import CustomParametersList from "../../../components/entities/training/save/CustomParametersList";
import {PARAMETERS_PREFIX} from "../../../components/entities/exercise/ExerciseParametersFields";

const SELECT_VALUE_PROP = 'id';
const SELECT_DESC_PROP = 'name';

function initExerciseOptionItems(
    allExercises,
    selectedIds
) {
    const toMap = selectedIds
        ? allExercises.filter(
            exercise => !selectedIds
                .includes(exercise.id)
        )
        : allExercises;
    return toSelectFieldData(toMap, SELECT_VALUE_PROP, SELECT_DESC_PROP);
}

function initSelectedExercises(
    allExercises,
    selectedIds
) {
    if(selectedIds)
        return allExercises.filter(
            exercise => selectedIds
                .includes(exercise.id)
        );
    return null;
}

function TrainingForm({method = 'post'}) {
    const submit = useSubmit();
    const actionData = useActionData();
    const loadedData = useLoaderData();

    const {training, allExercises} = loadedData;
    const getTrainingParam = getEntityParamGetter(training);

    function getSelectedExercisesIds() {
        const exercises = getTrainingParam('exercises');
        return getSelectedIdFrom(exercises);
    }

    const [exerciseOptionItems, setExerciseOptionItems] = useState(
        initExerciseOptionItems(
            allExercises,
            getSelectedExercisesIds()
        )
    );

    const [selectedExercises, setSelectedExercises] = useState(
        initSelectedExercises(
            allExercises,
            getSelectedExercisesIds()
        )
    );

    const message = actionData && actionData.message
        ? actionData.message
        : null;
    const formRef = useRef();

    useClearForm(message, formRef);

    useEffect(() => {
        if(!message)
            return;
        setExerciseOptionItems(
            initExerciseOptionItems(
                allExercises,
                getSelectedExercisesIds()
            )
        );
        setSelectedExercises(
            initSelectedExercises(
                allExercises,
                getSelectedExercisesIds()
            )
        );
    }, [message]);

    const useFormValidationObj = useFormValidation(actionData);
    const {
        globalMessage,
        getValidationProp,
        getValidationMessages
    } = useFormValidationObj;

    function handleExerciseSelect(event) {
        const selectedId = parseInt(event.target.value);
        if(selectedId === 0)
            return;
        setSelectedExercises(
            selectedExercises === null
                ? [
                    allExercises.find(exercise => exercise.id === selectedId)
                ]
                : [
                    ...selectedExercises,
                    allExercises.find(exercise => exercise.id === selectedId)
                ]
        );
        setExerciseOptionItems(exerciseOptionItems.filter(selectData => selectData.value !== selectedId));
    }

    function handleExerciseUnchecked(exerciseId) {
        if(!selectedExercises)
            return;

        setSelectedExercises(
            [
                ...selectedExercises.filter(
                    exercise => exercise.id !== exerciseId
                )
            ]
        );

        setExerciseOptionItems(
            [
                ...(
                    exerciseOptionItems === null
                    ? []
                    : exerciseOptionItems
                ),
                toSelectFieldObject(
                    allExercises.find(exercise => exercise.id === exerciseId),
                    SELECT_VALUE_PROP,
                    SELECT_DESC_PROP
                )
            ]
        );
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        const EXERCISES_ATTRIBUTE =  'exercises';
        const formData = new FormData(event.target);

        if(selectedExercises) {
            formData.delete(EXERCISES_ATTRIBUTE);
            selectedExercises.forEach(
                exercise => formData.append(EXERCISES_ATTRIBUTE, `${exercise.id}`)
            )
        }

        submit(formData, {method: method});
    }

    return (
        <>
            <AlertComponent
                message={globalMessage}
                showTrigger={actionData}
                variant='danger'
                closeDelay={5000}
                scrollOnTrigger={true}
            />
            <AlertComponent
                message={message}
                showTrigger={actionData}
                closeDelay={3000}
            />
            <RouterForm
                method={method}
                ref={formRef}
                onSubmit={handleFormSubmit}
            >
                <fieldset className={defaultClasses.authForms}>
                    <legend>Stwórz nowy trening</legend>
                    <DefaultFormField
                        name='title'
                        label='Tytuł'
                        useFormValidationObj={useFormValidationObj}
                        defaultValue={getTrainingParam('title')}
                    />

                    <DefaultFormField
                        name='description'
                        label='Opis'
                        useFormValidationObj={useFormValidationObj}
                        defaultValue={getTrainingParam('description')}
                    />
                    <FormField
                        label='Lista ćwiczeń do przypisania'
                        errorMessages={getValidationMessages('exercises')}
                    >
                        <SelectField
                            title='Lista rozwijana wyboru ćwiczeń'
                            name='exercises'
                            firstElemDisplay='Wybierz ćwiczenie'
                            {...getValidationProp('exercises')}
                            options={exerciseOptionItems}
                            onChange={handleExerciseSelect}
                        />
                    </FormField>

                    <CustomParametersList
                        selectedExercises={selectedExercises}
                        useFormValidationObj={useFormValidationObj}
                        handleExerciseUnchecked={handleExerciseUnchecked}
                    />

                    {/*TODO: Add here form for new exercises optionally*/}
                    <SubmitButton
                        display='Zapisz'
                        submittingDisplay='Zapisuję'
                    />
                </fieldset>
            </RouterForm>
        </>
    );
}

export default TrainingForm;

export async function loader({params}) {
    return await createModelLoader(
        'training/createModel',
        '/main/training/create',
        params,
        'training'
    );
}

export async function action({request, params}) {
    const data = await request.formData();
    const dataObject = createObjFromEntries(data);
    const toSave = {};

    toSave['toSave'] = filterObject(dataObject, ['exercises']);
    if (dataObject.hasOwnProperty('exercises') && dataObject.exercises) {
        if(!Array.isArray(dataObject.exercises))
            dataObject.exercises = [...dataObject.exercises];
        const selectedExercises = [];
        dataObject.exercises.forEach(
            exerciseId => {
                const parameters = filterAndCollectProps(dataObject, `${PARAMETERS_PREFIX}${exerciseId}.`);
                const selectedExerciseWrite = {
                    selectedId: exerciseId,
                    parameters: Object.keys(parameters).length !== 0 ? parameters : null
                };
                selectedExercises.push(selectedExerciseWrite);
            }
        )
        toSave.selectedExercises = selectedExercises;
    }

    return await sendSaveRequest(
        toSave,
        'training',
        '/main/training',
        params,
        request,
        'nowy trening'
    );
}