import OptionButton from './OptionButton';

function InitControls({setCurrExerciseNumber}) {

    function handleStartTraining() {
        setCurrExerciseNumber(0);
    }

    return (
        <OptionButton
            onClick={handleStartTraining}
            label='START'
        />
    );
}

export default InitControls;