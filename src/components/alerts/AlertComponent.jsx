import { useEffect, useRef, useState } from 'react';
import { Alert, Fade } from 'react-bootstrap';

function getMessage(message, messageProperty) {
    if (!(message instanceof Object))
        return message;

    if (!messageProperty || !message.hasOwnProperty(messageProperty))
        return null;
    return message[messageProperty];
}

/**
 * This component renders alert with `message` every time `showTrigger` changes its value.
 * If the `message` is an object, and it contains display message under `messageProperty` then it will be displayed.
 * If `closeDelay` is provided then alert will disappear itself. Otherwise, it will wait until user closes it.
 *
 * @param message string message itself or object with message under `messageProperty` key.
 * @param showTrigger if this value changes, the component will show alert again. Can be null if it should be
 *                    displayed once
 * @param messageProperty property of `message` object that contains alert message to display
 * @param variant styles of alert
 * @param closeDelay if null then alert can be dismissible. Otherwise, alert will hide after time provided here in ms
 * @param scrollOnTrigger scrolls page with animation when true
 * @param rest the rest of `Alert` attributes
 *
 * @returns {JSX.Element} Alert component which will close automatically or can be closed manually.
 * @constructor
 */
function AlertComponent(
    {
        message,
        showTrigger,
        messageProperty = null,
        variant = 'success',
        closeDelay = null,
        scrollOnTrigger = false,
        ...rest
    }
) {
    const [show, setShow] = useState(
        Boolean(getMessage(message, messageProperty))
    );
    const [displayMessage, setDisplayMessage] = useState(getMessage(message, messageProperty));
    const [timeoutId, setTimeoutId] = useState(null);
    const errorRef = useRef();

    useEffect(() => {
        setDisplayMessage(getMessage(message, messageProperty));
    }, [showTrigger, message, messageProperty]);

    useEffect(
        () => {
            setShow(Boolean(displayMessage));
        }, [displayMessage]
    );

    useEffect(() => {
        if (!closeDelay)
            return;

        let timeoutId = null;
        if (show) {
            if (scrollOnTrigger && errorRef.current) {
                const position = errorRef.current.getBoundingClientRect();
                window.scrollTo({
                    top: position.top,
                    behavior: 'smooth'
                });
            }
            timeoutId = setTimeout(
                () => {
                    setDisplayMessage(null);
                },
                closeDelay
            );
            setTimeoutId(timeoutId);
        }

        return () => timeoutId && clearTimeout(timeoutId);
    }, [show, closeDelay]);

    function onCloseHandler() {
        if (timeoutId)
            clearTimeout(timeoutId);
        setDisplayMessage(null);
    }

    return (
        <Alert
            variant={variant}
            show={show}
            dismissible={!closeDelay}
            onClose={onCloseHandler}
            transition={Fade}
            ref={errorRef}
            {...rest}
        >
            {displayMessage}
        </Alert>
    );
}

export default AlertComponent;