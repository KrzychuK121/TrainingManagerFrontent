import { useState } from 'react';
import { EXERCISE_STATUS, EXERCISE_TYPE } from '../../../../../routes/entities/training/TrainingTrainApp';
import OptionButton from './OptionButton';

function calculateTimer(exercise) {
    exercise.amount.forEach(
        amountEntity => console.log()
    );
}

function ExerciseControls(
    {
        exercises,
        setExercises,
        currExerciseNumber,
        setCurrExerciseNumber
    }
) {
    const currExercise = exercises[currExerciseNumber];
    const LABELS = {
        RESUME: 'WZNÓW',
        PAUSE: 'ZATRZYMAJ',
        STOP: 'STOP',
        SKIP: 'POMIŃ',
        NEXT_SERIES: 'SERIA ZROBIONA'
    };

    const [timer, setTimer] = useState(0);
    const [resume, setResume] = useState(true);

    function updateExercises() {
        setExercises([...exercises]);
    }

    function handlePauseResume() {
        setResume(!resume);

        if (!resume) {
            clearTimeout(timer);
            setTimer(null);
            return;
        }


        const newTimer = setTimeout(
            () => {

            }, 1000
        );

        setTimer(newTimer);
    }

    function handleStop() {

        // Implement stop functionality
    }

    function handleSkip() {
        if (timer)
            clearTimeout(timer);
        currExercise.status = EXERCISE_STATUS.NOT_FINISHED;
        setCurrExerciseNumber(++currExerciseNumber);
    }

    function handleNextSeries() {
        currExercise.tempRounds = --currExercise.tempRounds;
        updateExercises();
    }

    return (
        <>
            {
                currExercise.mode === EXERCISE_TYPE.TIMER
                    ? (
                        <>
                            <OptionButton
                                onClick={handlePauseResume}
                                label={
                                    resume
                                        ? 'WZNÓW'
                                        : 'ZATRZYMAJ'
                                }
                            />
                            <OptionButton
                                onClick={handleStop}
                                label='Stop'
                            />
                        </>
                    )
                    : (
                        <OptionButton
                            onClick={handleNextSeries}
                            label='Następne powtórzenie'
                        />
                    )
            }
            <OptionButton
                onClick={handleSkip}
                label='Pomiń'
            />
        </>
    );
}

export default ExerciseControls;