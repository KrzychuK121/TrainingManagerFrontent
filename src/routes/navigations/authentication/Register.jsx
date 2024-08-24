import { Form as RouterForm, useActionData } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';

import defaultClasses from '../../Default.module.css';
import InputField from '../../../components/form/InputField';


function Register(){
    const validations = useActionData();

    function getValidation(valProp){
        if(validations === undefined)
            return undefined;
        if(validations === null)
            return undefined;

        return validations.hasOwnProperty(valProp)
            ? validations[valProp]
            : null;
    }

    return (
        <Row className='justify-content-center'>
            <Col sm={5}>
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
                        <Button type='submit' >Zarejestruj się</Button>
                    </fieldset>
                </RouterForm>
            </Col>
        </Row>
    );
}

export default Register;

export async function action() {
    return {
        username: 'Nazwa użytkownika jest wymagana'
    };
}