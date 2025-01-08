import {Card, Col} from "react-bootstrap";

function UserElement(
    {
        user
    }
) {
    const confirmTitle = 'Ta akcja może wpłynąć na treningi i ćwiczenia przypisane do użytkownika. Czy chcesz je zachować jako publiczne?';
    return (
        <>
            <Col sm={6} lg={4}>
                <Card className='m-3'>
                    <Card.Header className='text-uppercase'>{user.username}</Card.Header>
                    <Card.Body>
                        <div>
                            <span style={{fontWeight: 'bold'}}>Imię i nazwisko: </span>
                            <span>{user.firstName} {user.lastName}</span>
                        </div>
                        <div>
                            <span style={{fontWeight: 'bold'}}>Rola: </span>
                            <span>{user.role}</span>
                        </div>
                        <hr />
                        <div>
                            <span style={{fontWeight: 'bold'}}>Opcje: </span>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
}

export default UserElement;