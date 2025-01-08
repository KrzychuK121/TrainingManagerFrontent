import {sendDefaultRequest} from "../../../utils/CRUDUtils";
import {getFilteredQueryString} from "../../../utils/URLUtils";
import {useLoaderData} from "react-router-dom";
import PaginationEntity from "../../../components/entities/crud/PaginationEntity";
import UserElement from "../../../components/admin/users/UserElement";
import {Row} from "react-bootstrap";

function UsersDisplay() {
    const loadedData = useLoaderData();
    const page = loadedData
    const users = loadedData.content;

    if(!Array.isArray(users) || !users.length)
        return <div><span>Brak użytkowników</span></div>;

    return (
        <>
            <Row>
                {users.map(user => (<UserElement key={user.id} user={user} />))}
            </Row>
            <PaginationEntity pages={page} />
        </>
    );
}

export default UsersDisplay;

export async function loader({request}) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const filteredQueryString = getFilteredQueryString(searchParams, ['page', 'sort', 'size']);

    return sendDefaultRequest(`auth/all-users${filteredQueryString}`);
}