import BasicBodyParameters from "./assistant/write/BasicBodyParameters";

function BMIFields(
    {
        justifyContent = 'center'
    }
) {
    return (
        <BasicBodyParameters justifyContent={justifyContent} />
    );
}

export default BMIFields;