import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Tooltip} from "@mui/material";

function UserOptionButton(
    {
        variant,
        icon,
        tooltip,
    }
) {
    return (
        <Tooltip
            title={tooltip}
            placement='bottom'
            enterDelay={100}
            leaveDelay={200}
        >
            <Button
                variant={variant}
                className='mx-1'
                type='submit'
            >
                <FontAwesomeIcon icon={icon} />
            </Button>
        </Tooltip>
    );
}

export default UserOptionButton;