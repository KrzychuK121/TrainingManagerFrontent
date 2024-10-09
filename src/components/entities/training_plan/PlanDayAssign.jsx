import { Card, Form } from 'react-bootstrap';

function PlanDayAssign({weekday, weekdayDisplay}) {
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
                    <Form.Control id={`search${weekday}`}/>
                    <Form.Label htmlFor={`training${weekday}`} column={true}>
                        Wybierz trening:
                    </Form.Label>
                    <!--th:name="|training${dayToAssign}|"-->
                    <!---->
                    <select
                        // th:field="*{planWriteMap['__${weekday}__'].trainingId}"
                        id={`training${weekday}`}
                    >
                        <option value='0' selected>--Dzień wolny--</option>
                    </select>
                    <Form.Label htmlFor={`trainingTime${weekday}`} column={true}>
                        Godzina treningu:
                    </Form.Label>
                    <input
                        id={`trainingTime${weekday}`}
                        // th:field="*{planWriteMap['__${weekday}__'].trainingTime}"
                        pattern='[0-9]{2}:[0-9]{2}'
                    />
                </p>
                <!--<a href="#" class="btn btn-primary">Zrób trening</a>-->
            </Card.Body>
        </Card>
    );
}

export default;