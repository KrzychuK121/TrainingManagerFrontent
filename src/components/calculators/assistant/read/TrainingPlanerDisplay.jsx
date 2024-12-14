import {Form as RouterForm, json, redirect} from 'react-router-dom';
import TrainingDayDisplay from "./TrainingDayDisplay";
import SubmitButton from "../../../form/SubmitButton";
import {Row} from "react-bootstrap";
import {DOMAIN} from "../../../../utils/URLUtils";
import {defaultHeaders} from "../../../../utils/CRUDUtils";
import {ACTION_TYPE_NAME} from "../../../../routes/workout/assistant/TrainingPlaner";

function TrainingPlanerDisplay(
    {
        retrievedData
    }
) {
    const {schedules, weekdaysData} = retrievedData;

    return (
        <>
            <Row className='justify-content-center'>
                <h1>Zaprojektowana rutyna</h1>
            </Row>
            <hr/>
            <p>
                Poniżej znajduje się rutyna, którą zaprojektował automatyczny asystent. Jeśli jakieś parametry Ci nie odpowiadają,
                możesz ją zapisać a następnie edytować jej parametry pod swoje wymagania.
            </p>
            <Row className='justify-content-center'>
                {
                    weekdaysData.map(
                        ({weekday, weekdayDisplay}) => (
                            <TrainingDayDisplay
                                key={weekday}
                                weekdayDisplay={weekdayDisplay}
                                trainingData={schedules[weekday]}
                            />
                        )
                    )
                }
            </Row>
            <Row className='my-5'>
                <RouterForm
                    method='post'
                    className='d-flex justify-content-center'
                >
                    <input type='hidden' name={ACTION_TYPE_NAME} value='create'/>
                    <SubmitButton
                        display='Zapisz rutynę'
                        submittingDisplay='Zapisuję'
                    />
                </RouterForm>
            </Row>
        </>
    );
}

export default TrainingPlanerDisplay;

export async function action({data, request}) {
    const response = await fetch(
        `${DOMAIN}/assistant/save-plan`,
        {
            method: request.method,
            headers: defaultHeaders()
        }
    );

    console.log(response);

    if(response.status === 204)
        return redirect('/main/plans');

    if(response.status === 404)
        return json({error: 'Nie posiadasz żadnej zaprojektowanej rutyny do zapisania. Spróbuj ponownie'});

    return json({error: 'Wystąpił nieoczekiwany błąd'});
}
