import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShield} from "@fortawesome/free-solid-svg-icons";
import {Tooltip} from "@mui/material";

function AdministrationIcon(
    {
        title,
        iconColor
    }
) {
    return (
        <Tooltip
            title={title}
            placement='bottom'
            enterDelay={250}
            leaveDelay={400}
        >
            <FontAwesomeIcon
                icon={faShield}
                style={iconColor && {color: iconColor}}
            />
        </Tooltip>
    )
}

export default AdministrationIcon;