import { Button, Navbar } from 'react-bootstrap';
import { Form } from 'react-router-dom';
import { getFirstName, getLastName } from '../../../utils/AuthUtils';

function AuthNavigations({classes}) {
    const firstName = getFirstName();
    const lastName = getLastName();
    const welcomeInfo = `Witaj ${firstName} ${lastName}!`;

    return (
        <>
            <Navbar.Text className='text-capitalize' style={{alignSelf: 'center'}}>
                {welcomeInfo}
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