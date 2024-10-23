import { Accordion, Card } from 'react-bootstrap';

import trainAppClasses from '../../../../../routes/entities/training/TrainingTrainApp.module.css';
import ExerciseControls from './ExerciseControls';
import InitControls from './InitControls';

function ControlPanel(
    {
        exercises,
        setExercises,
        currExerciseNumber,
        setCurrExerciseNumber
    }
) {
    return (
        <Accordion.Item eventKey='0'>
            <Card className={trainAppClasses.listBody}>
                <Card.Header className='h2'>
                    <div className='d-flex justify-content-center'>
                        {
                            currExerciseNumber === null || currExerciseNumber === undefined // Can't ! bc of 0 value
                                ? (
                                    <InitControls setCurrExerciseNumber={setCurrExerciseNumber}/>
                                )
                                : (
                                    <ExerciseControls
                                        exercises={exercises}
                                        setExercises={setExercises}
                                        currExerciseNumber={currExerciseNumber}
                                        setCurrExerciseNumber={setCurrExerciseNumber}
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