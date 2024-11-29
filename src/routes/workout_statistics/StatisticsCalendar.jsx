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
    /*const startDate1 = new Date();
    startDate1.setHours(14, 0, 0, 0);
    const endDate1 = new Date();
    endDate1.setHours(15, 30, 0, 0);
    const startDate2 = new Date();
    startDate2.setHours(15, 45, 0, 0);
    const endDate2 = new Date();
    endDate2.setHours(17, 45, 0, 0);
    return [
        { startDate: startDate1, endDate: endDate1, title: 'Meeting' },
        { startDate: startDate2, endDate: endDate2, title: 'Go to a gym' }
    ];*/

    const response = await sendDefaultRequest('doneTrainings');
    return response;
}