import {Table} from 'react-bootstrap';
import DeleteModal from '../crud/DeleteModal';
import SortAnchor from '../crud/SortAnchor';
import EditButton from "../crud/EditButton";

function getExerciseList(
    exercises,
    optionsMapper,
    setActionData
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
                defaultBurnedKcal,
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
                    <td>{defaultBurnedKcal} kcal</td>
                    {
                        optionsMapper && (
                            <td>
                                {optionsMapper(exercise, setActionData)}
                            </td>
                        )
                    }
                </tr>
            );
        }
    );
}

function defaultOptionsMapper(exercise, setActionData) {
    const id = exercise.id;
    if(
        exercise.hasOwnProperty('exercisePrivate')
        && !exercise.exercisePrivate
    )
        return <></>;

    return (
        <>
            <EditButton moveTo={`/main/exercise/edit/${id}`} />
            <DeleteModal
                action={`/main/exercise/delete/${id}`}
                setActionData={setActionData}
            />
        </>
    );
}

function ExerciseTable(
    {
        exercises,
        optionsMapper = defaultOptionsMapper,
        setActionData = null
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
            responsive
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
                        display='Spalane kalorie'
                        field='defaultBurnedKcal'
                    />
                </th>
                {
                    optionsMapper && (
                        <th>
                            <SortAnchor display='Zresetuj widok'/>
                        </th>
                    )
                }
            </tr>
            </thead>
            <tbody>
            {getExerciseList(exercises, optionsMapper, setActionData)}
            </tbody>
        </Table>
    );
}

export default ExerciseTable;