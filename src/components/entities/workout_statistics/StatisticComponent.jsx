import {Col, Row} from 'react-bootstrap';

function StatisticComponent(
    {
        label,
        value
    }
) {
    return (
        <Row className='mb-3'>
            <Col sm={4} as='span'>
                {label}:
            </Col>
            <Col sm={8}>
                {value}
            </Col>
        </Row>
    );
}

export default StatisticComponent;