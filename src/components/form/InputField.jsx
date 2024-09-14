import { Form } from 'react-bootstrap';

function getValidationProp(isValid) {
    if (isValid === undefined)
        return {};
    if (isValid)
        return {isValid: true};
    else
        return {isInvalid: true};
}

function isValid(status) {
    if (status === undefined)
        return undefined;

    return status === null;
}

function getValidationErrorMess(status) {
    const isStatusValid = isValid(status);
    if (isStatusValid === undefined)
        return <></>;

    let messages = isStatusValid
        ? ''
        : status;
    let type = isStatusValid
        ? 'valid'
        : 'invalid';

    return messages.map(
        message => (
            <Form.Control.Feedback
                key={message}
                type={type}
            >
                {message}
            </Form.Control.Feedback>
        )
    );
}

function InputField(
    {
        label,
        status,
        name,
        type = 'text'
    }
) {
    const validationProps = getValidationProp(isValid(status));

    return (
        <Form.Group>
            <Form.Label className='form-label' htmlFor={name}>{label}:</Form.Label>
            <Form.Control
                className='form-control'
                id={name}
                name={name}
                type={type}
                isValid={validationProps.isValid}
                isInvalid={validationProps.isInvalid}
            />
            {getValidationErrorMess(status)}
        </Form.Group>
    );
}

export default InputField;