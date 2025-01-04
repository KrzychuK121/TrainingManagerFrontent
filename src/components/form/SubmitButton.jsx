import {Button, Spinner} from 'react-bootstrap';
import {useNavigation} from 'react-router-dom';
import {useEffect, useState} from "react";

function SubmitButton(
    {
        display,
        submittingDisplay,
        variant = 'primary',
        icon = null,
        onClick,
        ...rest
    }
) {
    const navigation = useNavigation();
    const [updatedDisplay, setUpdatedDisplay] = useState(display);

    useEffect(() => {
        if(navigation.state !== 'submitting')
            setUpdatedDisplay(display);
    }, [navigation.state]);

    function onClickHandler(event) {
        setUpdatedDisplay(
            <>
                {submittingDisplay}.. {' '}
                <Spinner animation='grow' size='sm'/>
            </>
        );
        if(onClick)
            onClick(event);
        if(navigation.state !== 'submitting')
            setUpdatedDisplay(display);
    }

    return (
        navigation.state !== 'submitting'
            ? <Button
                type='submit'
                variant={variant}
                onClick={onClickHandler}
                {...rest}
            >{updatedDisplay}</Button>
            : <Button variant={variant} disabled {...rest}>{updatedDisplay}</Button>
    );
}

export default SubmitButton;