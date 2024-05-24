import { Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { getMe, patchMe } from "../../../../../api/controllers/MeApi";
import { useSettings } from "../../../../../hooks/useSettings";
import Section from "../../../../utils/Section/Section";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { useTranslation } from "react-i18next";

function BodyDataSettings() {
    const { t } = useTranslation();
    var [
        height, setHeight, weight, setWeight, targetWeight, setTargetWeight,
      ] = useSettings();
    
      useEffect(()=>{
        getMe()
        .then(response => {
            setHeight(response.data.height);
            setWeight(response.data.weight);
            setTargetWeight(response.data.targetWeight);
        })
      }, [])
    return (
        <Section
            header={
                <div style={{display: "flex",flexDirection: "row", alignItems:"center", gap:8}}><FitnessCenterIcon/><div>{t('Body data')}</div></div>
            }
            footer={
                <div style={{display: "flex", flexDirection: "row-reverse"}}>
                    <Button variant="contained" style={{backgroundColor: '#6D9EE6', width: 200}} onClick={()=>{patchMe({height:Number(height), weight:Number(weight), targetWeight:Number(targetWeight)})}}>{t('Save')}</Button>
                </div>
            }>
            <TextField id="standard-basic" label={t('Height')} value={height} defaultValue="Height" variant="standard" type="number" onChange={(event)=>{setHeight(event.target.value)}}/>
            <TextField id="standard-basic" label={t('Weight')} value={weight} defaultValue="Weight" variant="standard" type="number" onChange={(event)=>{setWeight(event.target.value)}}/>
            <TextField id="standard-basic" label={t('Target Weight')} value={targetWeight} defaultValue="Target Weight" variant="standard" type="number" onChange={(event)=>{setTargetWeight(event.target.value)}}/>
        </Section>
    );
}

export default BodyDataSettings;