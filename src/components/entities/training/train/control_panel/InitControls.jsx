import OptionButton from './OptionButton';

function InitControls(
    {
        setCurrExerciseNumber,
        moveToNextAndMarkStatus
    }
) {

    function handleStartTraining() {
        moveToNextAndMarkStatus(null);
    }

    return (
        <OptionButton
            onClick={handleStartTraining}
            label='START'
        />
    );
}

export default InitControls;