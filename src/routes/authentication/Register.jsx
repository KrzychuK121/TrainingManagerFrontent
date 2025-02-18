import {Col, Row} from 'react-bootstrap';
import {Form as RouterForm, redirect, useActionData, useSubmit} from 'react-router-dom';
import AlertComponent from '../../components/alerts/AlertComponent';
import DefaultFormField from '../../components/form/DefaultFormField';
import SubmitButton from '../../components/form/SubmitButton';
import useFormValidation from '../../hooks/UseFormValidation';
import {createObjFromEntries} from '../../utils/EntitiesUtils';

import defaultClasses from '../Default.module.css';
import {DOMAIN} from "../../utils/URLUtils";
import {useRef, useState} from "react";
import Captcha from "../../components/Captcha";
import {getSiteKey} from "../../utils/AuthUtils";

function Register() {
    const METHOD = 'POST';
    const actionData = useActionData();
    const submit = useSubmit();
    const [captchaToken, setCaptchaToken] = useState(null);
    const [captchaError, setCaptchaError] = useState(null);
    const captchaRef = useRef(null);

    const useFormValidationObj = useFormValidation(
        actionData,
        errors => {
            if (errors.hasOwnProperty('error')) {
                if(errors.error.includes('Captcha') && errors.error.includes('failed'))
                    return 'Weryfikacja captcha nie powiodła się. Spróbuj ponownie później.';
                return 'Użytkownik już istnieje. Może to Ty?';
            }
            return null;
        }
    );

    function handleRegisterSubmit(event) {
        event.preventDefault();
        if(getSiteKey())
            captchaRef.current.resetCaptcha();
        const formData = new FormData(event.target);
        if(getSiteKey() && !captchaToken)
            setCaptchaError('Kliknij w pole captcha aby przejść weryfikację.');
        formData.set('captchaToken', captchaToken);
        submit(formData, {method: METHOD});
    }

    return (
        <Row className='justify-content-center'>
            <Col sm={5}>
                <AlertComponent
                    message={useFormValidationObj.globalMessage}
                    showTrigger={actionData}
                    variant='danger'
                    closeDelay={5000}
                />
                <AlertComponent
                    message={captchaError}
                    showTrigger={captchaError}
                    messageProperty='error'
                    variant='danger'
                    closeDelay={3000}
                />
                <RouterForm
                    noValidate
                    validated='true'
                    method={METHOD}
                    onSubmit={handleRegisterSubmit}
                >
                    <fieldset className={defaultClasses.authForms}>
                        <legend>Rejestracja</legend>
                        <DefaultFormField
                            label='Login'
                            name='username'
                            useFormValidationObj={useFormValidationObj}
                        />

                        <DefaultFormField
                            label='Hasło'
                            name='password'
                            useFormValidationObj={useFormValidationObj}
                            type='password'
                        />

                        <DefaultFormField
                            label='Powtórz hasło'
                            name='passwordRepeat'
                            useFormValidationObj={useFormValidationObj}
                            type='password'
                        />

                        <DefaultFormField
                            label='Imię'
                            name='firstName'
                            useFormValidationObj={useFormValidationObj}
                        />

                        <DefaultFormField
                            label='Nazwisko'
                            name='lastName'
                            useFormValidationObj={useFormValidationObj}
                        />

                        <div className='my-3'>
                            <Captcha
                                setCaptchaToken={setCaptchaToken}
                                captchaRef={captchaRef}
                            />
                        </div>

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

export const REGISTER_SUCCESS = 'register-success';

export async function action({request}) {
    const data = await request.formData();

    const userToCreate = createObjFromEntries(data);

    const response = await fetch(
        `${DOMAIN}/auth/register`,
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

    return redirect(`/main/login?${REGISTER_SUCCESS}`);
}