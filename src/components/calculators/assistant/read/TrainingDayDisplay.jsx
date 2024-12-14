import {Button, Card, Col} from "react-bootstrap";
import {getEntityParamGetter} from "../../../../utils/EntitiesUtils";
import {useState} from "react";
import ExerciseDetailsModal from "./ExerciseDetailsModal";

const { format, parse } = require('date-fns');

function getFormattedTrainingTime(trainingTime) {
    if(!trainingTime)
        return '';
    const parsedTime = parse(trainingTime, 'HH:mm:ss', new Date());
    return format(parsedTime, 'HH:mm');
}

function TrainingDayDisplay(
    {
        weekdayDisplay,
        trainingData
    }
) {
    const trainingDataGetter = getEntityParamGetter(trainingData);

    const trainingTime = trainingDataGetter('trainingTime');
    const training = trainingDataGetter('training');
    const totalBurnedKcal = trainingDataGetter('totalBurnedKcal');

    const formattedTrainingTime = getFormattedTrainingTime(trainingTime);

    const [showExerciseDetails, setShowExerciseDetails] = useState(false);

    function showExerciseDetailsHandler() {
        setShowExerciseDetails(true);
    }

    return (
        <Col
            sm={4} lg={3}
            className='my-2'
        >
            {
                training && (
                    <ExerciseDetailsModal
                        show={showExerciseDetails}
                        setShow={setShowExerciseDetails}
                        exercises={training.exercises}
                    />
                )
            }
            <Card className='h-100'>
                <Card.Header className='text-center'>
                    <span className='text-uppercase fw-bold'>
                        {
                            `${weekdayDisplay}${
                                formattedTrainingTime !== ''
                                    ? `: ${formattedTrainingTime}`
                                    : ''
                            }`
                        }
                    </span>
                </Card.Header>
                <Card.Body>
                    {
                    training
                        ? (
                            <>
                                <Card.Title>{training.title}</Card.Title>
                                <hr />
                                <b>Opis:</b>
                                <Card.Text>{training.description}</Card.Text>
                                <hr />
                                <span><b>Suma spalanych kalorii:</b> {totalBurnedKcal}</span>
                                <hr />
                                <Button
                                    variant='info'
                                    onClick={showExerciseDetailsHandler}
                                >
                                    Spis ćwiczeń
                                </Button>
                            </>
                        )
                        : (
                            <>
                                <Card.Title>Dzień wolny</Card.Title>
                                <hr/>
                                <Card.Text>
                                    Wygląda na to, że nie masz nic zaplanowane na dzisiejszy dzień.
                                    Wykorzystaj ten czas na odpoczynek. Regeneracja po wysiłku fizycznym
                                    jest bardzo ważna w procesie budowy mięśni.
                                </Card.Text>
                            </>
                        )
                }
                </Card.Body>
            </Card>
        </Col>
    );
}

export default TrainingDayDisplay;