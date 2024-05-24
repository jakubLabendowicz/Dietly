import { Button, MenuItem, TextField } from "@mui/material";
import { getMe, patchMe } from "../../../../../api/controllers/MeApi";
import { useSettings } from "../../../../../hooks/useSettings";
import Section from "../../../../utils/Section/Section";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function PersonalSettings() {
    const { t } = useTranslation();
    var [
        name, setName, surname, setSurname, email, setEmail, phone, setPhone, sex, setSex, yearOfBirth, setYearOfBirth
    ] = useSettings();
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
    useEffect(() => {
        getMe()
            .then(response => {
                setName(response.data.name);
                setSurname(response.data.surname);
                setEmail(response.data.email);
                setPhone(response.data.phone);
                setSex(response.data.sex);
                setYearOfBirth(response.data.yearOfBirth);
            })
    }, [])
    return (
        <Section
            header={<div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 8 }}><AccountCircleIcon /><div>{t('Personal Settings')}</div></div>}
            footer={
                <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                    <Button variant="contained" style={{ backgroundColor: '#6D9EE6', width: 200 }} onClick={() => { patchMe({ name: name, surname: surname, email: email, phone: phone, sex: sex, yearOfBirth: yearOfBirth }) }}>{t('Save')}</Button>
                </div>
            }>
            <TextField id="standard-basic" label={t('First name')} value={name} variant="standard" type="text" fullWidth onChange={(event) => { setName(event.target.value) }} />
            <TextField id="standard-basic" label={t('Last name')} value={surname} variant="standard" type="text" fullWidth onChange={(event) => { setSurname(event.target.value) }} />
            <TextField id="standard-basic" label={t('Year of birth')} value={yearOfBirth} variant="standard" type="number" fullWidth onChange={(event) => { setYearOfBirth(event.target.valueAsNumber) }} />
            <TextField id="standard-basic" label={t('Email')} value={email} defaultValue="Email" variant="standard" type="email" fullWidth onChange={(event) => { setEmail(event.target.value) }} />
            <TextField id="standard-basic" label={t('Phone')} value={phone} defaultValue="Phone" variant="standard" type="tel" fullWidth onChange={(event) => { setPhone(event.target.value) }} />
            <TextField id="standard-basic" label={t('Sex')} value={sex} defaultValue="Male" variant="standard" select type="text" fullWidth onChange={(event) => { setSex(event.target.value) }}>
                {sexes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

        </Section>
    );
}

export default PersonalSettings;