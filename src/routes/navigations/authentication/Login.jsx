import { Col, Form, Row } from 'react-bootstrap';
import { Form as RouterForm, redirect, useActionData, useSearchParams } from 'react-router-dom';
import AlertComponent from '../../../components/alerts/AlertComponent';
import SubmitButton from '../../../components/form/SubmitButton';
import { login } from '../../../utils/AuthUtils';
import defaultClasses from '../../Default.module.css';

function LoginPage() {
    const data = useActionData();
    const [searchParams] = useSearchParams();
    const registerSuccess = searchParams.get('register-success');

    return (
        <Row className='justify-content-center'>
            <Col sm={5}>
                <AlertComponent
                    message={data}
                    messageProperty='error'
                    variant={'danger'}
                    displayCondition={data !== undefined}
                />
                <AlertComponent
                    message='Rejestracja pomyślna. Możesz zalogować się na nowo utworzone konto.'
                    displayCondition={registerSuccess !== null}
                    autoClose={false}
                />
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
                        <SubmitButton
                            display='Zaloguj'
                            submittingDisplay='Loguję'
                        />
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