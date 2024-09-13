import './MainWelcome.module.css';

function MainWelcome() {
    // TODO: Maybe change content depending on auth status
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

export default MainWelcome;