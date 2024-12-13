import {useLoaderData, useNavigate} from "react-router-dom";
import {Accordion, Col, Modal, Row} from "react-bootstrap";
import {sendDefaultRequest} from "../../../utils/CRUDUtils";
import {getIdPath} from "../../../utils/URLUtils";
import {DONE_COLOR, UNDONE_COLOR} from "../../../components/entities/workout_statistics/CustomAppointment";
import StatisticComponent from "../../../components/entities/workout_statistics/StatisticComponent";
import ExerciseItem, {mapExerciseToExerciseItem} from "../../../components/entities/training/train/ExerciseItem";
import {rgbToHex} from "@mui/material";
import {getStatusByFinishedRounds} from "../../../components/entities/training/train/control_panel/ExerciseControls";
import {EXERCISE_STATUS} from "../../entities/training/TrainingTrainApp";

const { format } = require('date-fns');

function formatDisplayDate(done, trainingDay) {
    const toDisplay = `dnia ${trainingDay}`;
    return done
        ? `${toDisplay}, wykonano`
        : `${toDisplay}, nie wykonano`
}

function colorTextByDone(toDisplay, done) {
    return (
        <span style={{color: done ? DONE_COLOR : UNDONE_COLOR}}>
            {toDisplay}
        </span>
    );
}

function mapExercises(training, doneExercises) {
    return training.exercises.map(
        exercise => {
            const mappedExercise = mapExerciseToExerciseItem(exercise);
            if(!Array.isArray(doneExercises) || doneExercises.length === 0){
                mappedExercise.status = EXERCISE_STATUS.NOT_FINISHED;
                return mappedExercise;
            }

            const foundStatistic = doneExercises.find(
                doneExercise => doneExercise.exerciseId === mappedExercise.id
            );
            mappedExercise.finishedRounds = foundStatistic.doneSeries;

            return {
                ...mappedExercise,
                status: getStatusByFinishedRounds(mappedExercise)
            };
        }
    );
}

function StatisticsDetails() {
    const loadedData = useLoaderData();
    const navigate = useNavigate();
    const {
        training,
        doneExercises,
        endDate,
        startDate,
        done
    } = loadedData;

    const exercises = mapExercises(training, doneExercises);

    function hideHandler() {
        navigate(
            '..',
            {relative: 'path'}
        );
    }

    const trainingDay = new Date(startDate);
    const formattedTrainingDay = format(trainingDay, 'dd.MM.yyyy');
    const startTime = format(trainingDay, 'HH:mm:ss');
    const endTime = format(new Date(endDate), 'HH:mm:ss');

    const displayDate = formatDisplayDate(done, formattedTrainingDay);

    return (
        <>
            <Modal
                show
                centered
                onHide={hideHandler}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Statystyki treningu "{training.title}" ({colorTextByDone(displayDate, done)}):
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StatisticComponent
                        label='Tytuł treningu'
                        value={training.title}
                    />

                    <Row className='mb-3'>
                        <Row className='mb-2'>
                            <Col as='span'>
                                Opis treningu:
                            </Col>
                        </Row>
                        <Row>
                            <Col as='span' className={'px-4'}>
                                {training.description}
                            </Col>
                        </Row>
                    </Row>

                    <StatisticComponent
                        label='Trening wykonany'
                        value={
                            colorTextByDone(
                                done ? 'Tak' : 'Nie',
                                done
                            )
                        }
                    />

                    <StatisticComponent
                        label='Dzień treningu'
                        value={formattedTrainingDay}
                    />

                    <StatisticComponent
                        label='Rozpoczęto'
                        value={startTime}
                    />

                    <StatisticComponent
                        label='Zakończono'
                        value={
                            done
                                ? endTime
                                : 'brak'
                        }
                    />

                    <Row>
                        <Col as='span'>
                            Statystyki ćwiczeń:
                        </Col>
                    </Row>
                    <Accordion
                        flush
                        style={{backgroundColor: rgbToHex('rgba(0, 0, 0, 0.5)')}}
                    >
                        {

                            exercises.map(
                                exercise => (
                                    <ExerciseItem
                                        key={`exerciseStatsItem${exercise.id}`}
                                        exercise={exercise}
                                    />
                                )
                            )
                        }
                    </Accordion>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default StatisticsDetails;

export async function loader({params}) {
    const doneTrainingId = getIdPath(params);
    const response = await sendDefaultRequest(`doneTrainings${doneTrainingId}`);
    return response;
}