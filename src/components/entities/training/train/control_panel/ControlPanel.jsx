import { Accordion, Card } from 'react-bootstrap';
import { EXERCISE_STATUS } from '../../../../../routes/entities/training/TrainingTrainApp';

import trainAppClasses from '../../../../../routes/entities/training/TrainingTrainApp.module.css';
import ExerciseControls from './ExerciseControls';
import InitControls from './InitControls';

function ControlPanel(
    {
        exercises,
        setExercises,
        currExerciseNumber,
        setCurrExerciseNumber,
        setFinished
    }
) {
    function moveToNextAndMarkStatus(status) {
        const nextExerciseNumber = currExerciseNumber === null || currExerciseNumber === undefined
            ? 0
            : currExerciseNumber + 1;

        if (nextExerciseNumber > 0)
            exercises[nextExerciseNumber - 1].status = status;

        if (nextExerciseNumber === exercises.length) {
            setFinished(true);
            return;
        }

        setCurrExerciseNumber(nextExerciseNumber);
        exercises[nextExerciseNumber].status = EXERCISE_STATUS.CURRENT;
    }

    return (
        <Accordion.Item eventKey='0'>
            <Card className={trainAppClasses.listBody}>
                <Card.Header className='h2'>
                    <div className='d-flex justify-content-center'>
                        {
                            currExerciseNumber === null || currExerciseNumber === undefined // Can't ! bc of 0 value
                                ? (
                                    <InitControls
                                        setCurrExerciseNumber={setCurrExerciseNumber}
                                        moveToNextAndMarkStatus={moveToNextAndMarkStatus}
                                    />
                                )
                                : (
                                    <ExerciseControls
                                        exercises={exercises}
                                        setExercises={setExercises}
                                        currExerciseNumber={currExerciseNumber}
                                        setCurrExerciseNumber={setCurrExerciseNumber}
                                        moveToNextAndMarkStatus={moveToNextAndMarkStatus}
                                    />
                                )
                        }
                    </div>
                </Card.Header>
            </Card>
        </Accordion.Item>
    );
}

export default ControlPanel;