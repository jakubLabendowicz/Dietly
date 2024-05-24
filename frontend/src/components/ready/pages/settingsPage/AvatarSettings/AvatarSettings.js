import { Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { getMe } from "../../../../../api/controllers/MeApi";
import { useSettings } from "../../../../../hooks/useSettings";
import Section from "../../../../utils/Section/Section";
import PhotoIcon from '@mui/icons-material/Photo';
import { patchFile } from "../../../../../api/controllers/FileApi";
import { useTranslation } from "react-i18next";

function AvatarSettings() {
    const { t } = useTranslation();
    var [
        filePath, setFilePath, fileId, setFileId, updateFilePath
    ] = useSettings();

    updateFilePath = (fileId, filePath) => {
        patchFile(fileId, {path: filePath});
    }
    
    useEffect(()=>{
        getMe()
        .then(response => {
            setFilePath(response.data.file.path);
            setFileId(response.data.fileId);
        })
    }, [])
    return (
        <Section
            header={
                <div style={{display: "flex",flexDirection: "row", alignItems:"center", gap:8}}><PhotoIcon/><div>{t('Avatar')}</div></div>
            }
            footer={
                <div style={{display: "flex", flexDirection: "row-reverse"}}>
                    <Button variant="contained" style={{backgroundColor: '#6D9EE6', width: 200}} onClick={()=>{updateFilePath(fileId, filePath)}}>{t('Save')}</Button>
                </div>
            }>
            <TextField id="standard-basic" label={t('Avatar path')} defaultValue="Profile picture path" value={filePath} variant="standard" type="url" fullWidth onChange={(event)=>{setFilePath(event.target.value)}}/>
            <center>
                <img src={filePath} style={{width: "30%", margin: "64px 0px"}}/>
            </center>
        </Section>
    );
}

export default AvatarSettings;