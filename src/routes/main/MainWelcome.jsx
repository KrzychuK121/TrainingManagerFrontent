import './MainWelcome.module.css';
import { useSearchParams } from 'react-router-dom';
import AlertComponent from '../../components/alerts/AlertComponent';

function loginSuccessPresent(loginSuccess) {
    return loginSuccess !== null;
}

function MainWelcome() {
    // TODO: Maybe change content depending on auth status
    const [searchParams] = useSearchParams();
    const loginSuccess = searchParams.get('login-success');

    return (
        <>
            <div>
                <AlertComponent
                    message='Logowanie ukończone pomyślnie.'
                    displayCondition={loginSuccessPresent(loginSuccess)}
                    autoClose={false}
                />
                <h1>Witaj w aplikacji!</h1>
                <p style={{fontSize: '20px'}}>
                    Cieszę się, że zdecydowałeś/aś się skorzystać z aplikacji.
                </p>
            </div>
        </>
    );
}

export default MainWelcome;