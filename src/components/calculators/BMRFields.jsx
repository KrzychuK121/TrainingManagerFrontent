import SelectField from "../form/SelectField";
import {Form} from 'react-bootstrap';
import BasicBodyParameters from "./assistant/write/BasicBodyParameters";

const ACTIVITY_LEVEL = [
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
        description: 'Średnia aktywność (4-5 razy w tygodniu)'
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

const goal = [
    {
        value: 0,
        description: 'Utrzymanie wagi'
    },
    {
        value: -500,
        description: 'Redukcja wagi (-500 kcal)'
    },
    {
        value: -750,
        description: 'Silna redukcja (-750 kcal)'
    },
    {
        value: 500,
        description: 'Budowanie masy (+500 kcal)'
    }
];

export function getActivityLevelBy(days) {
    if(days === 0)
        return 1.2;
    else if(days >= 1 && days <= 3)
        return 1.375;
    else if(days >= 4 && days <= 5)
        return 1.55;
    else if (days >= 6 && days <= 7)
        return 1.725;
    throw new RangeError('Days should be between 0 and 7 to calculate activity level.');
}

function BMRFields(
    {
        justifyContent = 'center'
    }
) {

    return (
        <>
            <BasicBodyParameters justifyContent={justifyContent} />

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
                        options={ACTIVITY_LEVEL}
                    />
                </Form.Label>
            </div>
            <div className={`d-flex justify-content-${justifyContent}`}>
                <Form.Label
                    column={true}
                    sm={4}
                >
                    Cel diety:
                    <SelectField
                        title='Wybierz cel diety do obliczenia BMR'
                        name='goal'
                        firstElemDisplay={null}
                        options={goal}
                    />
                </Form.Label>
            </div>
        </>
    );
}

export default BMRFields;