import { NavDropdown } from 'react-bootstrap';
import classes from './MainNavigation.module.css';

function CalcDropdown() {
    return (
        <>
            <NavDropdown
                title='Kalkulatory'
                menuVariant='dark'
                className={`${classes.menuLinkDropdown}`}
            >
                <NavDropdown.Item href='/main/calc/BMI'>BMI</NavDropdown.Item>
                <NavDropdown.Item href='/main/calc/BMR'>BMR</NavDropdown.Item>
            </NavDropdown>
        </>
    );
}

export default CalcDropdown;