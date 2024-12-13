import {useState} from "react";
import RadioButton from "../../RadioButton";
import FormControls from "../../FormControls";

export const SEXES = {
    WOMEN: 'Kobieta',
    MEN: 'Mężczyzna'
};

function BasicBodyParameters(
    {
        justifyContent = 'center'
    }
) {
    const [chosenSex, setChosenSex] = useState(
        {
            sex: SEXES.WOMEN
        }
    );

    return (
        <>
            <div
                className={`d-flex justify-content-${justifyContent}`}
            >
                <RadioButton
                    id='sexWomen'
                    groupId='sex'
                    label={SEXES.WOMEN}
                    value={SEXES.WOMEN}
                    chosenRadioValues={chosenSex}
                    setChosenRadioValues={setChosenSex}
                />
                <RadioButton
                    id='sexMen'
                    groupId='sex'
                    label={SEXES.MEN}
                    value={SEXES.MEN}
                    chosenRadioValues={chosenSex}
                    setChosenRadioValues={setChosenSex}
                />
                <input
                    type='hidden'
                    name='sex'
                    value={chosenSex.sex}
                />
            </div>

            <FormControls
                label='Wiek'
                name='age'
                justifyContent={justifyContent}
                required
            />
            <FormControls
                label='Wzrost [cm]'
                name='height'
                justifyContent={justifyContent}
                required
            />
            <FormControls
                label='Waga'
                name='weight'
                justifyContent={justifyContent}
                required
            />
        </>
    );
}

export default BasicBodyParameters;