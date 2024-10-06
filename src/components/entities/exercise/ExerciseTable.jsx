import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DeleteModal from '../crud/DeleteModal';
import SortAnchor from '../crud/SortAnchor';

function getExerciseList(
    exercises,
    optionsMapper
) {
    return exercises.map(
        (exercise) => {
            const {
                id,
                name,
                description,
                rounds,
                repetition,
                time,
                bodyPartDesc,
                difficultyDesc,
                weights
            } = exercise;

            return (
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
                        {optionsMapper(exercise)}
                    </td>
                </tr>
            );
        }
    );
}

function defaultOptionsMapper(exercise) {
    const id = exercise.id;
    return (
        <>
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
        </>
    );
}

function ExerciseTable(
    {
        exercises,
        optionsMapper = defaultOptionsMapper
    }
) {
    if (exercises && exercises.length === 0)
        return <></>;

    return (
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
            {getExerciseList(exercises, optionsMapper)}
            </tbody>
        </Table>
    );
}

export default ExerciseTable;