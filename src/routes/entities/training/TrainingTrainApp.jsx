import { Accordion, Col, Row } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';
import classes from './TrainingTrainApp.module.css';

function TrainingTrainApp() {
    const loadedData = useLoaderData();

    const {training} = loadedData;
    const {title, description, exercises} = training;

    let counter = 1;
    const mappedExercises = exercises.map(
        exercise => (
            {i: ++counter, exercise: {...exercise}}
        )
    );

    return (
        <>
            <Row className='justify-content-center'>
                <Col md={6} lg={8}>
                    <h2>{`Tytuł: ${title}`}</h2>
                    <div className='m-0 p-0'>
                        <h3 className='m-0'>Opis</h3>
                        <p className='py-0'>`${description}`</p>
                    </div>
                    <h2>Twój trening zawiera:</h2>
                    <br/>
                    <Accordion flush id='listaCwiczen'>
                        <Accordion.Item eventKey='0' className={classes.listBody}>
                            <Accordion.Header className='h2' id='ha0'></Accordion.Header>
                            <Accordion.Button
                                className='collapsed naglowek-listy'
                                data-bs-target='#id0'
                                aria-expanded='false'
                                aria-controls='id0'
                            >
                                <Row id='buttons' className='justify-content-center w-100'>
                                    <Col md={6}>
                                        <button
                                            id='opt0'
                                            className='opt'
                                            // onClick='|run(*{id})|'
                                        >
                                            START
                                        </button>
                                    </Col>
                                </Row>
                            </Accordion.Button>
                            <Accordion.Collapse
                                eventKey='0'
                                id='id0'
                                className='collapse'
                                aria-labelledby='ha0'
                                data-bs-parent='#listaCwiczen'
                            >
                                <Accordion.Body/>
                            </Accordion.Collapse>
                        </Accordion.Item>
                        {
                            mappedExercises.map(
                                ({i, exercise}) => (
                                    <Accordion.Item eventKey={i} className={classes.listBody}>
                                        <Accordion.Header className='h2' id={`ha${i + 1}`}>
                                            <Accordion.Button
                                                id={`b${i + 1}`}
                                                className={`collapsed ${classes.listHeader}`}
                                                type='button'
                                                data-bs-toggle='collapse'
                                                th:data-bs-target={`'#id${i + 1}'`}
                                                aria-expanded='false'
                                                aria-controls={`id${i + 1}`}
                                            >
                                                <span className='me-1'>
                                                    {`${exercise.name}: ${exercise.rounds} serii `}
                                                    {
                                                        exercise.repetition == 0
                                                            ? exercise.time
                                                            : `${exercise.repetition} powtórzeń`
                                                    }
                                                </span>
                                            </Accordion.Button>
                                        </Accordion.Header>
                                        <Accordion.Collapse
                                            eventKey={i}
                                            id={`id${i + 1}`}
                                            className='collapse'
                                            aria-labelledby={`ha${i + 1}`}
                                            data-bs-parent='#listaCwiczen'
                                        >
                                            <Accordion.Body>
                                                <span>
                                                    {exercise.description}
                                                </span>
                                            </Accordion.Body>
                                        </Accordion.Collapse>
                                    </Accordion.Item>
                                )
                            )
                        }
                    </Accordion>
                    <div id='wynik'></div>
                </Col>
            </Row>

            <footer id='f'>
            </footer>
        </>
    );
}


/*<script>
    function run(trainingId){
    (async function () {
        await DoTraining(trainingId);
    })();
}
</script>
<script src="/script/js/trening.js"></script>*/

export default TrainingTrainApp;

export async function loader() {
    return {
        training: {
            title: '',
            description: '',
            exercises: []
        }
    };
}