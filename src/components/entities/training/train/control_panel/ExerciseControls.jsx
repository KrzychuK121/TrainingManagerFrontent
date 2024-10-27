import { useEffect, useState } from 'react';
import { EXERCISE_STATUS, EXERCISE_TYPE } from '../../../../../routes/entities/training/TrainingTrainApp';
import OptionButton from './OptionButton';

function timeStringToSeconds(exercise, amount) {
    if (exercise.mode === EXERCISE_TYPE.REPEAT)
        return null;
    const [hours, minutes, seconds] = amount.split(':')
        .map(Number);
    return hours * 3600 + minutes * 60 + seconds;
}

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
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
        SKIP_ROUND: 'POMIŃ RUNDĘ',
        NEXT_SERIES: 'SERIA ZROBIONA'
    };

    const [timeInSeconds, setTimeInSeconds] = useState();
    const [resume, setResume] = useState(true);

    function updateExercises() {
        setExercises([...exercises]);
    }

    function getStatusByFinishedRounds() {
        return currExercise.finishedRounds >= (currExercise.rounds / 2)
            ? EXERCISE_STATUS.FINISHED
            : EXERCISE_STATUS.NOT_FINISHED;
    }

    function moveToNext() {
        moveToNextAndMarkStatus(getStatusByFinishedRounds());
    }

    useEffect(() => {
        setTimeInSeconds(
            timeStringToSeconds(currExercise, currExercise.amount)
        );
    }, [currExerciseNumber]);

    useEffect(() => {
        if (currExercise.mode !== EXERCISE_TYPE.TIMER)
            return;
        let interval;
        if (!resume) {
            if (timeInSeconds === 0) {
                ++currExercise.finishedRounds;
                if (currExercise.tempRounds - 1 === 0) {
                    moveToNext();
                    return;
                }

                --currExercise.tempRounds;
                currExercise.tempAmount = currExercise.amount;
                setResume(true);
                setTimeInSeconds(
                    timeStringToSeconds(currExercise, currExercise.amount)
                );
                updateExercises();
            }

            interval = setInterval(() => {
                const newTimeInSecond = timeInSeconds - 1;

                currExercise.tempAmount = formatTime(newTimeInSecond);
                setTimeInSeconds(newTimeInSecond);
                updateExercises();
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [resume, currExercise, moveToNext]);

    function handlePauseResume() {
        setResume(!resume);
    }

    function handleStop() {
        setResume(true);
        setTimeInSeconds(timeStringToSeconds(currExercise, currExercise.amount));
    }

    function handleSkip() {
        moveToNext();
        updateExercises();
    }

    function handleSkipRound() {
        if (currExercise.tempRounds - 1 === 0) {
            handleSkip();
            return;
        }

        --currExercise.tempRounds;
        updateExercises();
    }

    function handleNextSeries() {
        ++currExercise.finishedRounds;
        --currExercise.tempRounds;
        if (currExercise.tempRounds === 0)
            moveToNext();
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
            <OptionButton
                onClick={handleSkipRound}
                label={LABELS.SKIP_ROUND}
            />
        </>
    );
}

export default ExerciseControls;