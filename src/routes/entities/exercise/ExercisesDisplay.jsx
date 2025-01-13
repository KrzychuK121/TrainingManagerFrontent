import {useState} from 'react';
import {json, useLoaderData} from 'react-router-dom';
import AlertComponent from '../../../components/alerts/AlertComponent';
import PaginationEntity from '../../../components/entities/crud/PaginationEntity';
import useFormValidation from '../../../hooks/UseFormValidation';
import {useMessageParams} from '../../../hooks/UseMessageParam';
import {deleteAction, sendDefaultRequest} from '../../../utils/CRUDUtils';
import {DELETE_SUCCESS, DOMAIN, EDIT_SUCCESS, getFilteredQueryString} from '../../../utils/URLUtils';
import ExerciseCard from "../../../components/entities/exercise/ExerciseCard";
import {Row} from "react-bootstrap";
import ExerciseSortFilterPanel from "../../../components/entities/exercise/ExerciseSortFilterPanel";

function ExercisesDisplay() {
    const exercisesPaged = useLoaderData();
    const [actionData, setActionData] = useState();
    const exercises = exercisesPaged.content;
    const [filteredName, setFilteredName] = useState(null);

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

    if (exercises && exercises.length === 0) {
        return (
            <>
                <ExerciseSortFilterPanel
                    filteredName={filteredName}
                    setFilteredName={setFilteredName}
                />
                <hr/>
                <div>Brak ćwiczeń do wyświetlenia</div>
            </>
        );
    }

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

            <ExerciseSortFilterPanel
                filteredName={filteredName}
                setFilteredName={setFilteredName}
            />
            <hr/>

            <Row className='justify-content-center'>
                {
                    exercises.map(
                        exercise => (
                            <ExerciseCard
                                key={exercise.id}
                                exercise={exercise}
                                setActionData={setActionData}
                            />
                        )
                    )
                }
            </Row>
            <PaginationEntity pages={exercisesPaged}/>
        </>
    );
}

export default ExercisesDisplay;

export async function loader({request}) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const filteredQueryString = getFilteredQueryString(searchParams, ['page', 'sort', 'size', 'filter']);

    return await sendDefaultRequest(`exercise/paged${filteredQueryString}`);
}

export async function action({request, params}) {
    const response =  await deleteAction(
        `${DOMAIN}/exercise`,
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