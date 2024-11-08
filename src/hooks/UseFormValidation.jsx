import { useEffect, useState } from 'react';

function defaultGlobalErrorMapper(errors) {
    console.log('defaultGlobalErrorMapper invoked.');
    if (errors.hasOwnProperty('error'))
        return errors.error;
    return null;
}

/**
 * This hook is responsible for preparing tools to handle validation errors more efficiently.
 *
 * @param errors object with key as property of validated object and value as description of violated validation
 *               rule or object with key `error` and value as description of error associated with whole
 *               entity (not associated with field)
 * @param globalErrorMapper mapper that requires `errors` as parameter to map global error message.
 *                          No need to check if `errors` is null or undefined.
 *
 * @returns {
 *      {
 *          globalMessage: string,
 *          getValidationProp: ((function(*): ({}))|*),
 *          getValidationMessages: ((function(*): (undefined))|*)
 *      }
 * }
 * 1. `globalMessage` - message of error associated with whole object
 * 2. `getValidationProp` - function to get `isValid` and `isInvalid` props for input
 * fields based on provided prop name
 * 3. `getValidationMessages` - function to get validation message if provided property is invalid
 *
 */
export default function useFormValidation(
    errors,
    globalErrorMapper = defaultGlobalErrorMapper
) {
    const [globalMessage, setGlobalMessage] = useState(getGlobalError());
    useEffect(() => {
            console.log(errors);
            setGlobalMessage(getGlobalError());
        }, [errors]
    );

    function isValid(field) {
        const messages = getValidationMessages(field);
        if (!errors)
            return undefined;

        return messages === null;
    }

    function getValidationProp(field) {
        const isFieldValid = isValid(field);
        if (isFieldValid === undefined)
            return {};
        return isFieldValid
            ? {isValid: true}
            : {isInvalid: true};
    }

    function getValidationMessages(field) {
        if (!errors)
            return undefined;

        return errors.hasOwnProperty(field)
            ? errors[field]
            : null;
    }

    function getGlobalError() {
        if (!errors)
            return null;
        if (errors.hasOwnProperty('status') && errors.status === 500)
            return 'Wystąpił błąd serwera.';
        if (globalErrorMapper) {
            console.log('globalErrorMapper');
            return globalErrorMapper(errors);
        }
        return null;
    }

    return {
        globalMessage,
        getValidationProp,
        getValidationMessages
    };
}