import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';

// TODO: Might be deleted later

function LogoutPage(){
    return (
        <div style={{color: 'wheat'}}>
            <h1>Nastąpiło wylogowanie z konta</h1>
            <Row
                className='align-items-center'
                style={{height: '150px'}}
            >
                <p style={{fontSize: '25px'}}>
                    Powróć na stronę główną klikając <Link to='/'>tutaj</Link>.
                </p>
            </Row>
        </div>
    );
}

export default LogoutPage;