import './MainWelcome.module.css';
import { Alert } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

function MainWelcome() {
    // TODO: Maybe change content depending on auth status
    const [searchParams] = useSearchParams();
    const loginSuccess = searchParams.get('login-success');

    return (
        <>
            <div>
                {
                    loginSuccess !== null && (
                        <Alert variant="success">
                            Logowanie ukończone pomyślnie.
                        </Alert>
                    )
                }
                <h1>Witaj w aplikacji!</h1>
                <p style={{fontSize: '20px'}}>
                    Cieszę się, że zdecydowałeś/aś się skorzystać z aplikacji.
                </p>
            </div>
        </>
    );
}

export default MainWelcome;