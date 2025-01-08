import {Button, Navbar} from 'react-bootstrap';
import {Form} from 'react-router-dom';
import {getFirstName, getLastName} from '../../../utils/AuthUtils';
import {isAdmin, isAtLeastModerator} from "../../../utils/RoleUtils";
import {Tooltip} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShield} from "@fortawesome/free-solid-svg-icons";

function AuthNavigations({classes}) {
    const firstName = getFirstName();
    const lastName = getLastName();
    const welcomeInfo = `Witaj ${firstName} ${lastName}!`;

    return (
        <>
            <Navbar.Text className='text-capitalize' style={{alignSelf: 'center'}}>
                {welcomeInfo} {' '}
                {
                    isAtLeastModerator() && (
                        <Tooltip
                            title={isAdmin() ? 'Administrator' : 'Moderator'}
                            placement='bottom'
                            enterDelay={250}
                            leaveDelay={400}
                        >
                            <FontAwesomeIcon
                                icon={faShield}
                                style={{color: isAdmin() ? 'wheat' : 'lightblue'}}
                            />
                        </Tooltip>
                    )
                }
            </Navbar.Text>
            <Form method='post' action='/main/logout' style={{alignSelf: 'center'}}>
                <Button
                    type='submit'
                    className={`nav-link ${classes.menuLink}`}
                    variant='link'
                >
                    Wyloguj się
                </Button>
            </Form>
        </>
    );
}

export default AuthNavigations;