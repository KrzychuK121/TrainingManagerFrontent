import CheckboxButton from "../../CheckboxButton";
import {Card, Col, Form} from "react-bootstrap";
import {useState} from "react";
import styles from './BodyPartControls.module.css';

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
    const [advanceLevel, setAdvanceLevel] = useState(3);

    function getLastWorkoutAnswer() {
        if(lastWorkout === 0)
            return 'W tym tygodniu.';
        if(lastWorkout > 0 && lastWorkout < 5)
            return `${lastWorkout} tygodnii temu.`;
        return 'Dawniej niż miesiąc temu.';
    }

    function getAdvanceLevelAnswer() {
        switch(advanceLevel) {
            case 1:
                return 'zerowe (w ogóle nie ćwiczyłem)';
            case 2:
                return 'niewielkie (parę treningów)';
            case 3:
                return 'trudne do określenia (ćwiczyłem od czasu do czasu)';
            case 4:
                return 'regularne (częsty element mojego treningu)';
            case 5:
                return 'duże (skupiłem się głównie na tej partii ciała)';
            default:
                throw new Error('undefined advanceLevel value in getAdvanceLevelAnswer');
        }
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
                            className='text-capitalize'
                            setCheckedArr={setCheckedArr}
                            onChange={() => setShowAdditionalControls(!showAdditionalControls)}
                        />
                    </Card.Title>
                    <Card.Body>
                        <h3 style={{fontSize: '22px'}}>Dodatkowe dane</h3>
                        <hr/>
                        <div className={styles.questionsContainer}>
                            <div className='my-2'>
                                <p>
                                    Jakie było Twoje zaangażowanie do trenowania tej partii mięśni do tej pory?<br />
                                    - Moje zaangażowanie określiłbym jako {getAdvanceLevelAnswer()}.
                                </p>
                            </div>
                            <Form.Range
                                name={`${bodyPart}-advanceLevel`}
                                value={advanceLevel}
                                min={1} max={5}
                                disabled={!showAdditionalControls}
                                onChange={
                                    (event) => setAdvanceLevel(
                                        parseInt(event.currentTarget.value)
                                    )
                                }
                            />

                            <div className='my-2'>
                                <p>
                                    Kiedy był ostatni trening tej partii mięśni?<br />
                                    - {getLastWorkoutAnswer()}
                                </p>
                            </div>
                            <Form.Range
                                name={`${bodyPart}-lastTrained`}
                                value={lastWorkout}
                                min={0} max={5}
                                disabled={!showAdditionalControls}
                                onChange={
                                    (event) => setLastWorkout(
                                        parseInt(event.currentTarget.value)
                                    )
                                }
                            />
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
}

export default BodyPartControls;