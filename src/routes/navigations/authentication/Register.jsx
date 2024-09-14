import { Alert, Button, Col, Row, Spinner } from 'react-bootstrap';
import { Form as RouterForm, redirect, useActionData, useNavigation } from 'react-router-dom';
import InputField from '../../../components/form/InputField';

import defaultClasses from '../../Default.module.css';

function getErrorAlert(message) {
    return <Alert key={message} variant='danger'>{message}</Alert>;
}

function getValidations(actionData) {
    if (actionData === undefined)
        return undefined;

    return actionData.hasOwnProperty('error')
        ? undefined
        : actionData;
}

function getGlobalError(actionData) {
    if (actionData === undefined)
        return undefined;

    if (actionData.hasOwnProperty('status') && actionData.status === 500)
        return getErrorAlert('Wystąpił błąd serwera.');

    return actionData.hasOwnProperty('error')
        ? getErrorAlert('Użytkownik już istnieje. Może to Ty?')
        : null;
}

function Register() {
    const navigation = useNavigation();
    const actionData = useActionData();
    const validations = getValidations(actionData);
    const globalError = getGlobalError(actionData);

    function getValidation(valProp) {
        if (validations === null || validations === undefined)
            return undefined;

        return validations.hasOwnProperty(valProp)
            ? validations[valProp]
            : null;
    }

    return (
        <Row className='justify-content-center'>
            <Col sm={5}>
                {globalError}
                <RouterForm noValidate validated='true' method='POST'>
                    <fieldset className={defaultClasses.authForms}>
                        <legend>Rejestracja</legend>
                        <InputField
                            label='Login'
                            status={getValidation('username')}
                            name='username'
                        />

                        <InputField
                            label='Hasło'
                            status={getValidation('password')}
                            name='password'
                            type='password'
                        />

                        <InputField
                            label='Powtórz hasło'
                            status={getValidation('passwordRepeat')}
                            name='passwordRepeat'
                            type='password'
                        />

                        <InputField
                            label='Imię'
                            status={getValidation('firstName')}
                            name='firstName'
                        />

                        <InputField
                            label='Nazwisko'
                            status={getValidation('lastName')}
                            name='lastName'
                        />
                        {
                            navigation.state !== 'submitting'
                                ? <Button type='submit'>Zarejestruj się</Button>
                                : <Button type='submit' disabled>
                                    Rejestruję.. {' '}
                                    <Spinner animation='grow' size='sm'/>
                                </Button>
                        }

                    </fieldset>
                </RouterForm>
            </Col>
        </Row>
    );
}

export default Register;

export async function action({request}) {
    const data = await request.formData();

    const userToCreate = {
        username: data.get('username'),
        password: data.get('password'),
        passwordRepeat: data.get('passwordRepeat'),
        firstName: data.get('firstName'),
        lastName: data.get('lastName')
    };

    const response = await fetch(
        'http://localhost:8080/api/auth/register',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userToCreate)
        }
    );

    if (response.status !== 204)
        return await response.json();

    return redirect('/main/login?register-success');
}