import {useEffect, useState} from 'react';
import {Accordion} from 'react-bootstrap';
import {EXERCISE_STATUS, EXERCISE_TYPE} from '../../../../routes/entities/training/TrainingTrainApp';
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

export function mapExerciseToExerciseItem(exercise) {
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
        finishedRounds: 0,
        amount: newAmount,
        tempAmount: newAmount,
        status: EXERCISE_STATUS.TODO
    };
}

function ExerciseItem({exercise}) {
    const {
        id,
        name,
        description,
        rounds,
        tempRounds,
        finishedRounds,
        amount,
        tempAmount,
        status
    } = exercise;

    const [backgroundColor, setBackgroundColor] = useState(getBackgroundColor(exercise));
    const [displayRounds, setDisplayRounds] = useState();
    const [displayAmount, setDisplayAmount] = useState();

    useEffect(() => {
        setBackgroundColor(getBackgroundColor(exercise));
    }, [status, exercise]);

    useEffect(() => {
        switch (status) {
            case EXERCISE_STATUS.CURRENT:
                setDisplayRounds(tempRounds);
                setDisplayAmount(tempAmount);
                break;
            case EXERCISE_STATUS.NOT_FINISHED:
            case EXERCISE_STATUS.FINISHED:
                let dRounds = finishedRounds === rounds
                    ? rounds
                    : `(${finishedRounds}/${rounds})`;

                setDisplayRounds(dRounds);
                setDisplayAmount(amount);
                break;
            case EXERCISE_STATUS.TODO:
            default:
                setDisplayRounds(rounds);
                setDisplayAmount(amount);
        }
    }, [status, rounds, tempRounds, amount, tempAmount]);

    const style = {
        backgroundColor
    };

    return (
        <Accordion.Item eventKey={id} className={classes.listBody}>
            <Accordion.Button className='m-0' style={style}>
                <span className={`me-1 ${classes.listHeader}`}>
                    {`${name}: ${displayRounds} serii, `}
                    {
                        exercise.mode === EXERCISE_TYPE.TIMER
                            ? `${displayAmount}`
                            : `${displayAmount} powtórzeń`
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