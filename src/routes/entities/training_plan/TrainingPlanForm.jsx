import { Col, Row } from 'react-bootstrap';
import { Form as RouterForm, useLoaderData } from 'react-router-dom';
import PlanDayAssign from '../../../components/entities/training_plan/PlanDayAssign';
import SubmitButton from '../../../components/form/SubmitButton';
import { sendDefaultParallelRequests, sendSaveRequest } from '../../../utils/CRUDUtils';
import { createObjFromEntries } from '../../../utils/EntitiesUtils';

function TrainingPlanForm({method = 'post'}) {
    const loadedData = useLoaderData();
    const {allTrainings, weekdays} = loadedData;

    return (
        <>
            {/*<AlertComponent />*/}
            <RouterForm method={method}>
                <Row className='justify-content-center'>
                    {
                        weekdays.map(
                            ({weekday, weekdayDisplay}) => (
                                <Col key={weekday} sm={3}>
                                    <PlanDayAssign
                                        allTrainings={allTrainings}
                                        weekday={weekday}
                                        weekdayDisplay={weekdayDisplay}
                                    />
                                </Col>
                            )
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

export async function loader() {
    const data = await sendDefaultParallelRequests(
        ['training/all', 'weekdays/read']
    );

    try {
        const [allTrainings, weekdays] = data;

        return {
            allTrainings,
            weekdays
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