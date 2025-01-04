import {useEffect, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {useFetcher} from 'react-router-dom';
import classes from './DeleteModal.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCanArrowUp} from "@fortawesome/free-solid-svg-icons";
import {Tooltip} from "@mui/material";

/**
 * This modal will ask user to confirm delete operation.
 *
 * @param action witch action should be triggered when submitting the delete form
 * @param deleteEntityName name of entity to delete. Default "element"
 * @param setActionData setter to save response error message and pass it to parent component
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
        setActionData = null,
        children = null
    }
) {
    const fetcher = useFetcher();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!setActionData)
            return;

        setActionData(fetcher.data);
    }, [fetcher, setActionData]);

    function closeHandler() {
        setShow(false);
    }

    function deleteHandler() {
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
                    <fetcher.Form
                        method='delete'
                        action={action}
                    >
                        <Button
                            type='submit'
                            variant='danger'
                            onClick={closeHandler}
                        >
                            Usuń
                        </Button>
                    </fetcher.Form>
                </Modal.Footer>
            </Modal>
            <Tooltip
                title='Usuń'
                placement='top'
                enterDelay={250}
                leaveDelay={400}
            >
                <Button
                    variant='primary'
                    className='m-1'
                    onClick={deleteHandler}
                >
                    <FontAwesomeIcon icon={faTrashCanArrowUp} />
                </Button>
            </Tooltip>
        </>
    );
}

export default DeleteModal;