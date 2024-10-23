import React from 'react';
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
import TrainingTrainApp, { loader as trainingTrainAppLoader } from '../routes/entities/training/TrainingTrainApp';
import PlanWeekDisplay, { loader as planWeekDisplayLoader } from '../routes/entities/training_plan/PlanWeekDisplay';
import TrainingPlanDisplay, {
    deleteTrainingRoutineAction,
    loader as trainingPlanLoader
} from '../routes/entities/training_plan/TrainingPlanDisplay';
import TrainingPlanForm, {
    action as trainingPlanFormAction,
    loader as trainingPlanFormLoader
} from '../routes/entities/training_plan/TrainingPlanForm';
import { nonAuthenticatedLoader } from '../utils/AuthUtils';

const AuthorizedPaths = {
    path: '',
    loader: nonAuthenticatedLoader,
    children: [
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
                    element: <ExerciseForm method='put'/>,
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
                    // TODO: Remove this ID, it will fetch training for special endpoint in API
                    path: 'train/:id',
                    element: <TrainingTrainApp/>,
                    loader: trainingTrainAppLoader
                },
                {
                    path: 'create',
                    element: <TrainingForm/>,
                    loader: trainingFormLoader,
                    action: trainingSaveAction
                },
                {
                    path: 'edit/:id',
                    element: <TrainingForm method='put'/>,
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
                    //loader: trainingFormLoader
                    action: trainingPlanFormAction
                },
                {
                    path: 'delete/:id',
                    action: deleteTrainingRoutineAction
                }
            ]
        }
    ]
};

export default AuthorizedPaths;