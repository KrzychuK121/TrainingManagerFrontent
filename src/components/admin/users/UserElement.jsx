import {Card, Col} from "react-bootstrap";
import {faLock, faLockOpen, faShield} from "@fortawesome/free-solid-svg-icons";
import UserOptionButton from "./UserOptionButton";
import UserOption from "./UserOption";

function userIsInRole(user, role) {
    return user.role.role.toLowerCase() === role.toLowerCase();
}

function UserElement(
    {
        user
    }
) {
    const isUser = userIsInRole(user, 'user');

    const lockedData = {
        variant: user.locked ? 'primary' : 'danger',
        icon: user.locked ? faLockOpen : faLock,
        tooltip: user.locked ? 'Odblokuj' : 'Zablokuj',
        toLock: Boolean(!user.locked).toString(),
    }

    const promotionData = {
        variant: isUser ? 'primary' : 'danger',
        icon: faShield,
        tooltip: isUser ? 'Mianuj moderatorem' : 'Degraduj do użytkownika',
        promoteTo: isUser ? 'moderator' : 'user'
    }

    return (
        <>
            <Col sm={6} lg={4}>
                <Card className='m-3'>
                    <Card.Header className='d-flex align-items-center justify-content-between'>
                        <span className='text-uppercase'>
                            {user.username}
                        </span>
                        <div>
                            <UserOption
                                method='patch'
                                actionName='lock'
                                user={user}
                            >
                                <input type='hidden' name='toLock' value={lockedData.toLock} />
                                <UserOptionButton
                                    variant={lockedData.variant}
                                    icon={lockedData.icon}
                                    tooltip={lockedData.tooltip}
                                />
                            </UserOption>
                            {
                                !user.locked && (
                                    <UserOption
                                        method='patch'
                                        actionName='changeRole'
                                        user={user}
                                    >
                                        <input type='hidden' name='promoteTo' value={promotionData.promoteTo}/>
                                        <UserOptionButton
                                            variant={promotionData.variant}
                                            icon={promotionData.icon}
                                            tooltip={promotionData.tooltip}
                                        />
                                    </UserOption>
                                )
                            }
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <div>
                            <span style={{fontWeight: 'bold'}}>Imię i nazwisko: </span>
                            <span className='text-capitalize'>{user.firstName} {user.lastName}</span>
                        </div>
                        <div>
                            <span style={{fontWeight: 'bold'}}>Rola: </span>
                            <span className='text-capitalize'>{user.role.roleDisplay}</span>
                        </div>
                        <div>
                            <span style={{fontWeight: 'bold'}}>Zablokowany? </span>
                            <span>{user.locked ? 'Tak' : 'Nie'}</span>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
}

export default UserElement;