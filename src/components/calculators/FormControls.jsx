import {Form} from "react-bootstrap";

function FormControls(
    {
        label,
        name,
        justifyContent = 'center',
        ...rest
    }
) {
    return (
        <div className={`d-flex justify-content-${justifyContent}`}>
            <Form.Group>
                <Form.Label column={true}>
                    {`${label}:`}
                    <Form.Control
                        name={name}
                        {...rest}
                    />
                </Form.Label>
            </Form.Group>
        </div>
    );
}

export default FormControls;