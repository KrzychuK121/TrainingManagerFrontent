import { Col, Row } from 'react-bootstrap';
import { Form as RouterForm, useLoaderData } from 'react-router-dom';
import PlanDayAssign from '../../../components/entities/training_plan/PlanDayAssign';
import SubmitButton from '../../../components/form/SubmitButton';
import { defaultHeaders, getIdPath, sendDefaultParallelRequests } from '../../../utils/CRUDUtils';
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
    const trainingScheduleId = getIdPath(params);
    const data = await request.formData();
    const fromEntries = createObjFromEntries(data);

    const transformedObj = {};

    Object.keys(fromEntries).forEach(
        formField => {
            const [property, day] = formField.split('-');
            if (!transformedObj[day])
                transformedObj[day] = null;

            if (fromEntries[formField]) {
                if (transformedObj[day] === null)
                    transformedObj[day] = {};
                transformedObj[day][property] = fromEntries[formField];
            }
        }
    );

    console.log(transformedObj);

    const response = await fetch(
        `http://localhost:8080/api/plans${trainingScheduleId}`,
        {
            method: request.method,
            headers: defaultHeaders(),
            body: JSON.stringify(transformedObj)
        }
    );

    return null;
}