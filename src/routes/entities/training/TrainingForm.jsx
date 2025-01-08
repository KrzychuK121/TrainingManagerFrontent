import {useEffect, useRef, useState} from 'react';
import {Form as RouterForm, Link, useActionData, useLoaderData, useParams, useSubmit} from 'react-router-dom';
import AlertComponent from '../../../components/alerts/AlertComponent';
import DefaultFormField from '../../../components/form/DefaultFormField';
import FormField from '../../../components/form/FormField';
import SelectField from '../../../components/form/SelectField';
import SubmitButton from '../../../components/form/SubmitButton';
import useClearForm from '../../../hooks/UseClearForm';
import useFormValidation from '../../../hooks/UseFormValidation';
import {createModelLoader, defaultHeaders, sendSaveRequest} from '../../../utils/CRUDUtils';
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
import ToggleField from "../../../components/form/ToggleField";
import {DOMAIN, EDIT_ACCESS_DENIED} from "../../../utils/URLUtils";
import {useMessageParams} from "../../../hooks/UseMessageParam";
import ConfirmModal from "../../../components/entities/crud/ConfirmModal";
import {isUser} from "../../../utils/RoleUtils";

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
    trainingExercises,
    selectedIds
) {
    if(selectedIds)
        return trainingExercises.filter(
            exercise => selectedIds
                .includes(exercise.id)
        );
    return null;
}

function TrainingForm({method = 'post'}) {
    const {id} = useParams();
    const submit = useSubmit();
    const actionData = useActionData();
    const loadedData = useLoaderData();

    const [showPublifyTrainingConfirmation, setShowPublifyTrainingConfirmation] = useState(false);

    const {training, allExercises} = loadedData;
    const trainingExercises = training && training.hasOwnProperty('exercises')
        ? training.exercises
        : null;
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
            trainingExercises,
            getSelectedExercisesIds()
        )
    );

    const message = actionData && actionData.message
        ? actionData.message
        : null;
    const {UrlAlertsList} = useMessageParams(
        [
            {
                messageParam: EDIT_ACCESS_DENIED,
                displayIfSuccess: 'Nie możesz edytować wybranego treningu.'
            }
        ],
        {
            variant: 'danger'
        }
    );
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
                trainingExercises,
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

    function getExerciseById(selectedId) {
        const toFind = (exercise) => exercise.id === selectedId;
        if(trainingExercises)
            return trainingExercises.find(toFind) || allExercises.find(toFind);
        return allExercises.find(toFind);
    }

    function handleExerciseSelect(event) {
        const selectedId = parseInt(event.target.value);
        if(selectedId === 0)
            return;
        setSelectedExercises(
            selectedExercises === null
                ? [
                    getExerciseById(selectedId)
                ]
                : [
                    ...selectedExercises,
                    getExerciseById(selectedId)
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

    /**
     * This function checks if training to edit contains any private exercise then show modal to ask user
     * if he wants to make them public too.
     *
     * @param formData data from form
     * @returns {Promise<boolean>} True if submit process can proceed. Otherwise, false.
     */
    async function confirmIfPublicExercisesFound(formData) {
        if(
            !id
            || formData.get('trainingPrivate') !== 'false'
        ) {
            return true;
        }

        const response = await fetch(
            `${DOMAIN}/training/${id}/hasPrivateExercises`,
            {
                headers: defaultHeaders()
            }
        );
        const hasPrivateExercises = response.json();

        if(!hasPrivateExercises) {
            return true;
        }

        setShowPublifyTrainingConfirmation(true);
        return false;
    }

    function processDataAndSubmitForm(formData) {
        const EXERCISES_ATTRIBUTE =  'exercises';

        if (selectedExercises) {
            formData.delete(EXERCISES_ATTRIBUTE);
            selectedExercises.forEach(
                exercise => formData.append(EXERCISES_ATTRIBUTE, `${exercise.id}`)
            )
        }

        submit(formData, {method: method});
    }

    async function handleFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const shouldProceed = await confirmIfPublicExercisesFound(formData);
        if(!shouldProceed)
            return;
        processDataAndSubmitForm(formData);
    }

    async function handleConfirmPublifyingExercises(event) {
        event.preventDefault();
        const formData = new FormData(formRef.current);
        processDataAndSubmitForm(formData);
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
            {UrlAlertsList}
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
                    <Link to='/main/training'>Powrót do treningów</Link>
                    <ConfirmModal
                        body={'Ten trening posiada prywatne ćwiczenia. Czy chcesz upublicznić trening wraz z ćwiczeniami?'}
                        show={showPublifyTrainingConfirmation}
                        setShow={setShowPublifyTrainingConfirmation}
                        onConfirm={handleConfirmPublifyingExercises}
                    />
                    {
                        isUser() && (
                            <ToggleField
                                name='trainingPrivate'
                                label='Prywatny'
                                defaultValue={Boolean(getTrainingParam('trainingPrivate'))}
                            />
                        )
                    }
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
                        disabled={showPublifyTrainingConfirmation}
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
        `/main/training/create?${EDIT_ACCESS_DENIED}`,
        params,
        'training'
    );
}

export async function action({request, params}) {
    const data = await request.formData();
    const dataObject = createObjFromEntries(
        data,
        null,
        [
            'exercises'
        ]
    );
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