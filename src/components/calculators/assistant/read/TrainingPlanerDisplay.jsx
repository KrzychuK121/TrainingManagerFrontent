import {Form as RouterForm} from 'react-router-dom';
import TrainingDayDisplay from "./TrainingDayDisplay";
import SubmitButton from "../../../form/SubmitButton";
import {Row} from "react-bootstrap";

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
            <RouterForm method='post'>
                <SubmitButton
                    display='Zapisz rutynę'
                    submittingDisplay='Zapisuję'
                />
            </RouterForm>
        </>
    );
}

export default TrainingPlanerDisplay;