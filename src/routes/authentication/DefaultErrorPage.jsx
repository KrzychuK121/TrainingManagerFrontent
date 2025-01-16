import {useRouteError} from "react-router-dom";
import classes from './DefaultErrorPage.module.css';

function DefaultErrorPage() {
    const routeError = useRouteError();

    return (
        <>
            <div className={classes.errorHeader}>
                <h1>Wystąpił błąd.</h1>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
                <div className={classes.errorMessage}>
                    <span>{routeError.message}</span>
                </div>
            </div>
        </>
    );
}

export default DefaultErrorPage;