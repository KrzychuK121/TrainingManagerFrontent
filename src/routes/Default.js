import 'bootstrap/dist/css/bootstrap.min.css';
import './Default.module.css';
import { Outlet } from 'react-router-dom';

function Default() {
    return (
        <Outlet/>
    );
}

export default Default;
