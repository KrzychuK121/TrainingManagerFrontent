import { NavDropdown } from 'react-bootstrap';
import classes from './MainNavigation.module.css';

function OperationsDropdown() {
    return (
        <NavDropdown
            title='Zarządzaj zestawami'
            menuVariant='dark'
            className={`${classes.menuLinkDropdown}`}
        >
            <NavDropdown.ItemText>Treningi</NavDropdown.ItemText>
            <NavDropdown.Item href='@{/training}'>Wyświetl</NavDropdown.Item>
            <NavDropdown.Item href='@{/training/create}'>Stwórz</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.ItemText>Ćwiczenia</NavDropdown.ItemText>
            <NavDropdown.Item href='/main/exercise'>Wyświetl</NavDropdown.Item>
            <NavDropdown.Item href='@{/exercise/create}'>Stwórz</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.ItemText>Plany treningowe</NavDropdown.ItemText>
            <NavDropdown.Item href='@{/plans}'>Wyświetl wszystkie</NavDropdown.Item>
            <NavDropdown.Item href='@{/plans/week}'>Wyświetl aktywny</NavDropdown.Item>
            <NavDropdown.Item href='@{/plans/week/create}'>Stwórz</NavDropdown.Item>
        </NavDropdown>
    );
}

export default OperationsDropdown;