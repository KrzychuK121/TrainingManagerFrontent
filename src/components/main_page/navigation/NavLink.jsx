import { Link } from 'react-router-dom';
import mainNavClasses from './MainNavigation.module.css';
import classes from './NavLink.module.css';

function NavLink({label, href, className = mainNavClasses.menuLink}) {
    return (
        <Link
            to={href}
            className={classes.navLink}
            style={{alignSelf: 'center'}}
        >
            <span className={`${className} ${classes.navTitle}`}> {label}</span>
        </Link>
    );
}

export default NavLink;