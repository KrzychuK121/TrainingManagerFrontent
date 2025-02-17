import HCaptcha from "@hcaptcha/react-hcaptcha";
import {getSiteKey} from "../utils/AuthUtils";
import styles from './Captcha.module.css';

function Captcha(
    {
        setCaptchaToken,
        captchaRef
    }
) {
    const siteKey = getSiteKey();

    if(!siteKey)
        return (
            <div className={styles.captchaOffBlock}>
                <span className='text-success'>Captcha została wyłączona</span>
            </div>
        );

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