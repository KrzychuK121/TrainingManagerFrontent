import { Form } from 'react-bootstrap';


function ValidationErrorMess(
    {
        status,
        setIsValid
    }
){
    if(status === undefined){
        setIsValid(undefined);
        return <></>;
    }

    const isValid = status === null;

    let message = isValid
        ? ''
        : status;
    let type = isValid
        ? 'valid'
        : 'invalid';

    setIsValid(isValid);

    return (
        <Form.Control.Feedback type={type}>
            {message}
        </Form.Control.Feedback>
    );
}

export default ValidationErrorMess;