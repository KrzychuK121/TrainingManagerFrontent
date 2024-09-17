import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Form as RouterForm } from 'react-router-dom';
import classes from './DeleteModal.module.css';

function DeleteModal() {
    const [show, setShow] = useState(false);

    function closeHandler() {
        setShow(false);
    }

    function onDeleteHandler() {
        setShow(true);
    }

    return (
        <>
            <RouterForm
                method='get'
                action='#'
                // sec:authorize="hasRole('ROLE_ADMIN')"
                // th:action='@{/exercise/delete/{id}(id=${exercise.id})}'
            >
                <Modal
                    className={classes.deleteModal}
                    show={show}
                    onHide={closeHandler}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Potwierdź usuwanie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Czy na pewno chcesz usunąć ten element?</Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={closeHandler}>
                            Anuluj
                        </Button>
                        <Button
                            type='submit'
                            variant='danger'
                        >
                            Usuń
                        </Button>
                    </Modal.Footer>
                </Modal>
            </RouterForm>
            <Button variant='primary' onClick={onDeleteHandler}>
                Usuń
            </Button>
        </>
    );
}

export default DeleteModal;