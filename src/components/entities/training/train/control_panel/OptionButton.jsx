import { Button } from 'react-bootstrap';

import classes from './OptionButton.module.css';

function OptionButton(
    {
        onClick,
        label,
        ...rest
    }
) {
    return (
        <Button
            className={classes.opt}
            onClick={onClick}
            {...rest}
        >
            {label}
        </Button>
    );
}

export default OptionButton;