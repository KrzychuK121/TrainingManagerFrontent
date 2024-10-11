import { Form as RouterForm, useActionData, useLoaderData } from 'react-router-dom';
import AlertComponent from '../../../components/alerts/AlertComponent';
import DefaultFormField from '../../../components/form/DefaultFormField';
import FormField from '../../../components/form/FormField';
import SelectField from '../../../components/form/SelectField';
import SubmitButton from '../../../components/form/SubmitButton';
import useFormValidation from '../../../hooks/UseFormValidation';
import { getEntityParamGetter, getSelectedIdFrom, toSelectFieldData } from '../../../utils/EntitiesUtils';
import { createModelLoader } from '../../../utils/FetchUtils';
import defaultClasses from '../../Default.module.css';

function TrainingForm({method = 'post'}) {
    const actionData = useActionData();
    const loadedData = useLoaderData();

    const {training, allExercises} = loadedData;
    console.log(loadedData);
    const selectExercises = toSelectFieldData(allExercises, 'id', 'name');
    const message = null;

    const useFormValidationObj = useFormValidation(actionData);
    const {
        globalMessage,
        getValidationProp,
        getValidationMessages
    } = useFormValidationObj;

    const getTrainingParam = getEntityParamGetter(training);

    function getSelectedTrainings() {
        const exercises = getTrainingParam('exercises');
        return getSelectedIdFrom(exercises);
    }

    return (
        <>
            <AlertComponent
                message={message}
                showTrigger={actionData}
                closeDelay={3000}
            />
            <RouterForm method={method}>
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
                            name='exerciseIds'
                            {...getValidationProp('exercises')}
                            options={selectExercises}
                            multiple={true}
                            selectedValues={getSelectedTrainings()}
                        />
                    </FormField>

                    {/*TODO: Add here form for new exercises optionally*/}
                    {/*<button type='submit' name='addExercise'>+</button>*/}
                    {/*<fieldset*/}
                    {/*    th:if='${id == null}'*/}
                    {/*    th:each='exercise, i : *{exercises}'*/}
                    {/*>*/}
                    {/*</fieldset>*/}
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