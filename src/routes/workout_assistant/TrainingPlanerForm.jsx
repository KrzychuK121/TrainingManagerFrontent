import {useState} from "react";
import {ButtonGroup} from "react-bootstrap";
import RadioButton from "../../components/calculators/RadioButton";
import MuscleGrowControls from "../../components/calculators/MuscleGrowControls";
import WeightReductionControls from "../../components/calculators/WeightReductionControls";

function TrainingPlanerForm() {
    const [checkedValues, setCheckedValues] = useState([]);
    const [chosenRadioValues, setChosenRadioValues] = useState(
        {
            trainingAim: 'MUSCLE_GROW'
        }
    );

    return (
        <>
            <h1>Formularz asystenta treningowego</h1>
            <p>
                Uzupełnij formularz a asystent treningowy automatycznie zaplanuje trening dostosowany do Twoich potrzeb
                za Ciebie.
            </p>

            <hr />
            <h2>Cel treningu</h2>
            <ButtonGroup className='mb-2'>
                <RadioButton
                    id='muscleGrowCheck'
                    groupId='trainingAim'
                    label='Wzrost mięśni'
                    value='MUSCLE_GROW'
                    chosenRadioValues={chosenRadioValues}
                    setChosenRadioValues={setChosenRadioValues}
                />

                <RadioButton
                    id='weightReductionCheck'
                    groupId='trainingAim'
                    label='Redukcja wagi'
                    value='WEIGHT_REDUCTION'
                    chosenRadioValues={chosenRadioValues}
                    setChosenRadioValues={setChosenRadioValues}
                />
            </ButtonGroup>

            {
                chosenRadioValues.trainingAim === 'MUSCLE_GROW'
                    ? <MuscleGrowControls />
                    : <WeightReductionControls />
            }

        </>
    );
}

export default TrainingPlanerForm;