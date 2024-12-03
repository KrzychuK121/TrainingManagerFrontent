import {ToggleButton} from "react-bootstrap";
import {useEffect, useState} from "react";

function isChecked(
    chosenRadioValues,
    groupId,
    providedValue
) {
    return chosenRadioValues[groupId] === providedValue;
}

function RadioButton(
    {
        id,
        groupId,
        label,
        value,
        chosenRadioValues,
        setChosenRadioValues,
        className = 'm-2'
    }
) {
    const [checked, setChecked] = useState(
        isChecked(chosenRadioValues, groupId, value)
    );

    useEffect(() => {
        const newChecked = isChecked(chosenRadioValues, groupId, value);
        setChecked(newChecked);
    }, [chosenRadioValues]);

    function handleCheck(event) {
        const radio = event.currentTarget;
        const radioValue = radio.value;

        setChosenRadioValues(
            prev => {
                prev[groupId] = radioValue;
                return {...prev};
            }
        );
    }

    return (
        <>
            <ToggleButton
                className={className}
                id={id}
                type='radio'
                variant='primary'
                checked={checked}
                value={value}
                onChange={handleCheck}
            >
                {label}
            </ToggleButton>
        </>
    );
}

export default RadioButton;