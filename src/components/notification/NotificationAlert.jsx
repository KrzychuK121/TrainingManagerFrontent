import {Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function calculateMinutesDifference(timeString) {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const inputTime = new Date();
    inputTime.setHours(hours, minutes, seconds, 0);

    const now = new Date();
    const differenceInMillis = inputTime - now;
    return differenceInMillis / (1000 * 60);
}

function NotificationAlert(
    {
        reminderData,
        onClose
    }
) {
    const {
        reminderTitle,
        trainingTitle,
        time,
        type,
    } = reminderData;

    const timeBeforeDisplay = type === 'SOME_TIME_BEFORE'
        ? ` (${calculateMinutesDifference(time)} min)`
        : '';
    const header = `${reminderTitle}${timeBeforeDisplay}: ${trainingTitle}`;

    function getContent() {
        switch (type) {
            case 'NOW':
                return (
                    <>
                        Trening właśnie się zaczął. Możesz do niego przejść klikając {' '}
                        <Link
                            to='/main/training/train'
                            style={{ textDecoration: 'none' }}
                        >
                            ten link
                        </Link>
                    </>
                );
            case 'LATE':
                return (
                    <>
                        Pominąłeś trening zaplanowany na godzinę {time}. Możesz do niego przejść klikając {' '}
                        <Link
                            to='/main/training/train'
                            style={{ textDecoration: 'none' }}
                        >
                            ten link
                        </Link>
                    </>
                );
            default:
                return `Trening rozpocznie się o godzinie ${time}. Nie przegap treningu!`;
        }
    }

    return (
        <Alert dismissible onClose={onClose}>
            <Alert.Heading className='d-flex justify-content-between'>
                {header}
            </Alert.Heading>
            <hr/>
            <div>
                <p style={{fontSize: '18px'}}>
                    {getContent()}
                </p>
            </div>
        </Alert>
    );
}

export default NotificationAlert;