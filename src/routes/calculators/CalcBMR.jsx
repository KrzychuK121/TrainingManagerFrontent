import {Form as RouterForm, json, useActionData} from "react-router-dom";
import SubmitButton from "../../components/form/SubmitButton";
import BMRFields from "../../components/calculators/BMRFields";
import {getBasicBodyParametersFrom} from "../../utils/CalcUtils";
import {SEXES} from "../../components/calculators/BasicBodyParameters";

function getBMR(BMRData) {
    // Według wzoru Mifflina-St Jeora,
    return BMRData.sex === SEXES.WOMEN
        ? 10 * BMRData.weight + 6.25 * BMRData.height - 5 * BMRData.age - 161
        : 10 * BMRData.weight + 6.25 * BMRData.height - 5 * BMRData.age + 5;
}

function getTDEE(
    BMR,
    activity
){
    return BMR * activity;
}

function getCaloriesReduction(TDEE, goal) {
    return TDEE + goal;
}

export function getFullBMRStatistics(BMRData) {
    const bmr = getBMR(BMRData);
    const tdee = getTDEE(bmr, BMRData.activity);
    const caloriesReduction = getCaloriesReduction(tdee, BMRData.goal);

    return {
        bmr,
        tdee,
        caloriesReduction
    };
}

function CalcBMR() {
    const actionData = useActionData();
    return (
        <>
            <RouterForm method='post'>
                <BMRFields/>
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
                                <p>Minimalne zapotrzebowanie (BMR) wynosi: {actionData.bmr}</p>
                                <p>Z uwzględnieniem treningów: {actionData.tdee.toFixed(2)}</p>
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

export function getBMRDataFrom(formData) {
    return {
        ...getBasicBodyParametersFrom(formData),
        activity: parseFloat(formData.get('activity')),
        goal: parseInt(formData.get('goal'))
    };
}

export async function action({request}) {
    const data = await request.formData();
    const BMRData = getBMRDataFrom(data);

    const BMRStatistics = getFullBMRStatistics(BMRData);

    return json(BMRStatistics);
}