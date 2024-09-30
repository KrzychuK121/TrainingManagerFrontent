import { useSearchParams } from 'react-router-dom';

export default function useMessageParam(messageParam, displayIfSuccess) {
    const [searchParams] = useSearchParams();
    const paramFromPath = searchParams.get(messageParam);
    return {
        message: paramFromPath !== null
            ? displayIfSuccess
            : ''
    };
}

export function useMessageParams(paramsInfo) {
    const [searchParams] = useSearchParams();
    const messagesList = [];
    paramsInfo.forEach(
        ({messageParam, displayIfSuccess}) => {
            const paramFromPath = searchParams.get(messageParam);
            if (paramFromPath !== null)
                messagesList.push(displayIfSuccess);
        }
    );

    return {
        messages: messagesList.length
            ? messagesList
            : null
    };
}