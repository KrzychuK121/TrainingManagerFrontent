import { Col, Row } from 'react-bootstrap';
import { Form as RouterForm, useLoaderData } from 'react-router-dom';
import PlanDayAssign from '../../../components/entities/training_plan/PlanDayAssign';
import SubmitButton from '../../../components/form/SubmitButton';
import { sendDefaultParallelRequests } from '../../../utils/CRUDUtils';

function TrainingPlanForm({method = 'post'}) {
    const loadedData = useLoaderData();
    const {allTrainings, weekdays} = loadedData;

    return (
        <>
            {/*<AlertComponent />*/}
            <RouterForm
                method={method}
                // th:object='${plansWrite}'
            >
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
                <Row className='justify-content-center'>
                    <SubmitButton
                        display='Zapisz'
                        submittingDisplay='Zapisuję'
                    />
                </Row>
            </RouterForm>
        </>
    );
}

export default TrainingPlanForm;

export async function loader() {
    const [allTrainings, weekdays] = await sendDefaultParallelRequests(
        ['training/all', 'weekdays/read']
    );

    return {
        allTrainings,
        weekdays
    };
    /*const [
        trainingsResponse,
        weekdaysResponse
    ] = await Promise.all([
        fetch('http://localhost:8080/api/training'),
        fetch('http://localhost:8080/api/weekdays/read')
    ]);

    const [allTrainings, weekdays] = await Promise.all([
        trainingsResponse.json(),
        weekdaysResponse.json()
    ]);

    return json(
        {
            allTrainings,
            weekdays
        }
    );*/
}