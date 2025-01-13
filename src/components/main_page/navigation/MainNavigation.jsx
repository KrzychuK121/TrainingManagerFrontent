import {Container, Nav, Navbar} from 'react-bootstrap';
import {Link, useNavigation, useRouteLoaderData} from 'react-router-dom';

import AuthNavigations from './AuthNavigations';
import classes from './MainNavigation.module.css';
import NavLink from './NavLink';
import NonAuthNavigations from './NonAuthNavigations';
import OperationsDropdown from './OperationsDropdown';
import WorkoutAssistanceDropdown from "./WorkoutAssistanceDropdown";
import {isAuthenticated} from "../../../utils/AuthUtils";
import {useEffect, useState} from "react";
import {isAdmin, isAtLeastModerator, isUser} from "../../../utils/RoleUtils";
import CalcDropdown from "./CalcDropdown";

function MainNavigation() {
    const navigation = useNavigation();
    const [userAuthenticated, setUserAuthenticated] = useState(useRouteLoaderData('root'));
    const [expand, setExpand] = useState(false);

    useEffect(() => {
        window.addEventListener(
            'storage',
            () => {
                setUserAuthenticated(isAuthenticated());
            }
        );
    }, []);

    useEffect(() => {
        if(navigation.state === 'loading')
            setExpand(false);
    }, [navigation.state]);

    return (
        <Container
            as='header'
            id={classes.menuContainer}
            fluid
        >
            <nav id='menu'>
                <Navbar
                    expand='lg'
                    data-bs-theme='dark'
                    style={{padding: 0}}
                    expanded={expand}
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
                    <Navbar.Toggle
                        aria-controls='navbar-links'
                        onClick={() => {setExpand(prev => !prev)} }

                    />
                    <Navbar.Collapse
                        id='navbar-links'
                        className='justify-content-center'
                    >
                        <Nav className={classes.menuContainerComponent}>
                            {
                                isUser() && (
                                    <NavLink
                                        label='Zacznij trening!'
                                        href='/main/training/train'
                                    />
                                )
                            }
                            {
                                isAdmin() && (
                                    <NavLink
                                        label='Użytkownicy'
                                        href='/main/admin/users/all'
                                    />
                                )
                            }
                            {isUser() && <WorkoutAssistanceDropdown />}
                            {isAtLeastModerator() && <CalcDropdown />}
                            {isAuthenticated() && <OperationsDropdown/>}
                            {
                                userAuthenticated
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