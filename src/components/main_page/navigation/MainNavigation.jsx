import {Container, Nav, Navbar} from 'react-bootstrap';
import {Link, useRouteLoaderData} from 'react-router-dom';

import AuthNavigations from './AuthNavigations';
import CalcDropdown from './CalcDropdown';
import classes from './MainNavigation.module.css';
import NavLink from './NavLink';
import NonAuthNavigations from './NonAuthNavigations';
import OperationsDropdown from './OperationsDropdown';

function MainNavigation() {
    const isAuthenticated = useRouteLoaderData('root');
    return (
        <Container as='header' fluid id={classes.menuContainer}>
            <nav id='menu'>
                <Navbar
                    expand='lg'
                    data-bs-theme='dark'
                    style={{padding: 0}}
                >
                    <Navbar.Brand>
                        <article
                            className={`${classes.menuContainerComponent} ${classes.brandDesc}`}
                        >
                            <img src='/img/icon-scaled.png' alt='icon.png' style={{paddingRight: '20px'}}/>
                            <span>
                                <Link
                                    to={'/main'}
                                    className={`${classes.menuLink} ${classes.logoTitleLink}`}
                                >
                                    Trening
                                </Link>
                            </span>
                        </article>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='navbar-links'/>
                    <Navbar.Collapse
                        id='navbar-links'
                        className='justify-content-center'
                    >
                        <Nav className={classes.menuContainerComponent}>
                            <NavLink
                                label='Zacznij trening!'
                                href='/main/training/train'
                            />
                            <NavLink
                                label='Statystyki treningów'
                                href='/main/workout-statistics/all'
                            />
                            <OperationsDropdown/>
                            <CalcDropdown/>
                            {
                                isAuthenticated
                                    ? <AuthNavigations classes={classes}/>
                                    : <NonAuthNavigations/>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </nav>
        </Container>
    );
}

export default MainNavigation;