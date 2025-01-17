import {useRouteError} from "react-router-dom";
import classes from './DefaultErrorPage.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons";

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
                    <span>{routeError.message}</span>
                </div>
            </div>
        </>
    );
}

export default DefaultErrorPage;