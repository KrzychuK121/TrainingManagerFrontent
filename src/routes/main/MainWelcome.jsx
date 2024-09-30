import './MainWelcome.module.css';
import AlertComponent from '../../components/alerts/AlertComponent';
import useMessageParam from '../../hooks/UseMessageParam';
import { LOGIN_SUCCESS } from '../navigations/authentication/Login';

function MainWelcome() {
    // TODO: Maybe change content depending on auth status
    const {message} = useMessageParam(
        LOGIN_SUCCESS,
        'Logowanie ukończone pomyślnie.'
    );

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