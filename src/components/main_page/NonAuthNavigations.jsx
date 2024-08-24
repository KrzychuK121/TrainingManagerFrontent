import {Nav} from "react-bootstrap";

function NonAuthNavigations({classes}){
    return (
      <>
          <Nav.Link
              href="@{/login}"
              className={classes.menuLink}
          >
              Zaloguj się
          </Nav.Link>
          <Nav.Link
              href="@{/register}"
              className={classes.menuLink}
          >
              Rejestracja
          </Nav.Link>
      </>
    );
}

export default NonAuthNavigations;