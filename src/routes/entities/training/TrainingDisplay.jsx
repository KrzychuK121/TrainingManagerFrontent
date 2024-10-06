import { useLoaderData, useNavigate } from 'react-router-dom';
import DeleteModal from '../../../components/entities/crud/DeleteModal';
import PaginationEntity from '../../../components/entities/crud/PaginationEntity';
import ExerciseTable from '../../../components/entities/exercise/ExerciseTable';
import SubmitButton from '../../../components/form/SubmitButton';
import { defaultHeaders, handleResponseUnauthorized } from '../../../utils/FetchUtils';
import { getFilteredQueryString } from '../../../utils/URLUtils';

function TrainingDisplay() {
    const loadedData = useLoaderData();
    const trainings = loadedData.content;
    const navigate = useNavigate();

    function actionButtonClickHandler(path) {
        navigate(path);
    }

    if (trainings && trainings.length === 0)
        return <div>Brak treningów do wyświetlenia</div>;

    return (
        <>
            <div>{/*'defaulttemplate :: alert'*/}</div>
            {/*TODO: Make sorting by column*/}
            <h1>Lista wszystkich treningów</h1>
            {
                trainings.map(
                    (
                        {
                            id,
                            title,
                            description,
                            exercises
                        }
                    ) => (
                        <div key={id}>
                            <h2>{`Tytuł: ${title}`}</h2>
                            <div className='m-0 p-0'>
                                <h3 className='m-0'>Opis:</h3>
                                <p className='py-0'>
                                    {description}
                                </p>
                            </div>
                            <ExerciseTable exercises={exercises}/>
                            <div>
                                <div
                                    style={{display: 'inline'}}
                                >
                                    <SubmitButton
                                        display='Trenuj'
                                        submittingDisplay='Ładowanie strony'
                                        onClick={
                                            () => actionButtonClickHandler(`/main/training/train/${id}`)
                                        }
                                    />
                                    {' | '}
                                    <SubmitButton
                                        display='Edytuj'
                                        submittingDisplay='Ładowanie strony'
                                        onClick={
                                            () => actionButtonClickHandler(`/main/training/edit/${id}`)
                                        }
                                    />
                                    {' | '}
                                    <DeleteModal
                                        action={`/main/training/delete/${id}`}
                                    />
                                    {' | '}
                                </div>
                            </div>
                            <hr/>
                        </div>
                    )
                )
            }
            <PaginationEntity pages={loadedData}/>
        </>
    );
}

export default TrainingDisplay;

export async function loader({request}) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const filteredQueryString = getFilteredQueryString(searchParams, ['page', 'sort', 'size']);

    const response = await fetch(
        `http://localhost:8080/api/training${filteredQueryString}`,
        {
            headers: defaultHeaders()
        }
    );

    const handledResponse = await handleResponseUnauthorized(response);
    if (handledResponse !== null)
        return handledResponse;

    return await response.json();
}