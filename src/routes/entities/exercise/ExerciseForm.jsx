import { Form as RouterForm, Link, useLoaderData } from 'react-router-dom';
import AlertComponent from '../../../components/alerts/AlertComponent';
import DefaultFormField from '../../../components/form/DefaultFormField';
import FormField from '../../../components/form/FormField';
import SelectField from '../../../components/form/SelectField';
import SubmitButton from '../../../components/form/SubmitButton';
import { injectToken } from '../../../utils/AuthUtils';
import { createObjFromEntries } from '../../../utils/EntitiesUtils';
import defaultClasses from '../../Default.module.css';


function ExerciseForm() {
    const loaderData = useLoaderData();
    const {exercise, allTrainings} = loaderData;
    const bodyParts = loaderData.bodyParts.bodyParts;
    const difficulties = loaderData.difficulties.difficulties;
    const selectTrainings = allTrainings.map(
        training => ({
            value: training.id,
            description: training.title
        })
    );

    const message = loaderData && loaderData.message
        ? loaderData.message
        : null;

    function getExerciseParam(param) {
        if (!exercise || !exercise.hasOwnProperty(param))
            return '';
        return exercise[param];
    }

    function getSelectedTrainings() {
        const trainings = getExerciseParam('trainings');
        if (trainings === '')
            return null;

        return trainings.map(
            training => training.id
        );
    }

    return (
        <>
            <AlertComponent
                message={message}
                showTrigger={loaderData}
                closeDelay={3000}
            />
            <RouterForm
                action='#'
                method='post'
            >
                <fieldset className={defaultClasses.authForms}>
                    <legend>Stwórz nowe ćwiczenie</legend>
                    <Link to='/main/exercise'>Powrót do ćwiczeń</Link>

                    <DefaultFormField
                        label='Nazwa'
                        name='name'
                        defaultValue={getExerciseParam('name')}
                    />

                    <DefaultFormField
                        label='Opis'
                        name='description'
                        defaultValue={getExerciseParam('description')}
                    />

                    <FormField label='Trenowana część ciała'>
                        <SelectField
                            title='Lista rozwijana wyboru trenowanej części ciała'
                            name='bodyPart'
                            options={bodyParts}
                            firstElemDisplay='Wybierz część ciała'
                            selectedValues={getExerciseParam('bodyPart')}
                        />
                    </FormField>

                    <DefaultFormField
                        label='Serie'
                        name='rounds'
                        defaultValue={getExerciseParam('rounds')}
                    />

                    <DefaultFormField
                        label='Powtórzenia'
                        name='repetition'
                        defaultValue={getExerciseParam('repetition')}
                        helperText='Jeśli ćwiczenie polegają długości wykonywania, zostaw puste pole
                        lub wpisz 0'
                    />

                    <DefaultFormField
                        label='Czas wykonania'
                        name='time'
                        defaultValue={getExerciseParam('time')}
                        helperText='Jeśli ćwiczenia polegają na ilości powtórzeń, możesz zostawić
                        to pole puste (lub wpisz przewidywaną długość treningu)'
                    />

                    <DefaultFormField
                        label='Obciążenie'
                        name='weights'
                        defaultValue={getExerciseParam('weights')}
                    />

                    <FormField label='Poziom trudności'>
                        <SelectField
                            title='Lista rozwijana wyboru poziomu trudności'
                            name='difficulty'
                            options={difficulties}
                            firstElemDisplay='Wybierz poziom trudności'
                            selectedValues={getExerciseParam('difficulty')}
                        />
                    </FormField>

                    <FormField label='Lista treningów do przypisania'>
                        <SelectField
                            title='Lista rozwijana wyboru treningu'
                            name='trainings'
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
            headers: injectToken({
                'Content-Type': 'application/json'
            })
        }
    );
    return await response.json();
}

export async function action({request}) {
    const data = await request.formData();
    const toSave = createObjFromEntries(data);

    const response = await fetch(
        'http://localhost:8080/api/execrise/',
        {
            method: request.method,
            headers: injectToken({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(toSave)
        }
    );
}