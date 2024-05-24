import Page from '../../components/utils/Page/Page';
import Column from '../../components/utils/Column/Column';
import { Button, TextField } from '@mui/material';
import Title from '../../components/ready/pages/startPage/Title/Title';
import DragonFruit from '../../components/ready/pages/startPage/DragonFruit/DragonFruit';
import FormBox from '../../components/ready/pages/startPage/FormBox/FormBox';
import { useSignIn} from '../../hooks/useSignIn';
import { useTranslation } from "react-i18next";

function SignInPage() {
  const { t } = useTranslation();
  var [login, setLogin, password, setPassword, signIn] = useSignIn();
  return (
    <div className="SignInPage" style={{width: '100%'}}>
      <Page>
        <Column>
          <Title title='Dietly' subtitle={t('Health life')}/>
        </Column>
        <Column widthPoints = {1}>
          <FormBox
            header={t('Sign in')}
            footer={
              <Button variant="contained" style={{backgroundColor: '#6D9EE6'}} fullWidth onClick={()=>{signIn(login, password)}}>{t('Submit')}</Button>
            }>
            <TextField id="standard-basic" label={t('Login')} variant="standard" fullWidth onChange={(event)=>{setLogin(event.target.value)}}/>
            <TextField id="standard-basic" label={t('Password')} type="password" autoComplete="current-password" variant="standard" fullWidth onChange={(event)=>{setPassword(event.target.value)}}/>
          </FormBox>
        </Column>
        <DragonFruit/>
      </Page>
    </div>
  );
}

export default SignInPage;
