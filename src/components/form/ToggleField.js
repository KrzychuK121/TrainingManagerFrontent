import {Form} from "react-bootstrap";
import {useState} from "react";

function ToggleField(
    {
        defaultValue,
        ...rest
    }
) {
    const [value, setValue] = useState(defaultValue);
    return (
        <Form.Switch
            value={value}
            defaultChecked={defaultValue}
            onClick={() => setValue(!value)}
            /*disabled={
                training
                && !Boolean(getTrainingParam('trainingPrivate'))
            }*/
            {...rest}
        />
    );
}

export default ToggleField;