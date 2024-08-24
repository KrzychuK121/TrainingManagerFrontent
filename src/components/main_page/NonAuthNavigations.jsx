import {Nav} from "react-bootstrap";

function NonAuthNavigations({classes}){
    return (
      <>
          <Nav.Link
              href="/main/login"
              className={classes.menuLink}
          >
              Zaloguj się
          </Nav.Link>
          <Nav.Link
              href="/main/register"
              className={classes.menuLink}
          >
              Rejestracja
          </Nav.Link>
      </>
    );
}

export default NonAuthNavigations;