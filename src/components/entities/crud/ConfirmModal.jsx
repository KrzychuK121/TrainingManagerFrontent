import {Button, Modal} from 'react-bootstrap';
import classes from './DeleteModal.module.css';

/**
 * This modal will ask user to confirm any operation.
 * @constructor
 */
function ConfirmModal(
    {
        body,
        show,
        setShow,
        onConfirm
    }
) {
    function closeHandler() {
        setShow(false);
    }

    function onConfirmHandler(event) {
        onConfirm(event);
        closeHandler();
    }

    return (
        <>
            <Modal
                className={classes.deleteModal}
                show={show}
                onHide={closeHandler}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Wymagane potwierdzenie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {body}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeHandler}>
                        Nie
                    </Button>
                    <Button
                        type='submit'
                        variant='primary'
                        onClick={onConfirmHandler}
                    >
                        Tak
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ConfirmModal;