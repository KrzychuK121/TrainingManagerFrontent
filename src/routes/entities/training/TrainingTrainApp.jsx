import {useEffect, useState} from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import {redirect, useLoaderData, useNavigate} from 'react-router-dom';
import {defaultHeaders, handleResponseUnauthorized} from '../../../utils/CRUDUtils';
import {DOMAIN, getIdPath} from '../../../utils/URLUtils';
import AlertComponent from "../../../components/alerts/AlertComponent";
import TrainingPanel from "../../../components/entities/training/train/TrainingPanel";
import {mapExerciseToExerciseItem} from "../../../components/entities/training/train/ExerciseItem";

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

export const TRAINING_FINISHED = 'training-finished';

function TrainingTrainApp() {
    const navigate = useNavigate();
    const loadedData = useLoaderData();

    const {routineId, training} = loadedData;
    const {trainingId, title, description} = training;
    const [exercises, setExercises] = useState(training.exercises);

    const [startDate, setStartDate] = useState(null);
    const [currExerciseNumber, setCurrExerciseNumber] = useState(null);
    const [finished, setFinished] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    async function registerDoneTraining() {
        if(!finished)
            return;
        const doneTraining = {
            routineId,
            trainingId,
            startDate: startDate,
            endDate: new Date(),
            doneExercises: exercises.map(
                exercise => {
                    return {
                        exerciseId: exercise.id,
                        doneSeries: exercise.finishedRounds
                    }
                }
            )
        }

        const response = await fetch(
            `${DOMAIN}/doneTrainings`,
            {
                method: 'POST',
                headers: defaultHeaders(),
                body: JSON.stringify(doneTraining)
            }
        );

        if (response.status === 204) {
            navigate(`/main/workout/statistics?${TRAINING_FINISHED}`);
            return;
        }

        if (!response.ok)
            setErrorMessage('Wystąpił problem podczas zapisywania wyników treningu. Spróbuj wysłać wynik ponownie');
    }

    useEffect(() => {
        registerDoneTraining();
    }, [finished]);

    return (
        <>
            <AlertComponent
                message={errorMessage}
                showTrigger={errorMessage}
                variant='danger'
                closeDelay={5000}
                scrollOnTrigger={true}
            />
            <Row className='justify-content-center'>
                <Col md={6} lg={8}>
                    <h2>{`Tytuł: ${title}`}</h2>
                    <div className='m-0 p-0'>
                        <h3 className='m-0'>Opis</h3>
                        <p className='py-0'>{description}</p>
                    </div>
                    <h2>Twój trening zawiera:</h2>
                    <br/>
                    <TrainingPanel
                        finished={finished}
                        exercises={exercises}
                        setExercises={setExercises}
                        currExerciseNumber={currExerciseNumber}
                        setCurrExerciseNumber={setCurrExerciseNumber}
                        setFinished={setFinished}
                        startDate={setStartDate}
                    />
                    {
                        errorMessage && (
                            <Button
                                onClick={registerDoneTraining}
                                variant='primary'
                            >
                                Wyślij wynik ponownie
                            </Button>
                        )
                    }

                </Col>
            </Row>
        </>
    );
}

export default TrainingTrainApp;

export const NO_TRAINING_DAY = 'no-training-day';
export const TRAINING_DONE = 'training-done';

export async function loader({params}) {
    const trainingId = getIdPath(params);
    const response = trainingId
        ? await fetch(
            `${DOMAIN}/training${trainingId}`,
            {
                headers: defaultHeaders()
            }
        )
        : await fetch(
            `${DOMAIN}/plans/today-training`,
            {
                headers: defaultHeaders()
            }
        );

    const handledResponse = await handleResponseUnauthorized(response);
    if (handledResponse)
        return handledResponse;

    if (response.status === 404)
        return redirect(`/main/plans/week?${NO_TRAINING_DAY}`);
    if(response.status === 204)
        return redirect(`/main/plans/week?${TRAINING_DONE}`);

    const workoutRead = await response.json();
    const training = workoutRead.trainingRead;

    const exercises = training.exercises.map(
        exercise => mapExerciseToExerciseItem(exercise)
    );

    return {
        routineId: workoutRead.routineId,
        training: {
            trainingId: training.id,
            title: training.title,
            description: training.description,
            exercises
        }
    };
}