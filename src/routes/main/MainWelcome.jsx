import './MainWelcome.module.css';
import { useSearchParams } from 'react-router-dom';
import AlertComponent from '../../components/alerts/AlertComponent';

function MainWelcome() {
    // TODO: Maybe change content depending on auth status
    const [searchParams] = useSearchParams();
    const loginSuccess = searchParams.get('login-success');
    const message = loginSuccess !== null
        ? 'Logowanie ukończone pomyślnie.'
        : '';

    return (
        <>
            <div>
                <AlertComponent message={message} showTrigger={null}/>
                <h1>Witaj w aplikacji!</h1>
                <p style={{fontSize: '20px'}}>
                    Cieszę się, że zdecydowałeś/aś się skorzystać z aplikacji.
                </p>
            </div>
        </>
    );
}

export default MainWelcome;