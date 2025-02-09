import {useRef, useState} from "react";
import {Form as RouterForm, useActionData, useLoaderData, useSubmit} from 'react-router-dom';
import {ButtonGroup, Col, Form, Row} from "react-bootstrap";
import RadioButton from "../../RadioButton";
import MuscleGrowControls, {getMuscleGrowDataFrom, validation as muscleGrowValidation} from "./MuscleGrowControls";
import WeightReductionControls, {
    calcWeeksToLossWeight,
    getWeightReductionDataFrom,
    validation as weightReductionValidation
} from "./WeightReductionControls";
import SubmitButton from "../../../form/SubmitButton";
import {defaultAuthHandler, defaultHeaders, sendDefaultRequest} from "../../../../utils/CRUDUtils";
import {DesktopTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {pl} from "date-fns/locale";
import ConfirmModal from "../../../entities/crud/ConfirmModal";
import useFormValidation from "../../../../hooks/UseFormValidation";
import AlertComponent from "../../../alerts/AlertComponent";
import {DOMAIN} from "../../../../utils/URLUtils";
import {TextField} from "@mui/material";

const { format} = require('date-fns');

const TRAINING_AIM = {
    MUSCLE_GROW: 'MUSCLE_GROW',
    WEIGHT_REDUCTION: 'WEIGHT_REDUCTION'
}

function TrainingPlanerForm() {
    const FORM_METHOD = 'post';
    const submit = useSubmit();
    const loadedData = useLoaderData();
    const actionData = useActionData();
    const {bodyParts} = loadedData;
    const {globalMessage} = useFormValidation(actionData);

    const [earliestTrainingStart, setEarliestTrainingStart] = useState(Date.now());
    const [latestTrainingStart, setLatestTrainingStart] = useState(Date.now());

    const [chosenRadioValues, setChosenRadioValues] = useState(
        {
            trainingAim: TRAINING_AIM.MUSCLE_GROW
        }
    );
    const [chosenBodyParts, setChosenBodyParts] = useState([]);

    const [workoutDays, setWorkoutDays] = useState(1);
    const [weeksToLoseWeight, setWeeksToLoseWeight] = useState(null);
    const [confirmWorkoutDays, setConfirmWorkoutDays] = useState(false);

    const formRef = useRef(null);

    function getFormattedDate(date) {
        if(!date)
            return null;
        return format(date, 'HH:mm');
    }

    function injectTimeData(formData){
        formData.set('earliestTrainingStart', getFormattedDate(earliestTrainingStart));
        formData.set('latestTrainingStart', getFormattedDate(latestTrainingStart));
    }

    function handleMuscleGrowSubmit(formData) {
        chosenBodyParts.forEach(
            bodyPart => {
                if(!formData.has('bodyParts'))
                    formData.set('bodyParts', bodyPart);
                else formData.append('bodyParts', bodyPart)
            }
        );
        return true;
    }

    function handleWeightReductionSubmit(formData) {
        const newWeeksToLoseWeight = calcWeeksToLossWeight(
            {goal: formData.get('goal')},
            workoutDays
        );
        setWeeksToLoseWeight(newWeeksToLoseWeight);

        if(workoutDays !== 7){
            setConfirmWorkoutDays(true);
            return false;
        }

        formData.append('weeksToLoseWeight', newWeeksToLoseWeight);
        return true;
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        injectTimeData(formData);

        switch(chosenRadioValues.trainingAim) {
            case TRAINING_AIM.MUSCLE_GROW:
                if(!handleMuscleGrowSubmit(formData))
                    return;
                break;
            case TRAINING_AIM.WEIGHT_REDUCTION:
                if(!handleWeightReductionSubmit(formData))
                    return;
                break;
            default:
                throw Error('Something went wrong');
        }


        submit(formData, {method: FORM_METHOD});
    }

    return (
        <>
            <AlertComponent
                message={globalMessage}
                showTrigger={actionData}
                variant='danger'
                closeDelay={5000}
                scrollOnTrigger={true}
            />
            <RouterForm
                method={FORM_METHOD}
                onSubmit={handleFormSubmit}
                ref={formRef}
            >
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
                        - Mogę ćwiczyć {' '}
                        {
                            workoutDays !== 7
                                ? `${workoutDays} ${workoutDays === 1 ? 'raz' : 'razy'} w tygodniu`
                                : 'cały tydzień'
                        }.
                    </p>
                    <Form.Range
                        name='workoutDays'
                        min={1}
                        max={7}
                        defaultValue={workoutDays}
                        onChange={e => setWorkoutDays(parseInt(e.target.value))}
                    />
                </Form.Label>

                <hr/>
                <h2>Preferowany czas treningu</h2>
                <p>
                    Podaj ramy czasowe, w których chciałbyś rozpoczynać swoje treningi.
                </p>
                <Row>
                    <Col
                        className='py-2 d-flex justify-content-center'
                        style={{backgroundColor: 'white'}}
                    >
                        <LocalizationProvider
                            dateAdapter={AdapterDateFns}
                            adapterLocale={pl}
                        >
                            <DesktopTimePicker
                                label='Najwcześniejszy:'
                                name='earliestTrainingStart'
                                value={earliestTrainingStart}
                                onChange={setEarliestTrainingStart}
                                renderInput={params => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Col>
                    <Col
                        className='py-2 d-flex justify-content-center'
                        style={{backgroundColor: 'white'}}
                    >
                        <LocalizationProvider
                            dateAdapter={AdapterDateFns}
                            adapterLocale={pl}
                        >
                            <DesktopTimePicker
                                label='Najpóźniejszy:'
                                name='latestTrainingStart'
                                value={latestTrainingStart}
                                onChange={setLatestTrainingStart}
                                renderInput={params => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Col>
                </Row>

                {
                    chosenRadioValues.trainingAim === 'MUSCLE_GROW'
                        ? (
                            <MuscleGrowControls
                                bodyParts={bodyParts}
                                setCheckedArr={setChosenBodyParts}
                            />
                        )
                        : (
                            <>
                                <ConfirmModal
                                    body={
                                        `Odchudzanie zajmie ${weeksToLoseWeight} tygodni. ` +
                                        `Czy na pewno chcesz ćwiczyć ${workoutDays} ${workoutDays === 1 ? 'raz' : 'razy'} w tygodniu?`
                                    }
                                    show={confirmWorkoutDays}
                                    setShow={setConfirmWorkoutDays}
                                    onConfirm={
                                        () => {
                                            const formData = new FormData(formRef.current);
                                            injectTimeData(formData);
                                            formData.append('weeksToLoseWeight', weeksToLoseWeight);
                                            submit(formData, {method: FORM_METHOD});
                                        }
                                    }
                                />
                                <WeightReductionControls/>
                            </>
                        )
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

export async function loader() {
    const response = await sendDefaultRequest('enum/body-part/read');
    if(!response.hasOwnProperty('CARDIO'))
        return response;

    delete response['CARDIO'];
    return {
        bodyParts: response
    };
}

function calcMinutes(time) {
    const split = time.split(':');
    return parseInt(split[0]) * 60 + parseInt(split[1]);
}

export async function action({request}) {
    const data = await request.formData();
    const earliestTrainingStart = data.get('earliestTrainingStart');
    const latestTrainingStart = data.get('latestTrainingStart');

    const trainingAim = data.get('trainingAim');
    const workoutDays = parseInt(data.get('workoutDays'));

    let validationResponse = null;
    switch(trainingAim) {
        case TRAINING_AIM.MUSCLE_GROW: {
            validationResponse = muscleGrowValidation(data);
            break;
        }
        case TRAINING_AIM.WEIGHT_REDUCTION: {
            validationResponse = weightReductionValidation(data);
            break;
        }
    }

    if(validationResponse)
        return validationResponse;

    let bodyParts = data.getAll('bodyParts');

    const weightReductionData = trainingAim === TRAINING_AIM.WEIGHT_REDUCTION
        ? getWeightReductionDataFrom(data)
        : null;
    const muscleGrowData = trainingAim === TRAINING_AIM.MUSCLE_GROW
        ? getMuscleGrowDataFrom(data)
        : null;

    const earliestTimeMinutes = calcMinutes(earliestTrainingStart);
    const latestTimeMinutes = calcMinutes(latestTrainingStart);
    const formattedData = {
        muscleGrow: muscleGrowData,
        weightReduction: weightReductionData,
        workoutDays,
        earliestTrainingStart: earliestTimeMinutes < latestTimeMinutes
            ? earliestTrainingStart
            : latestTrainingStart,
        latestTrainingStart: earliestTimeMinutes < latestTimeMinutes
            ? latestTrainingStart
            : earliestTrainingStart,
        bodyParts: trainingAim === TRAINING_AIM.MUSCLE_GROW
            ? bodyParts
            : null
    };

    const response = await fetch(
        `${DOMAIN}/assistant/create-plan`,
        {
            method: request.method,
            headers: defaultHeaders(),
            body: JSON.stringify(formattedData)
        }
    );

    const handled = await defaultAuthHandler(response);
    if(handled)
        return handled;

    return await response.json();
}