import classes from './ExerciseParametersDisplay.module.css';

function ExerciseParametersDisplay(
    {
        label,
        value
    }
) {

    return (
        <div className={classes.displayDiv}>
            <span className={classes.label}>{label}:</span>
            <span className={classes.value}>{value ? value : 'brak'}</span>
        </div>
    );
}

export default ExerciseParametersDisplay;