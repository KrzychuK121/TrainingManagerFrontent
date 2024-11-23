import {useState} from 'react';
import {json, useLoaderData, useNavigate} from 'react-router-dom';
import AlertComponent from '../../../components/alerts/AlertComponent';
import DeleteModal from '../../../components/entities/crud/DeleteModal';
import PaginationEntity from '../../../components/entities/crud/PaginationEntity';
import ExerciseTable from '../../../components/entities/exercise/ExerciseTable';
import SubmitButton from '../../../components/form/SubmitButton';
import useFormValidation from '../../../hooks/UseFormValidation';
import {useMessageParams} from '../../../hooks/UseMessageParam';
import {deleteAction, sendDefaultRequest} from '../../../utils/CRUDUtils';
import {DELETE_SUCCESS, EDIT_SUCCESS, getFilteredQueryString} from '../../../utils/URLUtils';

function TrainingDisplay() {
    const loadedData = useLoaderData();
    const [actionData, setActionData] = useState();

    const trainings = loadedData.content;
    const navigate = useNavigate();
    const {messages: successMessages, UrlAlertsList} = useMessageParams(
        [
            {
                messageParam: EDIT_SUCCESS,
                displayIfSuccess: 'Trening został edytowany pomyślnie.'
            },
            {
                messageParam: DELETE_SUCCESS,
                displayIfSuccess: 'Trening został usunięty pomyślnie.'
            }
        ]
    );

    const {globalMessage} = useFormValidation(actionData);

    function actionButtonClickHandler(path) {
        navigate(path);
    }

    if (trainings && trainings.length === 0)
        return <div>Brak treningów do wyświetlenia</div>;

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
            {/*TODO: Make sorting by column*/}
            <h1>Lista wszystkich treningów</h1>
            {
                trainings.map(
                    (
                        {
                            id,
                            title,
                            description,
                            exercises,
                            trainingPrivate
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
                                    {
                                        trainingPrivate &&
                                        <>
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
                                                setActionData={setActionData}
                                            />
                                            {' | '}
                                        </>
                                    }
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

    return await sendDefaultRequest(`training/paged${filteredQueryString}`);
}

export async function deleteTrainingAction({request, params}) {
    const response = await deleteAction(
        'http://localhost:8080/api/training',
        '/main/training',
        request,
        params
    );

    if (response.status === 400)
        return json({error: 'Nie możesz usunąć treningu, który nie należy do Ciebie.'});

    if (response.status === 404)
        return json({error: 'Nie znaleziono treningu o podanym numerze.'});

    return response;
}