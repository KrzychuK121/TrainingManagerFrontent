import React from 'react';
import ExerciseForm, {
    action as exerciseSaveAction,
    loader as exerciseFormLoader
} from '../routes/entities/exercise/ExerciseForm';
import ExercisesDisplay, {
    deleteAction as exerciseDeleteAction,
    loader as exercisesLoader
} from '../routes/entities/exercise/ExercisesDisplay';
import TrainingDisplay, { loader as trainingLoader } from '../routes/entities/training/TrainingDisplay';
import TrainingForm, { loader as trainingFormLoader } from '../routes/entities/training/TrainingForm';
import TrainingPlanDisplay, { loader as trainingPlanLoader } from '../routes/entities/training_plan/TrainingPlanDisplay';
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
                    path: 'create',
                    element: <TrainingForm/>,
                    loader: trainingFormLoader
                    // action: exerciseSaveAction
                },
                {
                    path: 'edit/:id',
                    element: <TrainingForm method='put'/>,
                    loader: trainingFormLoader
                    // action: exerciseSaveAction
                },
                {
                    path: 'delete/:id'
                    // action: exerciseDeleteAction
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
                    path: 'create',
                    //element: <TrainingForm />,
                    //loader: trainingFormLoader
                    // action: exerciseSaveAction
                },
                {
                    path: 'edit/:id',
                    //element: <TrainingForm method='put' />,
                    //loader: trainingFormLoader
                    // action: exerciseSaveAction
                },
                {
                    path: 'delete/:id'
                    // action: exerciseDeleteAction
                }
            ]
        }
    ]
};

export default AuthorizedPaths;