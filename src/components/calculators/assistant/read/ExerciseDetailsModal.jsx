import {Button, Modal} from "react-bootstrap";
import ExerciseTable from "../../../entities/exercise/ExerciseTable";

function ExerciseDetailsModal(
    {
        show,
        setShow,
        exercises
    }
) {
    function closeHandler() {
        setShow(false);
    }

    return (
        <>
            <Modal
                show={show}
                onHide={closeHandler}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Ćwiczenia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ExerciseTable
                        exercises={exercises}
                        optionsMapper={null}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeHandler}>
                        Zamknij
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ExerciseDetailsModal;