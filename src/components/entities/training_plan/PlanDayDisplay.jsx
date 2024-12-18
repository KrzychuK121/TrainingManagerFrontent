import {Card} from 'react-bootstrap';

function PlanDayDisplay({planToDisplay, weekdayDisplay}) {
    // TODO: Add ': planToDisplay.trainingTime' to view model
    const trainingTime = planToDisplay && planToDisplay.hasOwnProperty('trainingTime')
        ? planToDisplay.trainingTime
        : null;
    const fullCardHeader = trainingTime
        ? `${weekdayDisplay}: ${trainingTime}`
        : weekdayDisplay;

    return (
        <Card className='h-100'>
            <Card.Header>
                    <span className='text-capitalize'>
                        {fullCardHeader}
                    </span>
            </Card.Header>
            <Card.Body>
                {
                    planToDisplay
                        ? (
                            <>
                                <Card.Title>{planToDisplay.trainingTitle}</Card.Title>
                                <b>Opis:</b>
                                <Card.Text>{planToDisplay.trainingDescription}</Card.Text>
                            </>
                        )
                        : (
                            <>
                                <Card.Title>Dzień wolny</Card.Title>
                                <Card.Text>
                                    Wygląda na to, że nie masz nic zaplanowane na dzisiejszy dzień.
                                    Wykorzystaj ten czas na odpoczynek. Regeneracja po wysiłku fizycznym
                                    jest bardzo ważna w procesie budowy mięśni.
                                </Card.Text>
                            </>
                        )
                }
            </Card.Body>
        </Card>
    );
}

export default PlanDayDisplay;