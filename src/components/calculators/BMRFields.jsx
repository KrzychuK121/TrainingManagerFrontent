import BMIFields from "./BMIFields";
import SelectField from "../form/SelectField";
import {Form} from 'react-bootstrap';

const activityLevel = [
    {
        value: 1.2,
        description: 'Brak aktywności (siedzący tryb życia)'
    },
    {
        value: 1.375,
        description: 'Lekka aktywność (1-3 razy w tygodniu)'
    },
    {
        value: 1.55,
        description: 'Średnia aktywność (3-5 razy w tygodniu)'
    },
    {
        value: 1.725,
        description: 'Wysoka aktywność (6-7 razy w tygodniu)'
    },
    {
        value: 1.9,
        description: 'Bardzo wysoka aktywność (zawodowe treningi)'
    }
];

function BMRFields(
    {
        justifyContent = 'center'
    }
) {
    return (
        <>
            <BMIFields justifyContent={justifyContent}/>
            <div className={`d-flex justify-content-${justifyContent}`}>
                <Form.Label
                    column={true}
                    sm={4}
                >
                    Poziom aktywności:
                    <SelectField
                        title='Wybierz poziom aktywności do obliczenia BMR'
                        name='activity'
                        firstElemDisplay={null}
                        options={activityLevel}
                    />
                </Form.Label>
            </div>
        </>
    );
}

export default BMRFields;