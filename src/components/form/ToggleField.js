import {Form} from "react-bootstrap";
import {useState} from "react";

function ToggleField(
    {
        name,
        defaultValue,
        ...rest
    }
) {
    const [value, setValue] = useState(defaultValue);
    return (
        <>
            <input
                name={name}
                type='hidden'
                value={'' + value}
            />
            <Form.Switch
                defaultChecked={defaultValue}
                onClick={() => setValue(!value)}
                {...rest}
            />
        </>
    );
}

export default ToggleField;