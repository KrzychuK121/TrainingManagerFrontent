import {NavDropdown} from 'react-bootstrap';
import DropdownLink from './DropdownLink';
import classes from './MainNavigation.module.css';
import {isUser} from "../../../utils/RoleUtils";

function OperationsDropdown() {
    return (
        <NavDropdown
            title='Zarządzaj zestawami'
            menuVariant='dark'
            className={`${classes.menuLinkDropdown}`}
        >
            <NavDropdown.ItemText>Treningi</NavDropdown.ItemText>
            <DropdownLink to='/main/training'>Wyświetl</DropdownLink>
            <DropdownLink to='/main/training/create'>Stwórz</DropdownLink>
            <NavDropdown.Divider/>
            <NavDropdown.ItemText>Ćwiczenia</NavDropdown.ItemText>
            <DropdownLink to='/main/exercise'>Wyświetl</DropdownLink>
            <DropdownLink to='/main/exercise/create'>Stwórz</DropdownLink>
            <NavDropdown.Divider/>
            <NavDropdown.ItemText>Plany treningowe</NavDropdown.ItemText>
            <DropdownLink to='/main/plans'>Wyświetl wszystkie</DropdownLink>
            {
                isUser() && (
                    <>
                        <DropdownLink to='/main/plans/week'>Wyświetl aktywny</DropdownLink>
                        <DropdownLink to='/main/plans/create'>Stwórz</DropdownLink>
                    </>
                )
            }
        </NavDropdown>
    );
}

export default OperationsDropdown;