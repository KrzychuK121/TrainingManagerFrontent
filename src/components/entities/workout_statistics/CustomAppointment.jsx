import {useNavigate} from "react-router-dom";
import {Appointments} from "@devexpress/dx-react-scheduler-material-ui";

export const DONE_COLOR = '#8ac926';
export const UNDONE_COLOR = '#ff595e';

function CustomAppointment(
    {
        data,
        children,
        style,
        ...rest
    }
) {
    const doneTraining = data;
    const navigate = useNavigate();

    const bgColor = doneTraining.done
        ? DONE_COLOR
        : UNDONE_COLOR;

    function handleDoneTrainingClicked() {
        const doneTrainingId = doneTraining.id;
        navigate(`/main/workout-statistics/${doneTrainingId}`);
    }

    return (
        <>
            <Appointments.Appointment
                {...rest}
                onClick={handleDoneTrainingClicked}
                style={
                    {
                        ...style,
                        backgroundColor: bgColor
                    }
                }
            >
                {children}
            </Appointments.Appointment>
        </>
    );
}

export default CustomAppointment;