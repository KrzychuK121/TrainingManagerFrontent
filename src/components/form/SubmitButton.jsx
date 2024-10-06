import { Button, Spinner } from 'react-bootstrap';
import { useNavigation } from 'react-router-dom';

function SubmitButton(
    {
        display,
        submittingDisplay,
        variant = 'primary',
        ...rest
    }
) {
    const navigation = useNavigation();
    return (
        navigation.state !== 'submitting'
            ? <Button type='submit' variant={variant} {...rest}>{display}</Button>
            : <Button variant={variant} disabled {...rest}>
                {submittingDisplay}.. {' '}
                <Spinner animation='grow' size='sm'/>
            </Button>
    );
}

export default SubmitButton;