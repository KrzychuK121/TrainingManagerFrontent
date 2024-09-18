import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Form as RouterForm, redirect, useActionData } from 'react-router-dom';
import AlertComponent from '../../../components/alerts/AlertComponent';
import InputField from '../../../components/form/InputField';
import SubmitButton from '../../../components/form/SubmitButton';

import defaultClasses from '../../Default.module.css';

function getValidations(actionData) {
    if (actionData === undefined)
        return undefined;

    return actionData.hasOwnProperty('error')
        ? undefined
        : actionData;
}

function setGlobalError(actionData, message, setMessage) {
    if (actionData === undefined)
        setMessage(null);
    else if (actionData.hasOwnProperty('status') && actionData.status === 500)
        setMessage('Wystąpił błąd serwera.');
    else if (actionData.hasOwnProperty('error'))
        setMessage('Użytkownik już istnieje. Może to Ty?');
}

function Register() {
    const actionData = useActionData();
    const [errorMessage, setErrorMessage] = useState(null);
    const validations = getValidations(actionData);

    useEffect(
        () => setGlobalError(actionData, errorMessage, setErrorMessage),
        [actionData]
    );

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
                <AlertComponent
                    message={errorMessage}
                    variant='danger'
                    displayCondition={errorMessage !== null}
                    closeDelay={5000}
                />
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

                        <SubmitButton
                            display='Zarejestruj się'
                            submittingDisplay='Rejestruję'
                        />
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