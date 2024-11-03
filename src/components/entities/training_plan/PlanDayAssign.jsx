import { useEffect, useRef, useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import SelectField from '../../form/SelectField';
import classes from './PlanDayAssign.module.css';
import {getEntityParamGetter} from "../../../utils/EntitiesUtils";

function injectElementIfMissing(allTrainings, filteredTrainings, getInitDataParam) {
    const id = getInitDataParam('id');
    if(id === '')
        return;
    if(filteredTrainings.some(training => training.id === id))
        return;
    if(!allTrainings.some(training => training.id === id))
        return;

    filteredTrainings.push(allTrainings.find(training => training.id === id));
}

function getDefaultTrainings(
    allTrainings,
    howManyRows,
    getInitDataParam
) {

    const trainingsAmount = Math.min(allTrainings.length, howManyRows);
    const defaultFilteredTrainings = allTrainings.slice(0, trainingsAmount);
    injectElementIfMissing(
        allTrainings,
        defaultFilteredTrainings,
        getInitDataParam
    )
    return defaultFilteredTrainings;
}

function getDataToDisplay(filteredTrainings) {
    return filteredTrainings.map(
        training => (
            {
                value: training.id,
                description: `id: ${training.id} tytuł: ${training.title}`
            }
        )
    );
}

function PlanDayAssign(
    {
        allTrainings,
        weekday,
        weekdayDisplay,
        initData = null
    }
) {
    const HOW_MANY_ROWS = 20;
    const SEARCH_ID = `search-${weekday}`;
    const LIST_ID = `trainingId-${weekday}`;
    const TIME_ID = `trainingTime-${weekday}`;
    const getInitDataParam = getEntityParamGetter(initData);

    const [filteredTrainings, setFilteredTrainings] = useState(
        getDefaultTrainings(
            allTrainings,
            HOW_MANY_ROWS,
            getInitDataParam
        )
    );
    const [searchPhrase, setSearchPhrase] = useState('');
    const typingTimeoutRef = useRef(null);

    function filterTrainings(searchPhrase) {
        if (!searchPhrase.trim())
            setFilteredTrainings(allTrainings);
        const filteredByPhrase = allTrainings.filter(
            training => training.title.toLowerCase()
                .includes(searchPhrase.toLowerCase())
        );

        setFilteredTrainings(filteredByPhrase);
    }

    function onSearchTrainingHandler(event) {
        const searchPhrase = event.target.value;
        setSearchPhrase(searchPhrase);

        // Clear the previous timeout
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            filterTrainings(searchPhrase); // only fetch if the input is not empty
        }, 500);
    }

    // Cleanup function when the component unmounts
    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, []);

    return (
        <Card className={classes.dayAssignCard}>
            <Card.Header>
                <span className='text-capitalize'>{weekdayDisplay}</span>
            </Card.Header>
            <Card.Body>
                <Card.Title>Przypisz trening na ten dzień</Card.Title>
                <p className='card-text'>
                    <Form.Label htmlFor={SEARCH_ID} column={true}>
                        Wyszukaj po nazwie:
                    </Form.Label>
                    <Form.Control
                        id={SEARCH_ID}
                        onChange={onSearchTrainingHandler}
                        value={searchPhrase}
                    />
                    <Form.Label htmlFor={LIST_ID} column={true}>
                        Wybierz trening:
                    </Form.Label>
                    {/*th:name="|training${dayToAssign}|"*/}
                    <SelectField
                        id={LIST_ID}
                        name={LIST_ID}
                        title={`Select training to do for ${weekdayDisplay} weekday`}
                        firstElemDisplay='Dzień wolny'
                        options={getDataToDisplay(filteredTrainings)}
                        selectedValues={getInitDataParam('trainingId')}
                    />
                    <Form.Label htmlFor={TIME_ID} column={true}>
                        Godzina treningu:
                    </Form.Label>
                    <Form.Control
                        id={TIME_ID}
                        name={TIME_ID}
                        defaultValue={getInitDataParam('trainingTime')}
                        // th:field="*{planWriteMap['__${weekday}__'].trainingTime}"
                        pattern='[0-9]{2}:[0-9]{2}'
                    />
                </p>
                {/*<a href="#" class="btn btn-primary">Zrób trening</a>*/}
            </Card.Body>
        </Card>
    );
}

export default PlanDayAssign;