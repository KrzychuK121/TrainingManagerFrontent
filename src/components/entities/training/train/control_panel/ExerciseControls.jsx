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
        setCurrExerciseNumber,
        moveToNextAndMarkStatus
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
        moveToNextAndMarkStatus(EXERCISE_STATUS.NOT_FINISHED);
        updateExercises();
    }

    function handleNextSeries() {
        currExercise.tempRounds = --currExercise.tempRounds;
        if (currExercise.tempRounds === 0)
            moveToNextAndMarkStatus(EXERCISE_STATUS.FINISHED);
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
                                        ? LABELS.RESUME
                                        : LABELS.PAUSE
                                }
                            />
                            <OptionButton
                                onClick={handleStop}
                                label={LABELS.STOP}
                            />
                        </>
                    )
                    : (
                        <OptionButton
                            onClick={handleNextSeries}
                            label={LABELS.NEXT_SERIES}
                        />
                    )
            }
            <OptionButton
                onClick={handleSkip}
                label={LABELS.SKIP}
            />
        </>
    );
}

export default ExerciseControls;