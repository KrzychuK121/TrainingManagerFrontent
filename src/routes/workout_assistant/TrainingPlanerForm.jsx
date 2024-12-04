import {useState} from "react";
import {Form as RouterForm} from 'react-router-dom';
import {ButtonGroup, Form} from "react-bootstrap";
import RadioButton from "../../components/calculators/RadioButton";
import MuscleGrowControls, {getMuscleGrowDataFrom} from "../../components/calculators/MuscleGrowControls";
import WeightReductionControls, {
    getWeightReductionDataFrom
} from "../../components/calculators/WeightReductionControls";
import SubmitButton from "../../components/form/SubmitButton";
import {defaultHeaders, handleResponseUnauthorized} from "../../utils/CRUDUtils";
import {DOMAIN} from "../../utils/URLUtils";

const TRAINING_AIM = {
    MUSCLE_GROW: 'MUSCLE_GROW',
    WEIGHT_REDUCTION: 'WEIGHT_REDUCTION'
}

function TrainingPlanerForm() {
    const [checkedValues, setCheckedValues] = useState([]);
    const [chosenRadioValues, setChosenRadioValues] = useState(
        {
            trainingAim: TRAINING_AIM.MUSCLE_GROW
        }
    );
    const [workoutDays, setWorkoutDays] = useState(1);

    return (
        <>
            <RouterForm method='post'>
                <h1>Formularz asystenta treningowego</h1>
                <p>
                    Uzupełnij formularz a asystent treningowy automatycznie zaplanuje trening dostosowany do Twoich potrzeb
                    za Ciebie.
                </p>

                <hr/>
                <h2>Cel treningu</h2>
                <ButtonGroup className='mb-2'>
                    <RadioButton
                        id='muscleGrowCheck'
                        groupId='trainingAim'
                        label='Wzrost mięśni'
                        value={TRAINING_AIM.MUSCLE_GROW}
                        chosenRadioValues={chosenRadioValues}
                        setChosenRadioValues={setChosenRadioValues}
                    />

                    <RadioButton
                        id='weightReductionCheck'
                        groupId='trainingAim'
                        label='Redukcja wagi'
                        value={TRAINING_AIM.WEIGHT_REDUCTION}
                        chosenRadioValues={chosenRadioValues}
                        setChosenRadioValues={setChosenRadioValues}
                    />
                </ButtonGroup>

                <hr/>
                <h2>Parametry nieosobowe</h2>
                <Form.Label column={true}>
                    <p>
                        Ile dni w tygodniu chcesz ćwiczyć?<br/>
                        - Mogę ćwiczyć {workoutDays} {workoutDays === 1 ? 'raz' : 'razy'} w tygodniu.
                    </p>
                    <Form.Range
                        name='workoutDays'
                        min={1}
                        max={7}
                        defaultValue={workoutDays}
                        onChange={e => setWorkoutDays(parseInt(e.target.value))}
                    />
                </Form.Label>

                {
                    chosenRadioValues.trainingAim === 'MUSCLE_GROW'
                        ? <MuscleGrowControls/>
                        : <WeightReductionControls/>
                }

                <div>
                    <SubmitButton
                        display='Zaplanuj rutynę'
                        submittingDisplay='Planuję rutynę'
                    />
                </div>
            </RouterForm>
        </>
    );
}

export default TrainingPlanerForm;

export async function action({request}) {
    const data = await request.formData();
    const trainingAim = data.get('trainingAim');
    const workoutDays = parseInt(data.get('workoutDays'));

    const weightReductionData = trainingAim === TRAINING_AIM.WEIGHT_REDUCTION
        ? getWeightReductionDataFrom(data)
        : null;
    const muscleGrowData = trainingAim === TRAINING_AIM.MUSCLE_GROW
        ? getMuscleGrowDataFrom(data)
        : null;

    const formattedData = {
        muscleGrow: muscleGrowData,
        weightReduction: weightReductionData,
        workoutDays
    };

    console.log(formattedData);

    const response = await fetch(
        `${DOMAIN}/assistant`,
        {
            method: request.method,
            headers: defaultHeaders(),
            body: JSON.stringify(formattedData)
        }
    );

    const handled = handleResponseUnauthorized(response);
    if(handled)
        return handled;

    return response;
}