import HCaptcha from "@hcaptcha/react-hcaptcha";
import {getSiteKey} from "../utils/AuthUtils";

function Captcha(
    {
        setCaptchaToken,
        captchaRef
    }
) {
    const siteKey = getSiteKey();

    if(!siteKey)
        return <span className='text-success'>Captcha została wyłączona</span>;

    return (
        <>
            <HCaptcha
                sitekey={siteKey}
                onVerify={token => setCaptchaToken(token)}
                ref={captchaRef}
            />
        </>
    );
}

export default Captcha;