import { Col, Row } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';
import PlanDayDisplay from '../../../components/entities/training_plan/PlanDayDisplay';
import { sendDefaultRequest } from '../../../utils/FetchUtils';

function PlanWeekDisplay() {
    const loadedData = useLoaderData();
    const plans = loadedData && loadedData.hasOwnProperty('plans')
        ? loadedData.plans[0]
        : null;
    const schedules = plans.schedules;
    const weekdays = loadedData && loadedData.hasOwnProperty('weekdays')
        ? loadedData.weekdays
        : null;

    function getScheduleBy(weekday) {
        return schedules.hasOwnProperty(weekday)
            ? schedules[weekday]
            : null;
    }

    if (!plans)
        return (
            <Row className='justify-content-center'>
                <span>Użytkownik nie posiada aktywnej rutyny treningowej.</span>
            </Row>
        );

    return (
        <>
            <Row className='row justify-content-center'>
                {
                    weekdays.map(
                        ({weekday, weekdayDisplay}) => (
                            <Col key={weekday} sm={3}>
                                <PlanDayDisplay
                                    planToDisplay={getScheduleBy(weekday)}
                                    weekdayDisplay={weekdayDisplay}
                                />
                            </Col>
                        )
                    )
                }
                {/*<Col
                    sm={3}
                    th:each='weekday: ${T(springweb.training_manager.models.entities.Weekdays).values()}'
                >
                    <div
                        th:replace='~{routine/template :: dayDisplay(${plans.get(weekday)}, ${weekday})}'
                    ></div>
                </Col>*/}
            </Row>
        </>
    );
}

export default PlanWeekDisplay;

export async function loader() {
    return await sendDefaultRequest('plans/week');
}