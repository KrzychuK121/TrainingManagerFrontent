import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { Form as RouterForm, redirect, useActionData, useNavigation, useSearchParams } from 'react-router-dom';
import { login } from '../../../utils/AuthUtils';
import defaultClasses from '../../Default.module.css';

function getValidationErrComp({error}) {
    return (
        <Alert variant='danger'>
            <span style={{fontWeight: 'bold'}}>{error}</span>
        </Alert>
    );
}

function LoginPage() {
    const data = useActionData();
    const navigation = useNavigation();
    const [searchParams] = useSearchParams();
    const registerSuccess = searchParams.get('register-success');

    return (
        <Row className='justify-content-center'>
            <Col sm={5}>
                {data && getValidationErrComp(data)}
                {
                    registerSuccess !== null && (
                        <Alert variant='success' dismissible>
                            <span style={{fontWeight: 'bold'}}>Rejestracja pomyślna. Możesz zalogować się na nowo utworzone konto.</span>
                        </Alert>
                    )
                }
                <RouterForm method='POST'>
                    <fieldset className={defaultClasses.authForms}>
                        <legend>Logowanie</legend>
                        <Form.Group>
                            <Form.Label
                                className='form-label'
                                htmlFor='username'
                                column={true}
                            >
                                Login:
                            </Form.Label>
                            <Form.Control
                                type='text'
                                name='username'
                                className='form-control'
                                id='username'
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label
                                className='form-label'
                                htmlFor='password'
                                column={true}
                            >
                                Hasło:
                            </Form.Label>
                            <Form.Control
                                type='password'
                                name='password'
                                className='form-control'
                                id='password'
                            />
                        </Form.Group>
                        {
                            navigation.state !== 'submitting'
                                ? <Button variant='primary' type='submit'>
                                    Zaloguj
                                </Button>
                                : <Button variant='primary' type='submit' disabled>
                                    Loguję.. {' '}
                                    <Spinner animation='grow' size='sm'/>
                                </Button>
                        }
                        <Form.Check
                            id='remember-me'
                            name='remember-me'
                            label='Zapamiętaj mnie'
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

    const loginResponse = await login(userCredentials);

    return loginResponse !== null
        ? loginResponse
        : redirect('/main?login-success');
}