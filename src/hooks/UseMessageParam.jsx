import {useSearchParams} from 'react-router-dom';
import AlertComponent from "../components/alerts/AlertComponent";

export default function useMessageParam(messageParam, displayIfSuccess) {
    const [searchParams] = useSearchParams();
    const paramFromPath = searchParams.get(messageParam);
    return {
        message: paramFromPath !== null
            ? displayIfSuccess
            : ''
    };
}

export function useMessageParams(
    paramsInfo,
    alertParams = {
        variant: 'success'
    }
) {
    const [searchParams] = useSearchParams();
    const messagesList = [];
    paramsInfo.forEach(
        ({messageParam, displayIfSuccess}) => {
            const paramFromPath = searchParams.get(messageParam);
            if (paramFromPath !== null)
                messagesList.push(displayIfSuccess);
        }
    );

    if(!messagesList.length)
        return {
            messages: null,
            UrlAlertsList: <></>
        };

    const messagesComponents = messagesList.map(
        message => (
            <AlertComponent
                key={message}
                message={message}
                variant={alertParams.variant}
                showTrigger={null}
                closeDelay={4000}
            />
        )
    );

    return {
        messages: messagesList,
        UrlAlertsList: (
            <>
                {messagesComponents}
            </>
        )
    };
}