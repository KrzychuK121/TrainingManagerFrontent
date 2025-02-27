import MobileCarousel from "../../MobileCarousel";
import TrainingPlanOptions from "./TrainingPlanOptions";
import TrainingScheduleCard from "./TrainingScheduleCard";
import {isAtLeastModerator} from "../../../utils/RoleUtils";
import {Col, Row} from "react-bootstrap";
import classes from "./TrainingPlanCarousel.module.css";

function TrainingPlanCarousel(
    {
        plans,
        weekdays,
        setActionData
    }
) {
    return (
        <>
            {
                plans.map(
                    plan => {
                        const {
                            id,
                            schedules,
                            active,
                            owner
                        } = plan;

                        return (
                            <div key={`card-plan-${id}`}>
                                <Row
                                    className={`justify-content-between ${classes.wholePlanInfoPanel}`}
                                    style={{fontSize: '18px'}}
                                >
                                    <Col sm={8}>
                                        {
                                            isAtLeastModerator() && (
                                                <div>
                                                    <span className='fw-bold'>Właściciel: </span>
                                                    <span>{owner.username}</span>
                                                </div>
                                            )
                                        }
                                        <div>
                                            <span className='fw-bold'>Aktywny?: </span>
                                            <span>{active ? 'Tak' : 'Nie'}</span>
                                        </div>
                                    </Col>

                                    <Col sm={4} className='d-inline-flex flex-wrap align-content-center'>
                                        <TrainingPlanOptions
                                            plan={plan}
                                            setActionData={setActionData}
                                        />
                                    </Col>
                                </Row>
                                <MobileCarousel>
                                    {
                                        weekdays.map(
                                            ({weekday, weekdayDisplay}) => {
                                                const trainingPresent = schedules.hasOwnProperty(weekday);
                                                const trainingData = {
                                                    title: trainingPresent ? schedules[weekday].trainingTitle : 'Dzień wolny',
                                                    description: trainingPresent
                                                        ? schedules[weekday].trainingDescription
                                                        : 'Wykorzystaj ten czas na regenerację'
                                                };

                                                return (
                                                    <TrainingScheduleCard
                                                        key={`${weekday}-${trainingData.title}`}
                                                        trainingData={trainingData}
                                                        weekdayDisplay={weekdayDisplay}
                                                    />
                                                );
                                            }
                                        )
                                    }
                                </MobileCarousel>
                                <hr />
                            </div>
                        );
                    }
                )
            }
        </>
    );
}

export default TrainingPlanCarousel;