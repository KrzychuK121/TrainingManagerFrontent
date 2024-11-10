import CustomParametersForm from "./CustomParametersForm";

function CustomParametersList(
    {
        selectedExercises,
        useFormValidationObj,
        handleExerciseUnchecked
    }
) {
    if(!selectedExercises || selectedExercises.length === 0)
        return <></>;

    return (
        <>
            {
                selectedExercises.map(
                    exercise => (
                        <CustomParametersForm
                            key={exercise.id}
                            exercise={exercise}
                            useFormValidationObj={useFormValidationObj}
                            handleExerciseUnchecked={handleExerciseUnchecked}
                        />
                    )
                )
            }
        </>
    );
}

export default CustomParametersList;