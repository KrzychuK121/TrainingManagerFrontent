import { useEffect, useState } from 'react';
import { Alert, Fade } from 'react-bootstrap';

// FIXME

function getMessage(message, messageProperty) {
    if (!(message instanceof Object))
        return message;

    if (!messageProperty || !message.hasOwnProperty(messageProperty))
        return null;
    return message[messageProperty];
}

function AlertComponent(
    {
        message,
        messageProperty = null,
        variant = 'success',
        displayCondition = true,
        autoClose = true,
        closeDelay = 3000
    }
) {
    let [show, setShow] = useState(displayCondition);
    const [timeoutId, setTimeoutId] = useState(null);

    useEffect(
        () => {
            setShow(displayCondition);
        },
        [displayCondition, message]
    );

    useEffect(() => {
        if (!autoClose)
            return;
        let timeoutId = null;
        if (displayCondition) {
            timeoutId = setTimeout(
                () => setShow(false),
                closeDelay
            );
            setTimeoutId(timeoutId);
        }

        return () => timeoutId && clearTimeout(timeoutId);
    }, [displayCondition, message, autoClose, closeDelay]);

    function onCloseHandler() {
        if (timeoutId)
            clearTimeout(timeoutId);
        setShow(false);
    }

    return (
        displayCondition && (
            <Alert
                variant={variant}
                show={show}
                dismissible={!autoClose}
                onClose={onCloseHandler}
                transition={Fade}
            >
                {getMessage(message, messageProperty)}
            </Alert>
        )
    );
}

export default AlertComponent;