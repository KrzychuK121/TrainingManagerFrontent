import React from 'react';
import CalcBMI, {action as calcBMIAction} from '../routes/calculators/CalcBMI';
import ExerciseForm, {
    action as exerciseSaveAction,
    loader as exerciseFormLoader
} from '../routes/entities/exercise/ExerciseForm';
import ExercisesDisplay, {
    action as exerciseDeleteAction,
    loader as exercisesLoader
} from '../routes/entities/exercise/ExercisesDisplay';
import TrainingDisplay, {
    deleteTrainingAction,
    loader as trainingLoader
} from '../routes/entities/training/TrainingDisplay';
import TrainingForm, {
    action as trainingSaveAction,
    loader as trainingFormLoader
} from '../routes/entities/training/TrainingForm';
import TrainingTrainApp, {loader as trainingTrainAppLoader} from '../routes/entities/training/TrainingTrainApp';
import PlanWeekDisplay, {loader as planWeekDisplayLoader} from '../routes/entities/training_plan/PlanWeekDisplay';
import TrainingPlanDisplay, {
    deleteTrainingRoutineAction,
    loader as trainingPlanLoader,
    switchActiveAction
} from '../routes/entities/training_plan/TrainingPlanDisplay';
import TrainingPlanForm, {
    action as trainingPlanFormAction,
    loader as trainingPlanFormLoader
} from '../routes/entities/training_plan/TrainingPlanForm';
import {nonAuthenticatedLoader} from '../utils/AuthUtils';
import StatisticsCalendar, {loader as statisticsCalendarLoader} from "../routes/workout/statistics/StatisticsCalendar";
import StatisticsDetails, {loader as statisticsDetailsLoader} from "../routes/workout/statistics/StatisticsDetails";
import CalcBMR, {action as calcBMRAction} from "../routes/calculators/CalcBMR";
import {
    action as trainingPlanerFormAction,
    loader as trainingPlanerFormLoader
} from "../components/calculators/assistant/write/TrainingPlanerForm";
import TrainingPlaner from "../routes/workout/assistant/TrainingPlaner";
import UsersDisplay, {
    action as userDisplayAction,
    loader as usersDisplayLoader
} from "../routes/admin/users/UsersDisplay";
import RequestDisplay, {loader as requestDisplayLoader} from "../routes/entities/request/RequestDisplay";
import RequestForm, {action as requestFormAction} from "../routes/entities/request/RequestForm";
import {closeAction as closeRequestAction, deleteRequestAction} from '../components/entities/request/RequestCard';

const AuthorizedPaths = {
    path: '',
    loader: nonAuthenticatedLoader,
    children: [
        {
            path: 'calc',
            children: [
                {
                    path: 'BMI',
                    element: <CalcBMI/>,
                    action: calcBMIAction
                },
                {
                    path: 'BMR',
                    element: <CalcBMR/>,
                    action: calcBMRAction
                }
            ]
        },
        {
            path: 'workout',
            children: [
                {
                    path: 'statistics',
                    element: <StatisticsCalendar/>,
                    loader: statisticsCalendarLoader,
                    children: [
                        {
                            path: ':id',
                            element: <StatisticsDetails/>,
                            loader: statisticsDetailsLoader
                        }
                    ]
                },
                {
                    path: 'assistant',
                    element: <TrainingPlaner/>,
                    loader: trainingPlanerFormLoader,
                    action: trainingPlanerFormAction
                }
            ]
        },
        {
            path: 'exercise',
            children: [
                {
                    index: true,
                    element: <ExercisesDisplay/>,
                    loader: exercisesLoader
                },
                {
                    path: 'create',
                    element: <ExerciseForm/>,
                    loader: exerciseFormLoader,
                    action: exerciseSaveAction
                },
                {
                    path: 'edit/:id',
                    element: (
                        <ExerciseForm
                            method='put'
                            legendTitle='Edytuj ćwiczenie'
                        />
                    ),
                    loader: exerciseFormLoader,
                    action: exerciseSaveAction
                },
                {
                    path: 'delete/:id',
                    action: exerciseDeleteAction
                }
            ]
        },
        {
            path: 'training',
            children: [
                {
                    index: true,
                    element: <TrainingDisplay/>,
                    loader: trainingLoader
                },
                {
                    path: 'train',
                    children: [
                        {
                            index: true,
                            element: <TrainingTrainApp/>,
                            loader: trainingTrainAppLoader
                        }
                    ]
                },
                {
                    path: 'create',
                    element: <TrainingForm/>,
                    loader: trainingFormLoader,
                    action: trainingSaveAction
                },
                {
                    path: 'edit/:id',
                    element: (
                        <TrainingForm
                            method='put'
                            legendTitle='Edytuj trening'
                        />
                    ),
                    loader: trainingFormLoader,
                    action: trainingSaveAction
                },
                {
                    path: 'delete/:id',
                    action: deleteTrainingAction
                }
            ]
        },
        {
            path: 'plans',
            children: [
                {
                    index: true,
                    element: <TrainingPlanDisplay/>,
                    loader: trainingPlanLoader
                },
                {
                    path: ':id',
                    action: switchActiveAction
                },
                {
                    path: 'week',
                    element: <PlanWeekDisplay/>,
                    loader: planWeekDisplayLoader
                },
                {
                    path: 'create',
                    element: <TrainingPlanForm/>,
                    loader: trainingPlanFormLoader,
                    action: trainingPlanFormAction
                },
                {
                    path: 'edit/:id',
                    element: <TrainingPlanForm method='put'/>,
                    loader: trainingPlanFormLoader,
                    action: trainingPlanFormAction
                },
                {
                    path: 'delete/:id',
                    action: deleteTrainingRoutineAction
                }
            ]
        },
        {
            path: 'request',
            children: [
                {
                    index: true,
                    element: <RequestDisplay/>,
                    loader: requestDisplayLoader,
                },
                {
                    path: 'create',
                    element: <RequestForm />,
                    action: requestFormAction
                },
                {
                    path: 'close/:id',
                    action: closeRequestAction
                },
                {
                    path: 'delete/:id',
                    action: deleteRequestAction
                }
            ]
        },
        {
            path: 'admin',
            children: [
                {
                    path: 'users/all',
                    element: <UsersDisplay />,
                    loader: usersDisplayLoader,
                    action: userDisplayAction
                }
            ]
        }
    ]
};

export default AuthorizedPaths;