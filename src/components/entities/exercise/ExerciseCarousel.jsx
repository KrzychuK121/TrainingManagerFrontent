import ExerciseCard from "./ExerciseCard";
import MobileCarousel from "../../MobileCarousel";

function ExerciseCarousel(
    {
        exercises,
        setActionData
    }
) {
    return (
        <>
            <MobileCarousel>
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
            </MobileCarousel>
        </>
    );
}

export default ExerciseCarousel;