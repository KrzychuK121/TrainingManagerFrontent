import { Form as RouterForm, useLoaderData } from 'react-router-dom';
import AlertComponent from '../../../components/alerts/AlertComponent';
import InputField from '../../../components/form/InputField';
import SubmitButton from '../../../components/form/SubmitButton';
import defaultClasses from '../../Default.module.css';

function ExerciseForm() {
    const loaderData = useLoaderData();
    const message = loaderData && loaderData.message !== null
        ? loaderData.message
        : null;
    return (
        <>
            <AlertComponent
                message={message}
                displayCondition={message !== null}
            />
            <RouterForm
                action='#'
                method='post'
            >
                <fieldset className={defaultClasses.authForms}>
                    <legend>Stwórz nowe ćwiczenie</legend>
                    <InputField
                        label='Nazwa'
                        name='name'
                    />

                    <InputField
                        label='Opis'
                        name='description'
                    />

                    <InputField
                        label='Trenowana część ciała'
                        name='bodyPart'
                    />
                    {/*<select
                        className='form-select form-select-lg'
                        aria-label='label'
                        id='bodyPart'
                        th:field='*{bodyPart}'
                    >
                        <option value='' selected>---Wybierz część ciała---</option>
                        <option
                            th:each='bodyPart, i : ${bodyPartArray}'
                            th:value='${bodyPart}'
                            th:text='${T(springweb.training_manager.models.entities.BodyPart).getBodyDesc(bodyPart)}'
                        ></option>
                    </select>*/}

                    <InputField
                        label='Serie'
                        name='rounds'
                    />

                    <InputField
                        label='Powtórzenia'
                        name='repetition'
                        helperText='Jeśli ćwiczenie polegają długości wykonywania, zostaw puste pole
                        lub wpisz 0'
                    />

                    <InputField
                        label='Czas wykonania'
                        name='time'
                        helperText='Jeśli ćwiczenia polegają na ilości powtórzeń, możesz zostawić
                        to pole puste (lub wpisz przewidywaną długość treningu)'
                    />

                    <InputField
                        label='Obciążenie'
                        name='weights'
                    />

                    <InputField
                        label='Poziom trudności'
                        name='difficulty'
                    />
                    {/*<select
                        className='form-select form-select-lg'
                        aria-label='label'
                        id='difficulty'
                        th:field='*{difficulty}'
                    >
                        <option value='' selected>---Wybierz poziom trudności---</option>
                        <option
                            th:each='difficulty, i : ${difficultyArray}'
                            th:value='${difficulty}'
                            th:text='${difficultyDescArray.get(__${i.index}__)}'
                        ></option>
                    </select>*/}

                    <InputField
                        label='Lista treningów do przypisania'
                        name='trainings'
                    />
                    {/*<select
                        className='form-select form-select-lg'
                        aria-label='label'
                        id='trainings'
                        th:if='${allTrainings != null and !allTrainings.isEmpty()}'
                        name='trainingIds'
                        multiple
                    >
                        <option value='' selected>---Wybierz treningi---</option>
                        <option
                            th:each='training, i : ${allTrainings}'
                            th:value='${training.id}'
                            th:text='${training.title}'
                            th:selected='${selected != null and selected.contains(training.id)}'
                        >
                        </option>
                    </select>*/}

                    <SubmitButton
                        display='Zapisz'
                        submittingDisplay='Zapisuję'
                    />
                </fieldset>
            </RouterForm>
        </>
    );
}

export default ExerciseForm;

export async function action({request}) {
    const normalizedMethod = request.method.toLowerCase();
    switch (normalizedMethod) {
        case 'post':
            break;
        case 'put':
            break;
    }
}