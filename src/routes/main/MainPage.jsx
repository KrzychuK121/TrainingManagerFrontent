import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

import MainNavigation from '../../components/main_page/navigation/MainNavigation';
import './MainPage.module.css';

function MainPage() {
    return (
        <>
            <MainNavigation/>
            <Container>
                <main>
                    <Outlet/>
                </main>
            </Container>
        </>
    );
}

export default MainPage;
