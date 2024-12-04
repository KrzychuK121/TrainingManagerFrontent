import {Form} from 'react-bootstrap';
import {useState} from "react";
import BasicBodyParameters from "./BasicBodyParameters";
import {getBMRDataFrom, getFullBMRStatistics} from "../../routes/calculators/CalcBMR";
import {getActivityLevelBy} from "./BMRFields";

function WeightReductionControls() {
    const JUSTIFY_CONTENT = 'start';

    const [goal, setGoal] = useState(2);

    return (
        <>
            <hr/>
            <h2>Parametry osobowe</h2>
            <p>
                Dzięki tym parametrom będziemy w stanie ustalić Twoje zapotrzebowanie kaloryczne.
            </p>
            <BasicBodyParameters justifyContent={JUSTIFY_CONTENT} />
            <Form.Label column={true}>
                <p>
                    Ile (kg) chcesz schudnąć?<br/>
                    - Chcę schudnąć {goal} kg.
                </p>
                <Form.Range
                    name='goal'
                    min={1}
                    max={10}
                    defaultValue={goal}
                    onChange={e => setGoal(parseInt(e.target.value))}
                />
            </Form.Label>
        </>
    );
}

export default WeightReductionControls;

export function getWeightReductionDataFrom(formData) {
    const BMRData = getBMRDataFrom(formData);
    const workoutDays = parseInt(formData.get('workoutDays'));
    BMRData.activity = getActivityLevelBy(workoutDays);

    return getFullBMRStatistics(BMRData);
}