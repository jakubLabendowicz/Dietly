import PlatformBar from "../../../utils/PlatformBar/PlatformBar";
import Button from '@mui/material/Button'
import '../../../utils/PlatformBar/PlatformBar';
import Logo from "../Logo/Logo";
import { useTranslation } from "react-i18next";

function StandardPlatformBar() {
    const { t } = useTranslation();
    return (
        <PlatformBar
            header={
                <div className="platform_bar_header__inner">
                    <Logo/>
                </div>
            }
            body={
                <div></div>
            }
            footer={
                <div className="platform_bar_footer__inner">
                    <Button variant="contained" style={{backgroundColor: '#CF113F'}} href='/sign-up'>
                        {t('Sign up')}
                    </Button>
                    <Button variant="contained" style={{backgroundColor: '#349951'}} href='/sign-in'>
                        {t('Sign in')}
                    </Button>
                </div>
            }/>
    );
}

export default StandardPlatformBar;