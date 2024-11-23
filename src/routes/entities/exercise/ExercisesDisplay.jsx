import {useState} from 'react';
import {json, useLoaderData} from 'react-router-dom';
import AlertComponent from '../../../components/alerts/AlertComponent';
import PaginationEntity from '../../../components/entities/crud/PaginationEntity';
import ExerciseTable from '../../../components/entities/exercise/ExerciseTable';
import useFormValidation from '../../../hooks/UseFormValidation';
import {useMessageParams} from '../../../hooks/UseMessageParam';
import {deleteAction, sendDefaultRequest} from '../../../utils/CRUDUtils';
import {DELETE_SUCCESS, EDIT_SUCCESS, getFilteredQueryString} from '../../../utils/URLUtils';

function ExercisesDisplay() {
    const loadedData = useLoaderData();
    const [actionData, setActionData] = useState();
    const exercises = loadedData.content;
    const {messages: successMessages, UrlAlertsList} = useMessageParams(
        [
            {
                messageParam: EDIT_SUCCESS,
                displayIfSuccess: 'Ćwiczenie zostało edytowane pomyślnie.'
            },
            {
                messageParam: DELETE_SUCCESS,
                displayIfSuccess: 'Ćwiczenie zostało usunięte pomyślnie.'
            }
        ],
    );

    const {globalMessage} = useFormValidation(actionData);

    if (exercises && exercises.length === 0)
        return <div>Brak ćwiczeń do wyświetlenia</div>;

    return (
        <>
            <AlertComponent
                message={globalMessage}
                showTrigger={actionData}
                variant='danger'
                closeDelay={5000}
                scrollOnTrigger={true}
            />
            {UrlAlertsList}
            <h1>Lista wszystkich ćwiczeń</h1>
            <ExerciseTable
                exercises={exercises}
                setActionData={setActionData}
            />
            <PaginationEntity pages={loadedData}/>
        </>
    );
}

export default ExercisesDisplay;

export async function loader({request}) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const filteredQueryString = getFilteredQueryString(searchParams, ['page', 'sort', 'size']);

    return await sendDefaultRequest(`exercise/paged${filteredQueryString}`);
}

export async function action({request, params}) {
    const response =  await deleteAction(
        'http://localhost:8080/api/exercise',
        '/main/exercise',
        request,
        params
    );

    if(response.status === 400)
        return json({error: 'Nie możesz usunąć ćwiczenia, którego nie posiadasz'});

    if(response.status === 404)
        return json({error: 'Ćwiczenie, które próbujesz usunąć, nie istnieje'});

    return response;
}