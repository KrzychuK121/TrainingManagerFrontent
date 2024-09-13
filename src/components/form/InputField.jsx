import { useState } from 'react';
import { Form } from 'react-bootstrap';
import ValidationErrorMess from './Validation';

function getValidationProp(isValid) {
    if (isValid === undefined)
        return {};
    if (isValid)
        return {isValid: true};
    else
        return {isInvalid: true};
}

function InputField(
    {
        label,
        status,
        name,
        type = 'text'
    }
) {
    const [isValid, setIsValid] = useState(undefined);

    const validationProps = getValidationProp(isValid);

    return (
        <Form.Group hasValidation>
            <Form.Label className="form-label" htmlFor={name}>{label}:</Form.Label>
            <Form.Control
                className="form-control"
                id={name}
                name={name}
                type={type}
                isValid={validationProps.isValid}
                isInvalid={validationProps.isInvalid}
            />
            <ValidationErrorMess
                status={status}
                setIsValid={setIsValid}
            />
        </Form.Group>
    );
}

export default InputField;