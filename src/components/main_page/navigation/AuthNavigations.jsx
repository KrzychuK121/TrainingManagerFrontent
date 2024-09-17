import { Button, Navbar } from 'react-bootstrap';
import { Form } from 'react-router-dom';

function AuthNavigations({classes}) {
    const name = 'admin';
    const surname = 'admin';

    return (
        <>

            <Navbar.Text
                className="text-capitalize"
            >
                Witaj {name} {surname}!
            </Navbar.Text>
            <Form method="post" action="/main/logout">
                <Button
                    type="submit"
                    className={`nav-link ${classes.menuLink}`}
                    variant="link"
                >
                    Wyloguj się
                </Button>
            </Form>
        </>
    );
}

export default AuthNavigations;