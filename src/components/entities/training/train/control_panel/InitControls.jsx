import OptionButton from './OptionButton';

function InitControls(
    {
        moveToNextAndMarkStatus,
        setStartDate
    }
) {

    function handleStartTraining() {
        moveToNextAndMarkStatus(null);
        setStartDate(new Date());
    }

    return (
        <OptionButton
            onClick={handleStartTraining}
            label='START'
        />
    );
}

export default InitControls;