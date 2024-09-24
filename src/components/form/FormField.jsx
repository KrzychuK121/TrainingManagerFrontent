import { Form } from 'react-bootstrap';
import classes from './FormField.module.css';

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

function FormField(
    {
        label,
        status,
        name,
        type = 'text',
        defaultValue = null,
        children = undefined,
        helperText = null
    }
) {
    const validationProps = getValidationProp(isValid(status));

    return (
        <Form.Group>
            <Form.Label className='form-label' htmlFor={name} column={true}>{label}:</Form.Label>
            {
                children
                    ? children
                    : (
                        <Form.Control
                            className='form-control'
                            id={name}
                            name={name}
                            type={type}
                            defaultValue={defaultValue}
                            isValid={validationProps.isValid}
                            isInvalid={validationProps.isInvalid}
                        />
                    )
            }
            {getValidationErrorMess(status)}
            {
                helperText && (
                    <div className={classes.helperBox}>
                        <Form.Text className={classes.helperText}>
                            {helperText}
                        </Form.Text>
                    </div>
                )
            }
        </Form.Group>
    );
}

export default FormField;