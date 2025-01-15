import {Outlet, useLoaderData} from "react-router-dom";
import {
    Appointments,
    DateNavigator,
    DayView,
    MonthView,
    Scheduler,
    TodayButton,
    Toolbar,
    ViewSwitcher,
    WeekView
} from "@devexpress/dx-react-scheduler-material-ui";
import {ViewState} from "@devexpress/dx-react-scheduler";
import {Paper} from "@mui/material";
import {sendDefaultRequest} from "../../../utils/CRUDUtils";
import CustomAppointment from "../../../components/entities/workout_statistics/CustomAppointment";
import {useMessageParams} from "../../../hooks/UseMessageParam";
import {TRAINING_FINISHED} from "../../entities/training/TrainingTrainApp";

function StatisticsCalendar() {
    const doneTrainings = useLoaderData();
    const {UrlAlertsList} = useMessageParams(
        [
            {
                messageParam: TRAINING_FINISHED,
                displayIfSuccess: 'Trening ukończony! Możesz wyszukać go w kalendarzu i podejrzeć jego statystyki.'
            }
        ]
    );

    if(
        Array.isArray(doneTrainings)
        && doneTrainings.length > 0
        && doneTrainings[0].hasOwnProperty('title')
    )
        doneTrainings.forEach(
            doneTraining => {
                const newEndDate = new Date(doneTraining.startDate);
                newEndDate.setMilliseconds(newEndDate.getMilliseconds() + 1);

                doneTraining.endDate = !doneTraining.endDate
                    ? newEndDate
                    : doneTraining.endDate
            }
        )

    return (
        <>
            <Outlet />
            {UrlAlertsList}
            <Paper>
                <Scheduler
                    data={doneTrainings}
                    locale={'pl-PL'}
                    firstDayOfWeek={1}
                    height={660}
                >
                    <ViewState
                        defaultCurrentViewName='Week'
                    />

                    <DayView
                        displayName='Dzienny'
                    />
                    <WeekView
                        displayName='Tygodniowy'
                    />
                    <MonthView
                        displayName='Miesięczny'
                    />

                    <Toolbar />
                    <TodayButton
                        messages={{today: 'Dzisiaj'}}
                    />
                    <DateNavigator />
                    <ViewSwitcher />
                    <Appointments
                        appointmentComponent={CustomAppointment}
                    />
                </Scheduler>
            </Paper>
        </>
    );
}

export default StatisticsCalendar;

export async function loader() {
    const response = await sendDefaultRequest('doneTrainings');
    return response;
}