import classes from './MainWelcome.module.css';
import AlertComponent from '../../components/alerts/AlertComponent';
import useMessageParam from '../../hooks/UseMessageParam';
import {LOGIN_SUCCESS} from '../navigations/authentication/Login';
import {Link} from "react-router-dom";

function MainWelcome() {
    // TODO: Maybe change content depending on auth status
    const {message} = useMessageParam(
        LOGIN_SUCCESS,
        'Logowanie ukończone pomyślnie.'
    );

    return (
        <>
            <div>
                <AlertComponent message={message} showTrigger={null}/>
                <h1>Witaj w aplikacji!</h1>
                <p className={classes.description}>
                    "Training Manager" to miejsce, w którym znajdziesz potrzebną wiedzę aby postawić pierwsze kroki
                    na drodze do zdrowej sylwetki i lepszego samopoczucia. Jeśli pierwsze kroki masz już za sobą,
                    również znajdziesz tu coś dla siebie. Znajdziesz tu ćwiczenia czy treningi innych użytkowników,
                    które mogą Cię zainspirować do wdrożenia do własnej rutyny. Możesz również w prosty sposób
                    zaprojektować
                    nową rutynę automatycznie i dostosować jej parametry pod swoje indywidualne potrzeby co zaoszczędzi
                    czas.
                </p>
                <hr/>

                <h2>Pierwsze kroki</h2>
                <p className={classes.description}>
                    "Training Manager" powstał z myślą o ludziach, którzy chcą rozpocząć swoją przygodę z siłownią.
                    Dzięki <Link className={classes.descLink} to={'/main/workout/assistant'}>asystentowi
                    treningowemu</Link> użytkownicy w prosty sposób mogą wybrać jaki trening ich interesuje a aplikacja
                    sama zaprojektuje rutynę na cały tydzień.
                </p>
                <hr/>

                <h2>System przypomnień</h2>
                <p className={classes.description}>
                    Zdarza Ci się zapomnieć o treningu? A może potrzebujesz przypomnienia by zmobilizować się do
                    ćwiczeń?
                    Niezależnie jaki masz powód, "Training Manager" służy pomocą w postaci systemu powiadomień. Po
                    każdym
                    logowaniu do aplikacji zostaniesz poinformowany o nadchodzącym treningu. Jeśli zalogujesz się po
                    ustalonej porze treningu, będziesz miał możliwość zrealizować zaległy trening.
                </p>
                <hr/>

                <h2>Steruj swoim treningiem</h2>
                <p className={classes.description}>
                    Po <Link className={classes.descLink} to={'/main/plans/create'}>utworzeniu rutyny</Link> możesz
                    ją aktywować a wtedy system będzie przypominał Ci o treningach. Gdy utworzysz i aktywujesz już rutynę
                    jej zapis będzie dostępny <Link className={classes.descLink} to={'/main/plans/week'}>tutaj</Link>.
                    Dodatkowo w zakładce <Link className={classes.descLink} to={'/main/training/train'}>"Zacznij trening!"</Link>
                    pojawi się panel do sterowania aktualnego treningu. Panel sterowania ułatwi kontrolowanie jakie
                    ćwiczenia masz już za sobą, ile zostało do końca, oraz które zdecydujesz pominąć.
                </p>
                <hr/>

                <h2>Monitorowanie postępów</h2>
                <p className={classes.description}>
                    Chcesz wiedzieć jak na przestrzeni czasu wyglądały Twoje treningi ale nie masz czasu zapisywać
                    wszystkich
                    statystyk samemu? Nie ma problemu! Możesz skorzystać ze <Link className={classes.descLink}
                                                                                  to={'/main/workout/statistics'}>
                    statystyk</Link>, które są generowane automatycznie po wykonaniu treningu z pomocą aplikacji.
                </p>
            </div>
        </>
    );
}

export default MainWelcome;