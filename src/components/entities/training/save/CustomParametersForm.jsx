import ExerciseParametersFields, {
    getExerciseParametersData
} from "../../exercise/ExerciseParametersFields";
import {Card, CloseButton} from "react-bootstrap";

function CustomParametersForm(
    {
        exercise,
        useFormValidationObj,
        handleExerciseUnchecked
    }
) {
    const parametersData = getExerciseParametersData(exercise);

    return (
        <>
            <Card>
                <Card.Header>
                    <CloseButton onClick={() => handleExerciseUnchecked(exercise.id)} />
                    <span className='m-5'>{exercise.name}</span>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{exercise.description}</Card.Title>
                    <ExerciseParametersFields
                        parametersData={parametersData}
                        useFormValidationObj={useFormValidationObj}
                    />
                </Card.Body>
            </Card>
        </>
    );
}

export default CustomParametersForm;