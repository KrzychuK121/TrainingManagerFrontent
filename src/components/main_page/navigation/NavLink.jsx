import { Nav } from 'react-bootstrap';
import mainNavClasses from './MainNavigation.module.css';
import classes from './NavLink.module.css';

function NavLink({label, href, className = mainNavClasses.menuLink}) {
    return (
        <Nav.Link href={href} style={{alignSelf: 'center'}}>
            <span className={`${className} ${classes.navTitle}`}> {label}</span>
        </Nav.Link>
    );
}

export default NavLink;