import {Card, Col} from "react-bootstrap";
import {moderationRoleOrOwner} from "../../../utils/RoleUtils";
import EditButton from "../crud/EditButton";
import DeleteModal from "../crud/DeleteModal";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFire, faPersonRunning} from "@fortawesome/free-solid-svg-icons";

function defaultOptionsMapper(exercise, setActionData) {
    const id = exercise.id;
    const isPrivate = exercise.hasOwnProperty('exercisePrivate')
        && exercise.exercisePrivate;

    if(!moderationRoleOrOwner(isPrivate))
        return <></>;

    return (
        <>
            <EditButton moveTo={`/main/exercise/edit/${id}`} />
            <DeleteModal
                action={`/main/exercise/delete/${id}`}
                setActionData={setActionData}
            />
        </>
    );
}

function ExerciseCard(
    {
        exercise,
        optionsMapper = defaultOptionsMapper,
        setActionData = null
    }
) {
    const {
        name,
        description,
        rounds,
        repetition,
        time,
        bodyPartDesc,
        defaultBurnedKcal,
        weights
    } = exercise;

    return (
        <Col md={5} className='m-3'>
            <Card>
                <Card.Header className='d-flex justify-content-between text-uppercase align-items-center'>
                    <span>{name}</span>
                    <div className='d-inline-block'>
                        {optionsMapper && optionsMapper(exercise, setActionData)}
                    </div>
                </Card.Header>
                <Card.Body>
                    <div>
                        <span style={{fontWeight: 'bold'}}>Rundy: </span>
                        <span>{rounds}</span>
                        {
                            Boolean(repetition) && (
                                <>
                                    {' | '}
                                    <span style={{fontWeight: 'bold'}}>Powtórzenia: </span>
                                    <span>{repetition}</span>
                                </>
                            )
                        }
                        {
                            time && (
                                <>
                                    {' | '}
                                    <span style={{fontWeight: 'bold'}}>Czas: </span>
                                    <span>{time}</span>
                                </>
                            )
                        } <br/>
                        <span style={{fontWeight: 'bold'}}>Obciążenie [kg]: </span>
                        <span>{weights}</span>
                    </div>
                    <hr />
                    <div>
                        <span style={{fontWeight: 'bold'}}>Inne parametry: </span>
                        <div>
                            <span className='mx-2'>
                                <FontAwesomeIcon icon={faFire} /> {' '}
                                Spalane kalorie:
                            </span>
                            <span>{defaultBurnedKcal}</span>
                        </div>
                        <div>
                            <span className='mx-2'>
                                <FontAwesomeIcon icon={faPersonRunning} /> {' '}
                                Część ciała:
                            </span>
                            <span>{bodyPartDesc}</span>
                        </div>

                    </div>
                    <hr/>
                    <div>
                    <span style={{fontWeight: 'bold'}}>Opis:</span>
                        <p>{description}</p>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default ExerciseCard;