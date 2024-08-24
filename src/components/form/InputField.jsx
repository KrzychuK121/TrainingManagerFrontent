import { Form } from 'react-bootstrap';
import ValidationErrorMess from './Validation';
import { useState } from 'react';

function getValidationProp(isValid){
    if(isValid === undefined)
        return {};
    if(isValid)
        return { isValid: true };
    else
        return { isInvalid: true };
}

function InputField(
    {
        label,
        status,
        name,
        type = 'text'
    }
){
    const [isValid, setIsValid] = useState(undefined);

    const validationProps = getValidationProp(isValid);

    console.log(isValid);

    return (
        <Form.Group hasValidation>
            <Form.Label className='form-label' htmlFor={name}>{label}:</Form.Label>
            <Form.Control
                className='form-control'
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