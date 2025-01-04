import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Tooltip} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";

function EditButton(
    {
        moveTo
    }
) {
    return (
        <Link to={moveTo}>
            <Tooltip
                title='Edytuj'
                placement='top'
                enterDelay={250}
                leaveDelay={400}
            >
                <Button
                    variant='primary'
                    className='m-1'
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
            </Tooltip>
        </Link>
    );
}

export default EditButton;