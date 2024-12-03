import {Form as RouterForm, json, useActionData} from "react-router-dom";
import SubmitButton from "../../components/form/SubmitButton";
import BMRFields from "../../components/calculators/BMRFields";
import {Form} from "react-bootstrap";
import SelectField from "../../components/form/SelectField";
import {SEXES} from "../../components/calculators/BMIFields";

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

function CalcBMR() {
    const actionData = useActionData();
    return (
        <>
            <RouterForm method='post'>
                <BMRFields/>
                <div className={`d-flex justify-content-center`}>
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
                <div className='d-flex justify-content-center'>
                    <SubmitButton
                        display='Policz BMR'
                        submittingDisplay='Liczę BMR'
                    />
                </div>
                {
                    actionData && (
                        <div className={`d-flex justify-content-center`}>
                            <div>
                                <h2>Zapotrzebowanie kaloryczne:</h2>
                                <p>Minimalne zapotrzebowanie (BMR) wynosi: {actionData.BMR}</p>
                                <p>Z uwzględnieniem treningów: {actionData.TDEE.toFixed(2)}</p>
                                <p>Aby osiągnąć cel potrzebujesz: {actionData.caloriesReduction.toFixed(2)}</p>
                            </div>
                        </div>
                    )
                }
            </RouterForm>
        </>
    );
}

export default CalcBMR;

export async function action({request}) {
    const data = await request.formData();

    const sex = data.get('sex');
    const age = parseInt(data.get('age'));
    const height = parseInt(data.get('height'));
    const weight = parseFloat(data.get('weight'));
    const activity = parseFloat(data.get('activity'));
    const goal = parseInt(data.get('goal'));

    // Według wzoru Mifflina-St Jeora,
    const BMR = sex === SEXES.WOMEN
        ? 10 * weight + 6.25 * height - 5 * age - 161
        : 10 * weight + 6.25 * height - 5 * age + 5;

    const TDEE = BMR * activity;
    const caloriesReduction = TDEE + goal;

    return json(
        {
            BMR,
            TDEE,
            caloriesReduction
        }
    );
}