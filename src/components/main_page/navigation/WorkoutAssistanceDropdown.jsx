import {NavDropdown} from "react-bootstrap";
import classes from "./MainNavigation.module.css";
import DropdownLink from "./DropdownLink";
import CalcDropdown from "./CalcDropdown";

function WorkoutAssistanceDropdown() {
    return (
        <NavDropdown
            title='Asystenci treningowi'
            menuVariant='dark'
            className={`${classes.menuLinkDropdown}`}
        >
            <DropdownLink to='/main/workout/statistics'>Statystyki treningów</DropdownLink>
            <NavDropdown.Divider/>
            <DropdownLink to='/main/workout/assistant'>Zaprojektuj trening</DropdownLink>
            <NavDropdown.Divider/>
            <CalcDropdown />
        </NavDropdown>
    );
}

export default WorkoutAssistanceDropdown;