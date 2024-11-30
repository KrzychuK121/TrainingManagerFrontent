import {useLoaderData} from "react-router-dom";
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
import {sendDefaultRequest} from "../../utils/CRUDUtils";

function StatisticsCalendar() {
    const appointments = useLoaderData();

    return (
        <>
            <Paper>
                <Scheduler
                    data={appointments}
                    locale={'pl-PL'}
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
                    <Appointments />
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