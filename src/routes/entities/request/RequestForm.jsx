import {Form as RouterForm, json, useActionData} from "react-router-dom";
import {Col, Form, Row} from 'react-bootstrap'
import DefaultFormField from "../../../components/form/DefaultFormField";
import useFormValidation from "../../../hooks/UseFormValidation";
import FormField from "../../../components/form/FormField";
import SubmitButton from "../../../components/form/SubmitButton";
import {createObjFromEntries, getEntityParamGetter} from "../../../utils/EntitiesUtils";
import AlertComponent from "../../../components/alerts/AlertComponent";
import {DOMAIN} from "../../../utils/URLUtils";
import {defaultHeaders} from "../../../utils/CRUDUtils";

function RequestForm() {
    const actionData = useActionData();
    const getFromActionData = getEntityParamGetter(actionData);
    const useFormValidationObj = useFormValidation(actionData);
    const {
        globalMessage,
        getValidationProp,
        getValidationMessages
    } = useFormValidationObj;

    const message = getFromActionData('message');

    return (
        <>
            <AlertComponent
                message={globalMessage}
                showTrigger={actionData}
                variant='danger'
                closeDelay={5000}
                scrollOnTrigger={true}
            />
            <AlertComponent
                message={message}
                showTrigger={actionData}
                closeDelay={3000}
            />
            <h1>Zgłoszenie do administracji</h1>
            <p>
                Masz jakąś ważną prośbę do administracji?
                Napisz zgłoszenie by mogli zająć się Twoją sprawą.
            </p>
            <hr/>
            <RouterForm method='POST'>
                <Row>
                    <Col sm={4}>
                        <DefaultFormField
                            label='Tytuł'
                            name='title'
                            useFormValidationObj={useFormValidationObj}
                            defaultValue={null}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <FormField
                            label='Opis'
                            errorMessages={getValidationMessages('description')}
                        >
                            <Form.Control
                                id='description'
                                name='description'
                                as='textarea'
                                {...getValidationProp('description')}
                            />
                        </FormField>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <SubmitButton
                            display='Zapisz'
                            submittingDisplay='Zapisuję'
                        />
                    </Col>
                </Row>
            </RouterForm>
        </>
    );
}

export default RequestForm;

export async function action({request}) {
    const data = await request.formData();
    const dataObject = createObjFromEntries(
        data,
        {
            title: null,
            description: null
        },
    );

    const response = await fetch(
        `${DOMAIN}/user-request`,
        {
            method: request.method,
            headers: defaultHeaders(),
            body: JSON.stringify(dataObject)
        }
    );

    if(response.status === 400)
        return json({error: 'Istnieje już zgłoszenie o podanym tytule i opisie.'});
    if(response.status !== 204)
        return await response.json();

    return json(
        {
            message: `Utworzono nowe zgłoszenie!`
        },
        {status: 201}
    );
}