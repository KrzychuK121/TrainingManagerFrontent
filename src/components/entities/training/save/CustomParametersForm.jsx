import ExerciseParametersFields, {
    getExerciseParametersData, PARAMETERS_PREFIX
} from "../../exercise/ExerciseParametersFields";
import {Card, CloseButton, Form} from "react-bootstrap";
import {useState} from "react";
import ExerciseParametersDisplayList from "./ExerciseParametersDisplayList";

function CustomParametersForm(
    {
        exercise,
        useFormValidationObj,
        handleExerciseUnchecked
    }
) {
    const parametersData = getExerciseParametersData(exercise);
    const [customParameters, setCustomParameters] = useState(false);

    return (
        <>
            <Card>
                <Card.Header>
                    <CloseButton onClick={() => handleExerciseUnchecked(exercise.id)} />
                    <span className='m-5'>{exercise.name}</span>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{exercise.description}</Card.Title>
                    <Form.Check
                        label='Ustaw własne parametry'
                        type='switch'
                        onClick={() => setCustomParameters(!customParameters)}
                        checked={customParameters}
                        readOnly
                    />
                    {
                        customParameters
                        ? (
                            <ExerciseParametersFields
                                parametersData={parametersData}
                                useFormValidationObj={useFormValidationObj}
                                parametersPrefix={`${PARAMETERS_PREFIX}${exercise.id}.`}
                            />
                        )
                        : (
                            <ExerciseParametersDisplayList
                                parametersData={parametersData}
                            />
                        )
                    }
                </Card.Body>
            </Card>
        </>
    );
}

export default CustomParametersForm;