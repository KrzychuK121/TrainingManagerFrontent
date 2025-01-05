import {Col, Row} from 'react-bootstrap';
import {Form as RouterForm, redirect, useActionData} from 'react-router-dom';
import AlertComponent from '../../../components/alerts/AlertComponent';
import DefaultFormField from '../../../components/form/DefaultFormField';
import SubmitButton from '../../../components/form/SubmitButton';
import useFormValidation from '../../../hooks/UseFormValidation';
import {createObjFromEntries} from '../../../utils/EntitiesUtils';

import defaultClasses from '../../Default.module.css';
import {DOMAIN} from "../../../utils/URLUtils";

function Register() {
    const actionData = useActionData();

    const useFormValidationObj = useFormValidation(
        actionData,
        errors => {
            if (errors.hasOwnProperty('error'))
                return 'Użytkownik już istnieje. Może to Ty?';
            return null;
        }
    );

    return (
        <Row className='justify-content-center'>
            <Col sm={5}>
                <AlertComponent
                    message={useFormValidationObj.globalMessage}
                    showTrigger={actionData}
                    variant='danger'
                    closeDelay={5000}
                />
                <RouterForm noValidate validated='true' method='POST'>
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