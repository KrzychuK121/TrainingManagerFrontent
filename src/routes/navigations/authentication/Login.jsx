import { Button, Col, Form, Row } from 'react-bootstrap';
import { Form as RouterForm, redirect } from 'react-router-dom';
import { login } from '../../../utils/AuthUtils';
import defaultClasses from '../../Default.module.css';

function LoginPage() {
    return (
        <Row className="justify-content-center">
            <Col sm={5}>
                <RouterForm method="POST">
                    <fieldset className={defaultClasses.authForms}>
                        <legend>Logowanie</legend>
                        <Form.Group>
                            <Form.Label
                                className="form-label"
                                htmlFor="username"
                                column={true}
                            >
                                Login:
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                className="form-control"
                                id="username"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label
                                className="form-label"
                                htmlFor="password"
                                column={true}
                            >
                                Hasło:
                            </Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                className="form-control"
                                id="password"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Zaloguj
                        </Button>
                        <Form.Check
                            id="remember-me"
                            name="remember-me"
                            label="Zapamiętaj mnie"
                        />
                    </fieldset>
                </RouterForm>
            </Col>
        </Row>
    );
}

export default LoginPage;

export async function action({request}) {
    const formData = await request.formData();

    const userCredentials = {
        'username': formData.get('username'),
        'password': formData.get('password')
    };
    await login(userCredentials);

    return redirect('/main');
}