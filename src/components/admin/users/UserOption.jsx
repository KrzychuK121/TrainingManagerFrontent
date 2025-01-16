import {Form as RouterForm} from "react-router-dom";

function UserOption(
    {
        method,
        actionName,
        user,
        children
    }
) {
    return (
        <RouterForm
            method={method}
            className='d-inline'
        >
            <input type='hidden' name='actionName' value={actionName} />
            <input type='hidden' name='userId' value={user.id} />
            {children}
        </RouterForm>
    );
}

export default UserOption;