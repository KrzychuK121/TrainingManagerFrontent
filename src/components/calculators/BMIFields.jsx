import BasicBodyParameters from "./BasicBodyParameters";

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