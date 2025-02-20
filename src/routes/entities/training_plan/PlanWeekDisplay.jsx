import {Col, Row} from 'react-bootstrap';
import {useLoaderData} from 'react-router-dom';
import AlertComponent from '../../../components/alerts/AlertComponent';
import PlanDayDisplay from '../../../components/entities/training_plan/PlanDayDisplay';
import {useMessageParams} from '../../../hooks/UseMessageParam';
import {defaultAuthHandler, defaultHeaders} from '../../../utils/CRUDUtils';
import {NO_TRAINING_DAY, TRAINING_DONE} from '../training/TrainingTrainApp';
import {DOMAIN} from "../../../utils/URLUtils";

function PlanWeekDisplay() {
    const loadedData = useLoaderData();
    const plans = loadedData && loadedData.hasOwnProperty('plans')
        ? loadedData.plans[0]
        : null;
    const schedules = plans && plans.schedules;
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
                    plans
                     ? (
                         weekdays.map(
                            ({weekday, weekdayDisplay}) => (
                                <Col
                                    key={weekday}
                                    sm={3}
                                    className='my-3'
                                >
                                    <PlanDayDisplay
                                        planToDisplay={getScheduleBy(weekday)}
                                        weekdayDisplay={weekdayDisplay}
                                    />
                                </Col>
                            )
                        )
                    )
                    : (
                        <Row className='h3 justify-content-center'>
                            <span>Nie posiadasz aktywnej rutyny treningowej.</span>
                        </Row>
                    )
                }
            </Row>
        </>
    );
}

export default PlanWeekDisplay;

export async function loader() {
    const response = await fetch(
        `${DOMAIN}/plans/week`,
        {
            headers: defaultHeaders()
        }
    );

    const handledResponse = await defaultAuthHandler(response);
    if (handledResponse)
        return handledResponse;

    if(response.status === 404)
        return {};

    return response.json();
}