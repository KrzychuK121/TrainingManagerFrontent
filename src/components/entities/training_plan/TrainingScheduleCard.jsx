import {Card, Col} from "react-bootstrap";
import React from "react";

function TrainingScheduleCard(
    {
        trainingData,
        weekdayDisplay,
    }
) {
    const {title, description} = trainingData;

    return (
        <>
            <Col md={5} className='m-3'>
                <Card>
                    <Card.Header className='d-flex justify-content-between text-uppercase align-items-center'>
                        <span className='h4'>{weekdayDisplay}</span>
                    </Card.Header>
                    <Card.Body>
                        <span className='h5'>Dane treningu</span>
                        <hr/>
                        <div style={{fontSize: '17px'}}>
                            <div>
                                <span style={{fontWeight: 'bold'}}>Tytuł: </span>
                                <span>{title}</span>
                            </div>
                            <div>
                                <span style={{fontWeight: 'bold'}}>Opis: </span>
                                <div>
                                    <span>{description}</span>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
}

export default TrainingScheduleCard;