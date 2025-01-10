import {Col, Row} from 'react-bootstrap';
import {Form as RouterForm, redirect, useActionData, useSubmit} from 'react-router-dom';
import AlertComponent from '../../../components/alerts/AlertComponent';
import DefaultFormField from '../../../components/form/DefaultFormField';
import SubmitButton from '../../../components/form/SubmitButton';
import useFormValidation from '../../../hooks/UseFormValidation';
import {createObjFromEntries} from '../../../utils/EntitiesUtils';

import defaultClasses from '../../Default.module.css';
import {DOMAIN} from "../../../utils/URLUtils";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import {useState} from "react";

function Register() {
    const METHOD = 'POST';
    const actionData = useActionData();
    const submit = useSubmit();
    const [captchaToken, setCaptchaToken] = useState(null);
    const [captchaError, setCaptchaError] = useState(null);

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

                        <div className='m-2'>
                            <HCaptcha
                                sitekey='77668068-9f9e-43b6-8e06-5f941a6c22b8'
                                onVerify={(token) => setCaptchaToken(token)}
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