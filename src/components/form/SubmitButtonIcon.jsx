import {Button, Spinner} from 'react-bootstrap';
import {useNavigation} from 'react-router-dom';
import {useEffect, useState} from "react";
import {Tooltip} from "@mui/material";

function SubmitButtonIcon(
    {
        display,
        tooltip,
        hover = null,
        submittingDisplay = <Spinner animation='grow' size='sm'/>,
        variant = 'primary',
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
        setUpdatedDisplay(submittingDisplay);
        if(onClick)
            onClick(event);
        if(navigation.state !== 'submitting')
            setUpdatedDisplay(display);
    }

    function onHoverInHandler(event) {
        setUpdatedDisplay(hover);
    }

    function onHoverOutHandler(event) {
        setUpdatedDisplay(display);
    }

    return (
        navigation.state !== 'submitting'
            ? (
                <Tooltip
                    title={tooltip}
                    placement='top'
                    enterDelay={250}
                    leaveDelay={400}
                >
                    <Button
                        type='submit'
                        variant={variant}
                        onClick={onClickHandler}
                        onMouseEnter={onHoverInHandler}
                        onMouseLeave={onHoverOutHandler}
                        {...rest}
                    >
                        {updatedDisplay}
                    </Button>
                </Tooltip>
            )
            : <Button variant={variant} disabled {...rest}>{updatedDisplay}</Button>
    );
}

export default SubmitButtonIcon;