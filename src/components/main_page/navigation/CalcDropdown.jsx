import { NavDropdown } from 'react-bootstrap';
import DropdownLink from './DropdownLink';
import classes from './MainNavigation.module.css';

function CalcDropdown() {
    return (
        <>
            <NavDropdown
                title='Kalkulatory'
                menuVariant='dark'
                className={`${classes.menuLinkDropdown}`}
            >
                <DropdownLink to='/main/calc/BMI'>BMI</DropdownLink>
                <DropdownLink to='/main/calc/BMR'>BMR</DropdownLink>
            </NavDropdown>
        </>
    );
}

export default CalcDropdown;