import { useEffect } from 'react';

export default function useClearForm(trigger, formRef) {
    useEffect(() => {
        if (trigger) {
            formRef.current.reset();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [trigger]);
}