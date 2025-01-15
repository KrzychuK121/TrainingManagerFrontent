import ExerciseCard from "./ExerciseCard";
import classes from './ExerciseCarousel.module.css';

function ExerciseCarousel(
    {
        exercises,
        setActionData
    }
) {
    return (
        <>
            <div className={classes.scrollableContainer}>
                <div className='d-inline-flex'>
                    {
                        exercises.map(
                            exercise => (
                                <ExerciseCard
                                    key={exercise.id}
                                    exercise={exercise}
                                    optionsMapper={null}
                                    setActionData={setActionData}
                                />
                           )
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default ExerciseCarousel;