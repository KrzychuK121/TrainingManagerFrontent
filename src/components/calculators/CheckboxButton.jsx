import {ToggleButton} from "react-bootstrap";
import {useState} from "react";

function CheckboxButton(
    {
        id,
        label,
        value,
        defaultChecked = false,
        className,
        setCheckedArr,
        onChange = null,
        ...rest
    }
) {
    const [checked, setChecked] = useState(defaultChecked);

    function handleCheck(event) {
        if(onChange)
            onChange(event);
        const checkbox = event.currentTarget;
        const checkboxValue = checkbox.value;
        const newChecked = !checked;

        setChecked(newChecked);
        setCheckedArr(
            prev => {
                let newArr = prev.filter(
                    prevElement => prevElement !== checkboxValue
                );
                if(newChecked)
                    newArr.push(checkboxValue);
                return newArr;
            }
        );
    }

    return (
        <>
            <ToggleButton
                className={`m-2 ${className}`}
                id={id}
                type='checkbox'
                variant='primary'
                checked={checked}
                value={value}
                onChange={handleCheck}
                {...rest}
            >
                {label}
            </ToggleButton>
        </>
    );
}

export default CheckboxButton;