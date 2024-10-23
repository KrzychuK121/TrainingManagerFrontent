import { useState } from 'react';
import { Accordion, Col, Row } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';
import ControlPanel from '../../../components/entities/training/train/control_panel/ControlPanel';
import ExerciseItem from '../../../components/entities/training/train/ExerciseItem';
import { defaultHeaders, getIdPath, handleResponseUnauthorized } from '../../../utils/CRUDUtils';

export const EXERCISE_TYPE = {
    TIMER: 0,
    REPEAT: 1
};

export const EXERCISE_STATUS = {
    TODO: 0,
    CURRENT: 1,
    NOT_FINISHED: 2,
    FINISHED: 3
};

function TrainingTrainApp() {
    const loadedData = useLoaderData();

    const {training} = loadedData;
    const {title, description} = training;
    const [exercises, setExercises] = useState(training.exercises);

    const [currExerciseNumber, setCurrExerciseNumber] = useState(null);

    return (
        <>
            <Row className='justify-content-center'>
                <Col md={6} lg={8}>
                    <h2>{`Tytuł: ${title}`}</h2>
                    <div className='m-0 p-0'>
                        <h3 className='m-0'>Opis</h3>
                        <p className='py-0'>{description}</p>
                    </div>
                    <h2>Twój trening zawiera:</h2>
                    <br/>
                    <Accordion flush id='listaCwiczen'>
                        <ControlPanel
                            exercises={exercises}
                            setExercises={setExercises}
                            currExerciseNumber={currExerciseNumber}
                            setCurrExerciseNumber={setCurrExerciseNumber}
                        />
                        {
                            exercises.map(
                                exercise => (
                                    <ExerciseItem
                                        key={exercise.id}
                                        exercise={exercise}
                                    />
                                )
                            )
                        }
                    </Accordion>
                </Col>
            </Row>
        </>
    );
}

export default TrainingTrainApp;

export async function loader({params}) {
    const trainingId = getIdPath(params);
    const response = await fetch(
        `http://localhost:8080/api/training${trainingId}`,
        {
            headers: defaultHeaders()
        }
    );

    const handledResponse = await handleResponseUnauthorized(response);
    if (handledResponse)
        return handledResponse;

    const training = await response.json();

    const exercises = training.exercises.map(
        exercise => {

            let newAmount = exercise.repetition === 0
                ? exercise.time
                : exercise.repetition;

            return {
                id: exercise.id,
                name: exercise.name,
                description: exercise.description,
                mode: exercise.repetition === 0
                    ? EXERCISE_TYPE.TIMER
                    : EXERCISE_TYPE.REPEAT,
                rounds: exercise.rounds,
                tempRounds: exercise.rounds,
                amount: newAmount,
                tempAmount: newAmount,
                status: EXERCISE_STATUS.TODO
            };
        }
    );

    return {
        training: {
            title: training.title,
            description: training.description,
            exercises
        }
    };
}