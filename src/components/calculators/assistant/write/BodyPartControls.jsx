import CheckboxButton from "../../CheckboxButton";
import {Card, Col, Form} from "react-bootstrap";
import {useState} from "react";

function BodyPartControls(
    {
        bodyPart,
        bodyPartDisplay,
        defaultChecked = false,
        setCheckedArr
    }
) {
    const [showAdditionalControls, setShowAdditionalControls] = useState(defaultChecked);
    const [lastWorkout, setLastWorkout] = useState(1);

    function getLastWorkoutAnswer() {
        if(lastWorkout === 0)
            return 'W tym tygodniu.';
        if(lastWorkout > 0 && lastWorkout < 5)
            return `${lastWorkout} tygodnii temu.`;
        return 'Dawniej nisz miesiąc temu.';
    }

    return (
        <>
            <Col md={4} lg={3}>
                <Card
                    className={'my-2'}
                    style={{backgroundColor: showAdditionalControls ?  '#a7c957' : '#8d99ae'}}
                >
                    <Card.Title
                        className='text-center'
                    >
                        <CheckboxButton
                            id={`checkbox-${bodyPart}`}
                            label={bodyPartDisplay}
                            value={bodyPart}
                            defaultChecked={defaultChecked}
                            setCheckedArr={setCheckedArr}
                            onChange={() => setShowAdditionalControls(!showAdditionalControls)}
                        />
                    </Card.Title>
                    <Card.Body>
                        <h3>Dodatkowe dane</h3>
                        <hr/>

                        <div className='my-2'>
                            <span>Maksymalna ilość kg jaką jesteś w stanie udźwignąć ćwicząć tę partię mięśni:</span>
                        </div>
                        <Form.Control
                            name={`maxKg-${bodyPart}`}
                            disabled={!showAdditionalControls}
                            style={{backgroundColor: showAdditionalControls ? '#fff' : '#727C8E'}}
                        />

                        <div className='my-2'>
                            <p>
                                Kiedy był ostatni trening tej partii mięśni?<br />
                                - {getLastWorkoutAnswer()}
                            </p>
                        </div>
                        <Form.Range
                            name={`lastTrained-${bodyPart}`}
                            value={lastWorkout}
                            disabled={!showAdditionalControls}
                            min={0} max={5}
                            onChange={(event) => setLastWorkout(parseInt(event.currentTarget.value))}
                        />
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
}

export default BodyPartControls;