import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classes from './DropdownLink.module.css';

function DropdownLink({to, children}) {
    return (
        <Link
            to={to}
            className={classes.link}
        >
            <NavDropdown.Item as='span'>
                {children}
            </NavDropdown.Item>
        </Link>
    );
}

export default DropdownLink;