import MobileCarousel from "../../MobileCarousel";
import TrainingPlanOptions from "./TrainingPlanOptions";
import TrainingScheduleCard from "./TrainingScheduleCard";
import {isAtLeastModerator} from "../../../utils/RoleUtils";

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
                                <div style={{fontSize: '18px'}}>
                                    <div>
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
                                    </div>

                                    <div className='mt-3'>
                                        <span className='fw-bold'>Opcje: </span>
                                        <TrainingPlanOptions
                                            plan={plan}
                                            setActionData={setActionData}
                                        />
                                    </div>
                                </div>
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