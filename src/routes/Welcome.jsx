import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import classes from './Welcome.module.css';

function Welcome() {
    return (
        <Container fluid id={classes.welcomeContainer}>
            <header className='row justify-content-center align-items-center fixed-top h-25'>
                <Col
                    id={classes.nag}
                    md={6}
                >
                    Witaj w aplikacji<br />
                    TrainingManager
                </Col>
            </header>
            <Row className='justify-content-center align-items-center fixed-bottom h-75'>
                <Col md={6}>
                    <div id={classes.welcomeDesc}>
                        <p>
                            Dzięki tej aplikacji możesz stworzyć swój wymarzony trening oraz kontrolować jego przebieg.
                        </p>
                        <p>
                            Kliknij <a href='/glowna'>tutaj</a> aby przejść do strony głównej.
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Welcome;