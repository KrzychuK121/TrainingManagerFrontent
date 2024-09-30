import { Button, Table } from 'react-bootstrap';
import { Link, redirect, useLoaderData } from 'react-router-dom';
import AlertComponent from '../../../components/alerts/AlertComponent';
import DeleteModal from '../../../components/entities/DeleteModal';
import PaginationEntity from '../../../components/entities/PaginationEntity';
import SortAnchor from '../../../components/entities/SortAnchor';
import { useMessageParams } from '../../../hooks/UseMessageParam';
import { defaultHeaders } from '../../../utils/FetchUtils';
import { getFilteredQueryString } from '../../../utils/URLUtils';
import { EDIT_SUCCESS } from './ExerciseForm';

function getExerciseList(exercises) {
    return exercises.map(
        (
            {
                id,
                name,
                description,
                rounds,
                repetition,
                time,
                bodyPartDesc,
                difficultyDesc,
                weights
            }
        ) => (
            <tr key={id}>
                <td>{name}</td>
                <td>{description}</td>
                <td>{rounds}</td>
                <td>{repetition}</td>
                <td>{time}</td>
                <td>
                    {
                        weights === 0
                            ? 'brak'
                            : weights
                    }
                </td>
                <td>{bodyPartDesc}</td>
                <td>{difficultyDesc}</td>
                <td>
                    <Link to={`/main/exercise/edit/${id}`}>
                        <Button
                            type='submit'
                            variant='primary'
                        >
                            Edytuj
                        </Button>
                    </Link>
                    <DeleteModal
                        action={`/main/exercise/delete/${id}`}
                    />
                </td>
            </tr>
        )
    );
}

function ExercisesDisplay() {
    const loadedData = useLoaderData();
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

    if (exercises && exercises.length === 0)
        return <div>Brak ćwiczeń do wyświetlenia</div>;

    return (
        <>
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
            <Table
                variant='success'
                bordered
                striped
                hover
            >
                <thead>
                <tr>
                    <th>
                        <SortAnchor
                            display='Nazwa'
                            field='name'
                        />
                    </th>
                    <th>
                        <SortAnchor
                            display='Opis'
                            field='description'
                        />
                    </th>
                    <th>
                        <SortAnchor
                            display='Serie'
                            field='rounds'
                        />
                    </th>
                    <th>
                        <SortAnchor
                            display='Powtórzenia'
                            field='repetition'
                        />
                    </th>
                    <th>
                        <SortAnchor
                            display='Czas (do wykonania/przewidywany)'
                            field='time'
                        />
                    </th>
                    <th>
                        <SortAnchor
                            display='Obciążenie'
                            field='weights'
                        />
                    </th>
                    <th>
                        <SortAnchor
                            display='Część ciała'
                            field='bodyPart'
                        />
                    </th>
                    <th>
                        <SortAnchor
                            display='Trudność'
                            field='difficulty'
                        />
                    </th>
                    <th>
                        <SortAnchor display='Zresetuj widok'/>
                    </th>
                </tr>
                </thead>
                <tbody>
                {getExerciseList(exercises)}
                </tbody>
            </Table>
            <PaginationEntity pages={loadedData}/>
        </>
    );
}

export default ExercisesDisplay;

const DELETE_SUCCESS = 'delete-success';

export async function loader({request}) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const filteredQueryString = getFilteredQueryString(searchParams, ['page', 'sort', 'size']);

    const response = await fetch(
        `http://localhost:8080/api/exercise${filteredQueryString}`,
        {
            headers: defaultHeaders()
        }
    );

    return await response.json();
}

export async function deleteAction({request, params}) {
    const exerciseId = params.id
        ? `/${params.id}`
        : '';

    const response = await fetch(
        `http://localhost:8080/api/exercise${exerciseId}`,
        {
            method: request.method,
            headers: defaultHeaders()
        }
    );

    if (response.status === 204) {
        return redirect(`/main/exercise?${DELETE_SUCCESS}`);
    }

}