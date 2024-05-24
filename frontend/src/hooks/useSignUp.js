import { useState } from "react";
import { postUser } from '../api/controllers/UserApi';
import { useTranslation } from "react-i18next";

export var useSignUp = () => {
    const { t } = useTranslation();
    var [stage, setStage] = useState(0);

    var [name, setName] = useState();
    var [surname, setSurname] = useState();
    var [email, setEmail] = useState();
    var [phone, setPhone] = useState();
    var [sex, setSex] = useState();
    var [yearOfBirth, setYearOfBirth] = useState();

    var [login, setLogin] = useState();
    var [password, setPassword] = useState();
    
    var [height, setHeight] = useState();
    var [weight, setWeight] = useState();
    var [targetWeight, setTargetWeight] = useState();
    var [activeLevel, setActiveLevel] = useState();

    var [filePath, setFilePath] = useState('https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745');

    var [displayTheme, setDisplayTheme] = useState();
    var [displayLanguage, setDisplayLanguage] = useState();

    var signUp = (data) => {
        postUser(data)
        .then(response => {
            window.location = '/sign-in'
        })
    }

    const themes = [
        {
          value: 'light:LIGHT',
          label: t('Light'),
        },
        {
          value: 'dark:DARK',
          label: t('Dark'),
        }
      ];
    
      const languages = [
        {
          value: 'pl:PL',
          label: t('Polish'),
        },
        {
          value: 'en:EN',
          label: t('English'),
        }
      ];

      const activeLevels = [
        {
            value: 1,
            label: '1',
        },
        {
            value: 2,
            label: '2',
        },
        {
            value: 3,
            label: '3',
        },
        {
            value: 4,
            label: '4',
        },
        {
            value: 5,
            label: '5',
        }
      ];

      const sexes = [
        {
            value: 'male',
            label: t('Male'),
        },
        {
            value: 'female',
            label: t('Female'),
        },
    ];

      const steps = [
        t('Personal'),
        t('Login'),
        t('Body'),
        t('Avatar'),
        t('Display')
      ];

    return [
        stage, setStage,
        name, setName, surname, setSurname, email, setEmail, phone, setPhone, yearOfBirth, setYearOfBirth, sex, setSex,
        password, setPassword, login, setLogin,
        height, setHeight, weight, setWeight, targetWeight, setTargetWeight, activeLevel, setActiveLevel,
        filePath, setFilePath,
        displayTheme, setDisplayTheme, displayLanguage, setDisplayLanguage,
        signUp,
        themes, languages, activeLevels, steps, sexes
    ];
}
