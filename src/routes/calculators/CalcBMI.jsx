import {Row} from 'react-bootstrap';
import {Form as RouterForm, json, useActionData} from 'react-router-dom';
import SubmitButton from '../../components/form/SubmitButton';
import BMIFields from "../../components/calculators/BMIFields";
import {getBasicBodyParametersFrom} from "../../utils/CalcUtils";
import {SEXES} from "../../components/calculators/assistant/write/BasicBodyParameters";

const BMI_CATEGORIES = {
    UNDERWEIGHT: 'Niedowaga',
    NORMAL_WEIGHT: 'waga prawidłowa',
    OVERWEIGHT: 'nadwaga',
    OBESITY: 'otyłość'
};

function getBMICategoryWoman(age, bmi) {
    if (age >= 12 && age <= 13) {
        if (bmi < 16.5) return BMI_CATEGORIES.UNDERWEIGHT;
        else if (bmi <= 22.0) return BMI_CATEGORIES.NORMAL_WEIGHT;
        else if (bmi <= 27.0) return BMI_CATEGORIES.OVERWEIGHT;
        else return BMI_CATEGORIES.OBESITY;
    } else if (age >= 14 && age <= 15) {
        if (bmi < 17.0) return BMI_CATEGORIES.UNDERWEIGHT;
        else if (bmi <= 23.5) return BMI_CATEGORIES.NORMAL_WEIGHT;
        else if (bmi <= 28.5) return BMI_CATEGORIES.OVERWEIGHT;
        else return BMI_CATEGORIES.OBESITY;
    } else if (age >= 16 && age <= 17) {
        if (bmi < 17.5) return BMI_CATEGORIES.UNDERWEIGHT;
        else if (bmi <= 24.9) return BMI_CATEGORIES.NORMAL_WEIGHT;
        else if (bmi <= 29.9) return BMI_CATEGORIES.OVERWEIGHT;
        else return BMI_CATEGORIES.OBESITY;
    } else if (age >= 18 && age <= 24) {
        if (bmi < 18.5) return BMI_CATEGORIES.UNDERWEIGHT;
        else if (bmi <= 24.9) return BMI_CATEGORIES.NORMAL_WEIGHT;
        else if (bmi <= 29.9) return BMI_CATEGORIES.OVERWEIGHT;
        else return BMI_CATEGORIES.OBESITY;
    } else if (age >= 25 && age <= 34) {
        if (bmi < 18.5) return BMI_CATEGORIES.UNDERWEIGHT;
        else if (bmi <= 24.9) return BMI_CATEGORIES.NORMAL_WEIGHT;
        else if (bmi <= 29.9) return BMI_CATEGORIES.OVERWEIGHT;
        else return BMI_CATEGORIES.OBESITY;
    } else if (age >= 35 && age <= 44) {
        if (bmi < 18.5) return BMI_CATEGORIES.UNDERWEIGHT;
        else if (bmi <= 24.9) return BMI_CATEGORIES.NORMAL_WEIGHT;
        else if (bmi <= 29.9) return BMI_CATEGORIES.OVERWEIGHT;
        else return BMI_CATEGORIES.OBESITY;
    } else if (age >= 45 && age <= 54) {
        if (bmi < 18.5) return BMI_CATEGORIES.UNDERWEIGHT;
        else if (bmi <= 24.9) return BMI_CATEGORIES.NORMAL_WEIGHT;
        else if (bmi <= 29.9) return BMI_CATEGORIES.OVERWEIGHT;
        else return BMI_CATEGORIES.OBESITY;
    } else if (age >= 55 && age <= 64) {
        if (bmi < 18.5) return BMI_CATEGORIES.UNDERWEIGHT;
        else if (bmi <= 24.9) return BMI_CATEGORIES.NORMAL_WEIGHT;
        else if (bmi <= 29.9) return BMI_CATEGORIES.OVERWEIGHT;
        else return BMI_CATEGORIES.OBESITY;
    } else if (age >= 65 && age <= 74) {
        if (bmi < 18.5) return BMI_CATEGORIES.UNDERWEIGHT;
        else if (bmi <= 24.9) return BMI_CATEGORIES.NORMAL_WEIGHT;
        else if (bmi <= 29.9) return BMI_CATEGORIES.OVERWEIGHT;
        else return BMI_CATEGORIES.OBESITY;
    } else if (age >= 75 && age <= 84) {
        if (bmi < 18.5) return BMI_CATEGORIES.UNDERWEIGHT;
        else if (bmi <= 25.9) return BMI_CATEGORIES.NORMAL_WEIGHT;
        else if (bmi <= 30.9) return BMI_CATEGORIES.OVERWEIGHT;
        else return BMI_CATEGORIES.OBESITY;
    } else if (age >= 85 && age <= 90) {
        if (bmi < 18.5) return BMI_CATEGORIES.UNDERWEIGHT;
        else if (bmi <= 26.9) return BMI_CATEGORIES.NORMAL_WEIGHT;
        else if (bmi <= 31.9) return BMI_CATEGORIES.OVERWEIGHT;
        else return BMI_CATEGORIES.OBESITY;
    } else if (age > 90) {
        if (bmi < 18.5) return BMI_CATEGORIES.UNDERWEIGHT;
        else if (bmi <= 27.9) return BMI_CATEGORIES.NORMAL_WEIGHT;
        else if (bmi <= 32.9) return BMI_CATEGORIES.OVERWEIGHT;
        else return BMI_CATEGORIES.OBESITY;
    } else
        return 'nieprawidłowy wiek';
}

function getBMICategoryMen(age, bmi) {
    if (age >= 12 && age <= 13) {
        if (bmi < 17.0) return BMI_CATEGORIES.UNDERWEIGHT;
        else if (bmi <= 23.0) return BMI_CATEGORIES.NORMAL_WEIGHT;
        else if (bmi <= 27.5) return BMI_CATEGORIES.OVERWEIGHT;
        else return BMI_CATEGORIES.OBESITY;
    } else if (age >= 14 && age <= 15) {
        if (bmi < 17.5) return BMI_CATEGORIES.UNDERWEIGHT;
        else if (bmi <= 24.0) return BMI_CATEGORIES.NORMAL_WEIGHT;
        else if (bmi <= 29.0) return BMI_CATEGORIES.OVERWEIGHT;
        else return BMI_CATEGORIES.OBESITY;
    } else if (age >= 16 && age <= 17) {
        if (bmi < 18.0) return BMI_CATEGORIES.UNDERWEIGHT;
        else if (bmi <= 25.4) return BMI_CATEGORIES.NORMAL_WEIGHT;
        else if (bmi <= 30.0) return BMI_CATEGORIES.OVERWEIGHT;
        else return BMI_CATEGORIES.OBESITY;
    } else if (age >= 18 && age <= 24) {
        if (bmi < 18.5) return BMI_CATEGORIES.UNDERWEIGHT;
        else if (bmi <= 25.4) return BMI_CATEGORIES.NORMAL_WEIGHT;
        else if (bmi <= 30.0) return BMI_CATEGORIES.OVERWEIGHT;
        else return BMI_CATEGORIES.OBESITY;
    } else if (age >= 25 && age <= 34) {
        if (bmi < 18.5) return BMI_CATEGORIES.UNDERWEIGHT;
        else if (bmi <= 25.4) return BMI_CATEGORIES.NORMAL_WEIGHT;
        else if (bmi <= 30.0) return BMI_CATEGORIES.OVERWEIGHT;
        else return BMI_CATEGORIES.OBESITY;
    } else if (age >= 35 && age <= 44) {
        if (bmi < 18.5) return BMI_CATEGORIES.UNDERWEIGHT;
        else if (bmi <= 25.4) return BMI_CATEGORIES.NORMAL_WEIGHT;
        else if (bmi <= 30.0) return BMI_CATEGORIES.OVERWEIGHT;
        else return BMI_CATEGORIES.OBESITY;
    } else if (age >= 45 && age <= 54) {
        if (bmi < 18.5) return BMI_CATEGORIES.UNDERWEIGHT;
        else if (bmi <= 25.4) return BMI_CATEGORIES.NORMAL_WEIGHT;
        else if (bmi <= 30.0) return BMI_CATEGORIES.OVERWEIGHT;
        else return BMI_CATEGORIES.OBESITY;
    } else if (age >= 55 && age <= 64) {
        if (bmi < 18.5) return BMI_CATEGORIES.UNDERWEIGHT;
        else if (bmi <= 25.4) return BMI_CATEGORIES.NORMAL_WEIGHT;
        else if (bmi <= 30.0) return BMI_CATEGORIES.OVERWEIGHT;
        else return BMI_CATEGORIES.OBESITY;
    } else if (age >= 65 && age <= 74) {
        if (bmi < 18.5) return BMI_CATEGORIES.UNDERWEIGHT;
        else if (bmi <= 25.4) return BMI_CATEGORIES.NORMAL_WEIGHT;
        else if (bmi <= 30.0) return BMI_CATEGORIES.OVERWEIGHT;
        else return BMI_CATEGORIES.OBESITY;
    } else if (age >= 75 && age <= 84) {
        if (bmi < 18.5) return BMI_CATEGORIES.UNDERWEIGHT;
        else if (bmi <= 26.4) return BMI_CATEGORIES.NORMAL_WEIGHT;
        else if (bmi <= 31.0) return BMI_CATEGORIES.OVERWEIGHT;
        else return BMI_CATEGORIES.OBESITY;
    } else if (age >= 85 && age <= 90) {
        if (bmi < 18.5) return BMI_CATEGORIES.UNDERWEIGHT;
        else if (bmi <= 27.0) return BMI_CATEGORIES.NORMAL_WEIGHT;
        else if (bmi <= 32.0) return BMI_CATEGORIES.OVERWEIGHT;
        else return BMI_CATEGORIES.OBESITY;
    } else if (age > 90) {
        if (bmi < 18.5) return BMI_CATEGORIES.UNDERWEIGHT;
        else if (bmi <= 28.0) return BMI_CATEGORIES.NORMAL_WEIGHT;
        else if (bmi <= 33.0) return BMI_CATEGORIES.OVERWEIGHT;
        else return BMI_CATEGORIES.OBESITY;
    } else
        return 'nieprawidłowy wiek';
}

function calculateBMI(weight, height) {
    return (weight / (height * height)).toFixed(2);
}

export function getBMICategoryBy(BMIData) {
    const BMI = calculateBMI(BMIData.weight, BMIData.height);

    return BMIData.sex === SEXES.WOMEN
        ? getBMICategoryWoman(BMIData.age, BMI)
        : getBMICategoryMen(BMIData.age, BMI);
}

function CalcBMI() {
    const actionData = useActionData();

    return (
        <>
            <RouterForm method='post'>
                <Row>
                    <BMIFields />
                </Row>
                <div className='d-flex justify-content-center'>
                    <SubmitButton
                        display='Policz BMI'
                        submittingDisplay='Liczę BMI'
                    />
                </div>
                <div className='d-flex justify-content-center'>
                    {
                        actionData && (
                            <div>
                                <p>Twoje BMI wynosi: {actionData.BMI}</p>
                                <p>Kategoria BMI: <span className='text-capitalize'>{actionData.BMICategory}</span></p>
                            </div>
                        )
                    }
                </div>
            </RouterForm>
        </>
    );
}

export default CalcBMI;

export async function action({request}) {
    const data = await request.formData();
    const BMIDataObject = getBasicBodyParametersFrom(data);
    BMIDataObject.height = BMIDataObject.height / 100;

    const BMI = calculateBMI(BMIDataObject.weight, BMIDataObject.height);
    const BMICategory = BMIDataObject.sex === SEXES.WOMEN
        ? getBMICategoryWoman(BMIDataObject.age, BMI)
        : getBMICategoryMen(BMIDataObject.age, BMI);

    return json(
        {
            BMI,
            BMICategory
        }
    );
}