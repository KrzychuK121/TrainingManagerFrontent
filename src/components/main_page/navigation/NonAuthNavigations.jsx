import NavLink from './NavLink';

function NonAuthNavigations() {
    return (
        <>
            <NavLink
                label='Zaloguj się'
                href='/main/login'
            />
            <NavLink
                label='Rejestracja'
                href='/main/register'
            />
        </>
    );
}

export default NonAuthNavigations;