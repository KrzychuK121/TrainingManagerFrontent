import {useRef} from 'react';
import {Col, Row} from 'react-bootstrap';
import {Form as RouterForm, useActionData, useLoaderData} from 'react-router-dom';
import AlertComponent from '../../../components/alerts/AlertComponent';
import PlanDayAssign from '../../../components/entities/training_plan/PlanDayAssign';
import SubmitButton from '../../../components/form/SubmitButton';
import useClearForm from '../../../hooks/UseClearForm';
import useFormValidation from '../../../hooks/UseFormValidation';
import {createModelLoader, sendDefaultParallelRequests, sendSaveRequest} from '../../../utils/CRUDUtils';
import {createObjFromEntries} from '../../../utils/EntitiesUtils';

function TrainingPlanForm({method = 'post'}) {
    const loadedData = useLoaderData();
    const actionData = useActionData();

    const {allTrainings, weekdays, editData} = loadedData;
    const planEditReadMap = editData
        ? editData['planEditReadMap']
        : null;
    const formRef = useRef();

    const useFormValidationObj = useFormValidation(actionData);
    const {
        globalMessage,
        getValidationProp,
        getValidationMessages
    } = useFormValidationObj;

    const message = actionData && actionData.message
        ? actionData.message
        : null;

    useClearForm(message, formRef);

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
                scrollOnTrigger={true}
            />
            <RouterForm
                method={method}
                ref={formRef}
            >
                <Row className='justify-content-center'>
                    {
                        weekdays.map(
                            ({weekday, weekdayDisplay}) => {
                                const initData = planEditReadMap &&
                                    planEditReadMap.hasOwnProperty(weekday)
                                        ? planEditReadMap[weekday]
                                        : null;
                                return (
                                    <Col key={weekday} sm={3}>
                                        <PlanDayAssign
                                            allTrainings={allTrainings}
                                            weekday={weekday}
                                            weekdayDisplay={weekdayDisplay}
                                            initData={initData}
                                        />
                                    </Col>
                                )
                            }
                        )
                    }
                </Row>
                <div className='d-flex p-2 justify-content-center'>
                    <SubmitButton
                        display='Zapisz'
                        submittingDisplay='Zapisuję'
                        className='d-inline-block'
                    />
                </div>
            </RouterForm>
        </>
    );
}

export default TrainingPlanForm;

export async function loader({params}) {
    const data = await sendDefaultParallelRequests(
        ['training/publicOrOwned', 'weekdays/read']
    );

    try {
        const [allTrainings, weekdays] = data;

        let editData = null;
        if(params.id)
            editData = await createModelLoader(
                'plans/editModel',
                '',
                params,
                'planEditReadMap'
            );

        return {
            allTrainings,
            weekdays,
            editData
        };
    } catch (ex) {
        // if(ex instanceof TypeError) // Might be not useful
        return data;
    }
}

export async function action({request, params}) {
    const data = await request.formData();
    const fromEntries = createObjFromEntries(data);

    const mapData = {};
    const transformedObj = {
        planWriteMap: mapData
    };

    Object.keys(fromEntries).forEach(
        formField => {
            const [property, day] = formField.split('-');
            if (!mapData[day])
                mapData[day] = null;

            if (fromEntries[formField]) {
                if (mapData[day] === null)
                    mapData[day] = {};
                mapData[day][property] = fromEntries[formField];
            }
        }
    );

    return await sendSaveRequest(
        transformedObj,
        'plans',
        '/main/plans',
        params,
        request,
        'nowy plan treningowy'
    );
}