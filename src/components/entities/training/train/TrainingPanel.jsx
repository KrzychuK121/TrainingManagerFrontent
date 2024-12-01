import {Accordion} from "react-bootstrap";
import ControlPanel from "./control_panel/ControlPanel";
import * as PropTypes from "prop-types";
import ExerciseItem from "./ExerciseItem";

function TrainingPanel(
    {
        finished,
        exercises,
        setExercises,
        currExerciseNumber,
        setCurrExerciseNumber,
        setFinished,
        startDate
    }
) {
    function getActiveKey() {
        if (
            currExerciseNumber === null ||
            currExerciseNumber === undefined ||
            finished
        )
            return null;
        return exercises[currExerciseNumber].id;
    }

    return (
        <Accordion
            flush
            id="listaCwiczen"
            activeKey={getActiveKey()}
        >
            {
                !finished && (
                    <ControlPanel
                        exercises={exercises}
                        setExercises={setExercises}
                        currExerciseNumber={currExerciseNumber}
                        setCurrExerciseNumber={setCurrExerciseNumber}
                        setFinished={setFinished}
                        setStartDate={startDate}
                    />
                )
            }
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
    );
}

TrainingPanel.propTypes = {
    finished: PropTypes.bool,
    exercises: PropTypes.any,
    setExercises: PropTypes.func,
    currExerciseNumber: PropTypes.any,
    setCurrExerciseNumber: PropTypes.func,
    setFinished: PropTypes.func,
    startDate: PropTypes.func,
};

export default TrainingPanel;