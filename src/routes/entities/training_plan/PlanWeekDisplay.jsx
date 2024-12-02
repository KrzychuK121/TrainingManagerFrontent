import {Col, Row} from 'react-bootstrap';
import {useLoaderData} from 'react-router-dom';
import AlertComponent from '../../../components/alerts/AlertComponent';
import PlanDayDisplay from '../../../components/entities/training_plan/PlanDayDisplay';
import {useMessageParams} from '../../../hooks/UseMessageParam';
import {sendDefaultRequest} from '../../../utils/CRUDUtils';
import {NO_TRAINING_DAY, TRAINING_DONE} from '../training/TrainingTrainApp';

function PlanWeekDisplay() {
    const loadedData = useLoaderData();
    const plans = loadedData && loadedData.hasOwnProperty('plans')
        ? loadedData.plans[0]
        : null;
    const schedules = plans.schedules;
    const weekdays = loadedData && loadedData.hasOwnProperty('weekdays')
        ? loadedData.weekdays
        : null;

    const {messages: infoMessages} = useMessageParams(
        [
            {
                messageParam: NO_TRAINING_DAY,
                displayIfSuccess: 'Nie masz na dzisiaj zaplanowanego żadnego treningu.'
            },
            {
                messageParam: TRAINING_DONE,
                displayIfSuccess: 'Wykonałeś już dzisiejszy trening. Możesz go podejrzeć w "Statystyki treningów".'
            }
        ]
    );

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
                    infoMessages && infoMessages.map(
                        message => (
                            <AlertComponent
                                key={message}
                                message={message}
                                showTrigger={null}
                                variant='primary'
                            />
                        )
                    )
                }
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
            </Row>
        </>
    );
}

export default PlanWeekDisplay;

export async function loader() {
    return await sendDefaultRequest('plans/week');
}