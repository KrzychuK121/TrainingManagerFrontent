import classes from "./NonAuthWelcome.module.css";

function NonAuthWelcome(){
    return (
        <>
            <div>
                <h1>Witaj w aplikacji!</h1>
                <p style={{fontSize: '20px'}}>
                    Cieszę się, że zdecydowałeś/aś się skorzystać z aplikacji.
                </p>
            </div>
        </>
    );
}

export default NonAuthWelcome;