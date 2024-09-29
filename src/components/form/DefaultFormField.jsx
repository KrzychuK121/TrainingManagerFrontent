import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import FormField from './FormField';

function DefaultFormField(
    {
        name,
        type,
        defaultValue,
        isValidProp,
        ...formFieldProps
    }
) {
    return (
        <FormField {...formFieldProps}>
            <Form.Control
                className='form-control'
                id={name}
                name={name}
                type={type}
                defaultValue={defaultValue}
                {...isValidProp}
            />
        </FormField>
    );
}

FormField.propTypes = {
    className: PropTypes.string,
    ...FormField.propTypes
};

export default DefaultFormField;