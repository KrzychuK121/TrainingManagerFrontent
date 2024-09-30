import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Form as RouterForm } from 'react-router-dom';
import classes from './DeleteModal.module.css';

/**
 * This modal will ask user to confirm delete operation.
 *
 * @param action witch action should be triggered when submitting the delete form
 * @param deleteEntityName name of entity to delete. Default "element"
 * @param children element or string that will provide more information about entity to delete
 *
 * @returns {JSX.Element} Delete confirmation modal that invokes provided `action` and provided
 *                        information about deleted entity.
 * @constructor
 */
function DeleteModal(
    {
        action,
        deleteEntityName = 'element',
        children = null
    }
) {
    const [show, setShow] = useState(false);

    function closeHandler() {
        setShow(false);
    }

    function onDeleteHandler() {
        setShow(true);
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
                    <Modal.Title>Potwierdź usuwanie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Czy na pewno chcesz usunąć {deleteEntityName}?
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeHandler}>
                        Anuluj
                    </Button>
                    <RouterForm
                        method='delete'
                        action={action}
                    >
                        <Button
                            type='submit'
                            variant='danger'
                        >
                            Usuń
                        </Button>
                    </RouterForm>
                </Modal.Footer>
            </Modal>
            <Button variant='primary' onClick={onDeleteHandler}>
                Usuń
            </Button>
        </>
    );
}

export default DeleteModal;