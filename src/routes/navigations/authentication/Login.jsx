import {Col, Form, Row} from 'react-bootstrap';
import {Form as RouterForm, redirect, useActionData, useSubmit} from 'react-router-dom';
import AlertComponent from '../../../components/alerts/AlertComponent';
import SubmitButton from '../../../components/form/SubmitButton';
import useMessageParam from '../../../hooks/UseMessageParam';
import {login} from '../../../utils/AuthUtils';
import defaultClasses from '../../Default.module.css';
import {REGISTER_SUCCESS} from './Register';
import {getGoBackPath} from "../../../utils/URLUtils";
import {useState} from "react";
import Captcha from "../../../components/Captcha";

function LoginPage() {
    const METHOD = 'POST';
    const data = useActionData();
    const submit = useSubmit();
    const [captchaToken, setCaptchaToken] = useState(null);
    const [captchaError, setCaptchaError] = useState(null);
    const {message: registerSuccessMessage} = useMessageParam(
        REGISTER_SUCCESS,
        'Rejestracja pomyślna. Możesz zalogować się na nowo utworzone konto.'
    );

    function handleLoginSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        if(!captchaToken)
            setCaptchaError('Kliknij w pole captcha aby przejść weryfikację.');
        formData.set('captchaToken', captchaToken);
        submit(formData, {method: METHOD});
    }

    return (
        <Row className='justify-content-center'>
            <Col sm={5}>
                <AlertComponent
                    message={data}
                    showTrigger={data}
                    messageProperty='error'
                    variant='danger'
                    closeDelay={3000}
                />
                <AlertComponent
                    message={captchaError}
                    showTrigger={captchaError}
                    messageProperty='error'
                    variant='danger'
                    closeDelay={3000}
                />
                <AlertComponent message={registerSuccessMessage} showTrigger={null}/>
                <RouterForm
                    method={METHOD}
                    onSubmit={handleLoginSubmit}
                >
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

                        <div className='m-2'>
                            <Captcha setCaptchaToken={setCaptchaToken}/>
                        </div>

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
        'password': formData.get('password'),
        'captchaToken': formData.get('captchaToken')
    };

    const loginResponse = await login(userCredentials);
    return loginResponse !== null
        ? loginResponse
        : redirect(getGoBackPath());
}