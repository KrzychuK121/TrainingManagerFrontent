import { Form } from 'react-bootstrap';
import classes from './FormField.module.css';

function getValidationErrorMess(errorMessages) {
    if (errorMessages === undefined)
        return <></>;

    let messages = errorMessages
        ? errorMessages
        : [''];

    return messages.map(
        message => (
            <Form.Control.Feedback
                key={message}
                type='invalid'
            >
                {message}
            </Form.Control.Feedback>
        )
    );
}

function FormField(
    {
        label,
        errorMessages,
        children = undefined,
        helperText = null
    }
) {

    return (
        <Form.Group>
            <Form.Label className='d-block' column={true}>
                {label}:
                {children}
                {getValidationErrorMess(errorMessages)}
            </Form.Label>
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