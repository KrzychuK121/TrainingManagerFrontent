import classes from './LoadingScreen.module.css';
import {Spinner} from "react-bootstrap";
import {useNavigation} from "react-router-dom";
import {useEffect, useState} from "react";

function LoadingScreen() {
    const navigation = useNavigation();
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        let timeout;

        if (navigation.state !== 'idle')
            timeout = setTimeout(() => setShowSpinner(true), 10);
        else {
            clearTimeout(timeout);
            setShowSpinner(false);
        }

        return () => clearTimeout(timeout);
    }, [navigation.state]);

    if(!showSpinner)
        return <></>;

    return (
        <div className={classes.loadingScreen}>
            <Spinner />
        </div>
    );
}

export default LoadingScreen;