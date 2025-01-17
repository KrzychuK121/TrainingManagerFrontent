import {Form as RouterForm, useNavigate} from 'react-router-dom';
import TrainingDayDisplay from "./TrainingDayDisplay";
import SubmitButton from "../../../form/SubmitButton";
import {Row} from "react-bootstrap";
import {DOMAIN} from "../../../../utils/URLUtils";
import {defaultAuthHandler, defaultHeaders} from "../../../../utils/CRUDUtils";
import AlertComponent from "../../../alerts/AlertComponent";
import {useState} from "react";


export const NEW_ROUTINE_SAVED = 'new-routine-saved';

async function action(
    method,
    navigate,
) {
    const response = await fetch(
        `${DOMAIN}/assistant/save-plan`,
        {
            method,
            headers: defaultHeaders()
        }
    );

    const handledResponse = await defaultAuthHandler(response);

    if(handledResponse)
        return handledResponse;
    
    if(response.status === 204) {
        navigate(`/main/plans?${NEW_ROUTINE_SAVED}`);
        return {error: ''};
    }

    if(response.status === 404)
        return {error: 'Nie posiadasz żadnej zaprojektowanej rutyny do zapisania. Spróbuj ponownie'};

    return {error: 'Wystąpił nieoczekiwany błąd'};
}

function TrainingPlanerDisplay(
    {
        retrievedData
    }
) {
    const navigate = useNavigate();
    const {schedules, weekdaysData} = retrievedData;
    const [globalMessage, setGlobalMessage] = useState('');

    async function handleRoutineSave(event) {
        event.preventDefault();

        const response = await action('post', navigate);
        if(response.hasOwnProperty('error')) {
            const copyError = {...response};
            setGlobalMessage(copyError);
        }
    }

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
                <AlertComponent
                    message={globalMessage}
                    showTrigger={globalMessage}
                    messageProperty={'error'}
                    variant='danger'
                    closeDelay={5000}
                />
                <RouterForm
                    method='post'
                    className='d-flex justify-content-center'
                    onSubmit={handleRoutineSave}
                >
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
