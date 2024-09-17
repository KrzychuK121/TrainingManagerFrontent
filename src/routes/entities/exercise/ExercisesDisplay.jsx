import { Table } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';
import DeleteModal from '../../../components/entities/DeleteModal';
import PaginationEntity from '../../../components/entities/PaginationEntity';
import SortAnchor from '../../../components/entities/SortAnchor';
import { injectToken } from '../../../utils/AuthUtils';
import { getFilteredQueryString } from '../../../utils/URLUtils';

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
                <td>{bodyPartDesc}</td>
                <td>{difficultyDesc}</td>
                {/*TODO: Change this to use polish desc*/}
                <td>
                    {
                        weights === 0
                            ? 'brak'
                            : weights
                    }
                </td>
                <td>
                    <fieldset>
                        {/*TODO: Change this to link instead of form.*/}
                        <form
                            method='get'
                            action='#'
                            //'@{/exercise/edit/{id}(id=${exercise.id})}'
                        >
                            <button
                                type='submit'
                                className='btn btn-primary'
                            >
                                Edytuj
                            </button>
                        </form>
                        <DeleteModal/>
                    </fieldset>
                </td>
            </tr>
        )
    );
}

function ExercisesDisplay() {
    const loadedData = useLoaderData();
    const exercises = loadedData.content;

    if (exercises && exercises.length === 0)
        return <div>Brak ćwiczeń do wyświetlenia</div>;

    return (
        <>
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
                        <SortAnchor
                            display='Obciążenie'
                            field='weights'
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

export async function loader({request}) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const filteredQueryString = getFilteredQueryString(searchParams, ['page', 'sort', 'size']);
    console.log(filteredQueryString);

    const response = await fetch(
        `http://localhost:8080/api/exercise${filteredQueryString}`,
        {
            headers: injectToken({
                'Content-Type': 'application/json'
            })
        }
    );

    // TODO: Add sorting and pagination handler
    const data = await response.json();
    console.log(data);

    return data;
}
