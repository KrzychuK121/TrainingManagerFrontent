import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import classes from './Welcome.module.css';

function Welcome() {
    return (
        <body id="body_index">
            <div className="container-fluid">
                <header className="row justify-content-center align-items-center fixed-top h-25">
                    <Col
                        id={classes.nag}
                        md={{ span: 6, offset: 3 }}
                    >
                        Witaj w aplikacji<br />
                        TrainingManager
                    </Col>
                </header>
                <div className="row justify-content-center align-items-center fixed-bottom h-75">
                    <div className="col-3"></div>
                    <div className="col">
                        <div id="go-train-panel">
                            <p>
                                Dzięki tej aplikacji możesz stworzyć swój wymarzony trening oraz kontrolować jego przebieg.
                                <br />
                                    Kliknij <a href="/glowna">tutaj</a> aby przejść do strony głównej.
                            </p>
                        </div>
                    </div>
                    <div className="col-3"></div>
                </div>

            </div>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
            <script src="script/js/lib/bootstrap.min.js"></script>
        </body>
    )
}

export default Welcome;