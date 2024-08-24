import { Form as RouterForm } from 'react-router-dom';
import { Form, Col, Row, Button } from 'react-bootstrap';
import defaultClasses from '../../Default.module.css';

function LoginPage(){
    return (
        <Row className='justify-content-center'>
            <Col sm={5}>
                <RouterForm method='POST'>
                    <fieldset className={defaultClasses.authForms}>
                        <legend>Logowanie</legend>
                        <Form.Group>
                            <Form.Label className='form-label' htmlFor='username'>Login:</Form.Label>
                            <Form.Control type='text' name='username' className='form-control' id='username'/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='form-label' htmlFor='password'>Hasło:</Form.Label>
                            <Form.Control type='password' name='password' className='form-control' id='password'/>
                        </Form.Group>
                        <Button variant='primary' type='submit'>
                            Zaloguj
                        </Button>
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