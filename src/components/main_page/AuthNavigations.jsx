import { Navbar, Nav } from "react-bootstrap";

function AuthNavigations({classes}){
    const name = "admin";
    const surname = "admin";

    return (
        <>
            <Navbar.Text
                className="text-capitalize"
            >
                Witaj {name} {surname}!
            </Navbar.Text>
            <Nav.Link
                href="@{/logout}"
                className={classes.menuLink}
            >
                Wyloguj się
            </Nav.Link>
        </>
    );
}

export default AuthNavigations;