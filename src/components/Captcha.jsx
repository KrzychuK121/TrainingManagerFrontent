import HCaptcha from "@hcaptcha/react-hcaptcha";

function Captcha({setCaptchaToken}) {
    const siteKey = process.env.REACT_APP_SITE_KEY;

    if(siteKey === 'disabled')
        return <span className='text-success'>Captcha została wyłączona</span>;

    return (
        <>
            <HCaptcha
                sitekey={siteKey}
                onVerify={token => setCaptchaToken(token)}
            />
        </>
    );
}

export default Captcha;