import { Form } from 'react-bootstrap';

function SelectField(
    {
        title,
        name,
        firstElemDisplay,
        options,
        multiple = false,
        selectedValues = null
    }
) {
    return (
        <>
            <Form.Select
                aria-label={title}
                name={name}
                multiple={multiple}
                defaultValue={selectedValues}
            >
                {
                    firstElemDisplay && <option>--{firstElemDisplay}--</option>
                }
                {
                    options.map(
                        ({value, description}) => (
                            <option
                                key={value + description}
                                value={value}
                            >
                                {description}
                            </option>
                        )
                    )
                }
            </Form.Select>
        </>
    );
}

export default SelectField;