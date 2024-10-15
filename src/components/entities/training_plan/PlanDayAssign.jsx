import { useEffect, useRef, useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import SelectField from '../../form/SelectField';

function getDefaultTrainings(allTrainings, howManyRows) {
    const trainingsAmount = Math.min(allTrainings.length, howManyRows);
    return allTrainings.slice(0, trainingsAmount);
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
        weekdayDisplay
    }
) {
    const HOW_MANY_ROWS = 20;
    const [filteredTrainings, setFilteredTrainings] = useState(getDefaultTrainings(allTrainings, HOW_MANY_ROWS));

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
        <Card className='dayAssignCard'>
            <Card.Header>
                <span className='text-capitalize'>{weekdayDisplay}</span>
            </Card.Header>
            <Card.Body>
                <Card.Title>Przypisz trening na ten dzień</Card.Title>
                <p className='card-text'>
                    <Form.Label htmlFor={`search${weekday}`} column={true}>
                        Wyszukaj po nazwie:
                    </Form.Label>
                    <Form.Control
                        onChange={onSearchTrainingHandler}
                        value={searchPhrase}
                    />
                    <Form.Label htmlFor={`training${weekday}`} column={true}>
                        Wybierz trening:
                    </Form.Label>
                    {/*th:name="|training${dayToAssign}|"*/}
                    <SelectField
                        id={`training${weekday}`}
                        title={`Select training to do for ${weekdayDisplay} weekday`}
                        firstElemDisplay='Dzień wolny'
                        options={getDataToDisplay(filteredTrainings)}
                    />
                    <Form.Label htmlFor={`trainingTime${weekday}`} column={true}>
                        Godzina treningu:
                    </Form.Label>
                    <Form.Control
                        id={`trainingTime${weekday}`}
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

async function someAction(weekdays, allTrainings) {
    for (const weekday of weekdays) {
        const inputText = document.getElementById('search' + weekday);
        const select = document.getElementById('training' + weekday);

        initSelect(allTrainings, select);

        inputText.addEventListener(
            'input', async (e) => {
                e.preventDefault();

                while (select.firstChild)
                    select.firstChild.remove();
                createOption('--Dzień wolny--', -1, true, select);

                const inputValue = e.currentTarget.value.toLowerCase();

                if (inputValue.trim() === '') {
                    initSelect(allTrainings, select);
                    return;
                }

                allTrainings.forEach(
                    training => {
                        const title = training.title.toLowerCase();

                        if (title.includes(inputValue))
                            createOption(`id: ${training.id} tytuł: ${training.title}`, training.id, false, select);
                    }
                );
            }
        );
    }
}

function createOption(text, value, selected, parent) {
    const newOption = document.createElement('option');
    newOption.value = value;
    newOption.selected = selected;
    newOption.innerHTML = text;
    parent.appendChild(newOption);
}

/**
 * Creates default top few trainings in select list.
 * Invoked while search bar is empty
 */
function initSelect(trainings, parent, howManyRows = 20) {
    for (let i = 0; i < Math.min(trainings.length, howManyRows); i++) {
        const training = trainings[i];
        createOption(`id: ${training.id} tytuł: ${training.title}`, training.id, false, parent);
    }
}