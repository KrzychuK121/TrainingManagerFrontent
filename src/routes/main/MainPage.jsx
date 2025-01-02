import {Container} from 'react-bootstrap';
import {Outlet} from 'react-router-dom';

import MainNavigation from '../../components/main_page/navigation/MainNavigation';
import './MainPage.module.css';
import {useWebsocket} from '../../contexts/ws/WebsocketContext';

function MainPage() {
    const {reminderComponent} = useWebsocket();
    return (
        <>
            <MainNavigation/>
            <Container>
                <main>
                    {reminderComponent}
                    <Outlet/>
                </main>
            </Container>
        </>
    );
}

export default MainPage;
