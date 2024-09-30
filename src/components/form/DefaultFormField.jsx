import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import FormField from './FormField';

function DefaultFormField(
    {
        name,
        type,
        defaultValue,
        useFormValidationObj,
        ...formFieldProps
    }
) {
    return (
        <FormField
            {...formFieldProps}
            errorMessages={useFormValidationObj.getValidationMessages(name)}
        >
            <Form.Control
                className='form-control'
                id={name}
                name={name}
                type={type}
                defaultValue={defaultValue}
                {...useFormValidationObj.getValidationProp(name)}
            />
        </FormField>
    );
}

FormField.propTypes = {
    className: PropTypes.string,
    ...FormField.propTypes
};

export default DefaultFormField;