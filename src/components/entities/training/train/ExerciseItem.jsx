import { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { EXERCISE_STATUS, EXERCISE_TYPE } from '../../../../routes/entities/training/TrainingTrainApp';
import classes from '../../../../routes/entities/training/TrainingTrainApp.module.css';

function getBackgroundColor(exercise) {
    switch (exercise.status) {
        case EXERCISE_STATUS.CURRENT:
            return '#FFD700';
        case EXERCISE_STATUS.NOT_FINISHED:
            return '#FF4655';
        case EXERCISE_STATUS.FINISHED:
            return '#9EF01A';
        case EXERCISE_STATUS.TODO:
        default:
            return '';
    }
}

function ExerciseItem({exercise}) {
    const {
        id,
        name,
        description,
        tempRounds,
        tempAmount,
        status
    } = exercise;

    const [backgroundColor, setBackgroundColor] = useState('#FFD700');

    useEffect(() => {
        setBackgroundColor(getBackgroundColor(exercise));
    }, [status]);

    const style = {
        backgroundColor
    };

    return (
        <Accordion.Item eventKey={id} className={classes.listBody}>
            <Accordion.Button className='m-0' style={style}>
                <span className={`me-1 ${classes.listHeader}`}>
                    {`${name}: ${tempRounds} serii `}
                    {
                        exercise.mode === EXERCISE_TYPE.TIMER
                            ? `${tempAmount}`
                            : `${tempAmount} powtórzeń`
                    }
                </span>
            </Accordion.Button>
            <Accordion.Collapse
                eventKey={id}
                className='collapse'
            >
                <Accordion.Body>
                    <span>
                        {description}
                    </span>
                </Accordion.Body>
            </Accordion.Collapse>
        </Accordion.Item>
    );
}

export default ExerciseItem;