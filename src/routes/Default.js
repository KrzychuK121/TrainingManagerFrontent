import 'bootstrap/dist/css/bootstrap.min.css';
import './Default.module.css';
import {Outlet} from 'react-router-dom';
import LoadingScreen from "../components/LoadingScreen";

function Default() {
    return (
        <>
            <LoadingScreen />
            <Outlet/>
        </>
    );
}

export default Default;
