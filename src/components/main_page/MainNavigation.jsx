import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useRouteLoaderData } from 'react-router-dom';

import AuthNavigations from './AuthNavigations';
import classes from './MainNavigation.module.css';
import NonAuthNavigations from './NonAuthNavigations';

function MainNavigation() {
    const isAuthenticated = useRouteLoaderData('root');
    return (
        <Container as='header' fluid id={classes.menuContainer}>
            <nav id='menu'>
                <Navbar expand='lg' data-bs-theme='dark'>
                    <Navbar.Brand>
                        <article id={classes.brandDesc} className={classes.menuContainerComponent}>
                            <img src='/img/icon-scaled.png' alt='icon.png' style={{paddingRight: '20px'}}/>
                            <span>Trening</span>
                        </article>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='navbar-links'/>
                    <Navbar.Collapse
                        id='navbar-links'
                        className='justify-content-center'
                    >
                        <Nav className={classes.menuContainerComponent}>
                            <Nav.Link href='/training' className={classes.menuLink}>
                                Zacznij trening!
                            </Nav.Link>
                            <NavDropdown
                                title='Zarządzaj zestawami'
                                menuVariant='dark'
                                id={classes.menuLinkDropdown}
                            >
                                <NavDropdown.ItemText>Treningi</NavDropdown.ItemText>
                                <NavDropdown.Item href='@{/training}'>Wyświetl</NavDropdown.Item>
                                <NavDropdown.Item href='@{/training/create}'>Stwórz</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.ItemText>Ćwiczenia</NavDropdown.ItemText>
                                <NavDropdown.Item href='@{/exercise}'>Wyświetl</NavDropdown.Item>
                                <NavDropdown.Item href='@{/exercise/create}'>Stwórz</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.ItemText>Plany treningowe</NavDropdown.ItemText>
                                <NavDropdown.Item href='@{/plans}'>Wyświetl wszystkie</NavDropdown.Item>
                                <NavDropdown.Item href='@{/plans/week}'>Wyświetl aktywny</NavDropdown.Item>
                                <NavDropdown.Item href='@{/plans/week/create}'>Stwórz</NavDropdown.Item>
                            </NavDropdown>
                            {
                                isAuthenticated
                                    ? <AuthNavigations classes={classes}/>
                                    : <NonAuthNavigations classes={classes}/>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </nav>
        </Container>
    );
}

export default MainNavigation;