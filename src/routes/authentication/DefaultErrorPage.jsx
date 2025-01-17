import {Link, useRouteError} from "react-router-dom";
import classes from './DefaultErrorPage.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation, faCircleLeft} from "@fortawesome/free-solid-svg-icons";

function userIsNotLocked(routeError) {
    return !routeError.hasOwnProperty('status')
    || routeError.hasOwnProperty('status') && routeError.status !== 423;
}

function displayMessage(routeError) {
    return routeError.data.message || routeError.message || 'Wystąpił nieoczekiwany błąd.';
}

function DefaultErrorPage() {
    const routeError = useRouteError();
    return (
        <>
            <div className={classes.errorHeader}>
                <h1>Wystąpił błąd.</h1>
            </div>
            <div className='d-flex my-5 justify-content-center align-items-center'>
                <div className={classes.errorMessage}>
                    <div className='d-inline-block' style={{marginRight: '20px'}}>
                        <FontAwesomeIcon
                            icon={faCircleExclamation}
                        />
                    </div>
                    <span>{displayMessage(routeError)}</span>
                    {
                        userIsNotLocked(routeError) && (
                            <>
                                <hr/>
                                <div className='d-inline-block' style={{marginRight: '20px'}}>
                                    <FontAwesomeIcon
                                        icon={faCircleLeft}
                                    />
                                </div>
                                <span>Powrót do <Link to='/main'>strony głównej</Link></span>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default DefaultErrorPage;