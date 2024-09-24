import React from 'react';
import ExerciseForm, {
    action as exerciseSaveAction,
    loader as exerciseFormLoader
} from '../routes/entities/exercise/ExerciseForm';
import ExercisesDisplay, { loader as exercisesLoader } from '../routes/entities/exercise/ExercisesDisplay';
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
                    element: <ExerciseForm/>,
                    loader: exerciseFormLoader,
                    action: exerciseSaveAction
                }
            ]
        }
    ]
};

export default AuthorizedPaths;