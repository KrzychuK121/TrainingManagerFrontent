import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import AlertComponent from '../../../components/alerts/AlertComponent';
import PaginationEntity from '../../../components/entities/crud/PaginationEntity';
import ExerciseTable from '../../../components/entities/exercise/ExerciseTable';
import useFormValidation from '../../../hooks/UseFormValidation';
import { useMessageParams } from '../../../hooks/UseMessageParam';
import { deleteAction, sendDefaultRequest } from '../../../utils/CRUDUtils';
import { DELETE_SUCCESS, EDIT_SUCCESS, getFilteredQueryString } from '../../../utils/URLUtils';

function ExercisesDisplay() {
    const loadedData = useLoaderData();
    const [actionData, setActionData] = useState();
    const exercises = loadedData.content;
    const {messages: successMessages} = useMessageParams(
        [
            {
                messageParam: EDIT_SUCCESS,
                displayIfSuccess: 'Ćwiczenie zostało edytowane pomyślnie.'
            },
            {
                messageParam: DELETE_SUCCESS,
                displayIfSuccess: 'Ćwiczenie zostało usunięte pomyślnie.'
            }
        ]
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
            {
                successMessages && successMessages.map(
                    message => (
                        <AlertComponent
                            key={message}
                            message={message}
                            showTrigger={null}
                            closeDelay={4000}
                        />
                    )
                )
            }
            {/*ALERT IF ERROR*/}
            {/*<div
                th:fragment="alert"
                th:if="${mess != null}"
                th:class="|alert alert-${messType} alert-dismissible|"
                role="alert"
            >
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <span th:if="${mess != null}" th:text="${mess}"></span>
            </div>*/}
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

    return await sendDefaultRequest(`exercise${filteredQueryString}`);
}

export async function action({request, params}) {
    return await deleteAction(
        'http://localhost:8080/api/exercise',
        '/main/exercise',
        request,
        params
    );
}