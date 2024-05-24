import { useEffect, useState } from "react";
import { getMe } from "../../../../../api/controllers/MeApi";
import HeightIcon from '@mui/icons-material/Height';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import CalculateIcon from '@mui/icons-material/Calculate';
import { useTranslation } from "react-i18next";

function MeDetails() {
    const { t } = useTranslation();
    var [path, setPath] = useState();
    var [name, setName] = useState();
    var [surname, setSurname] = useState();
    var [height, setHeight] = useState();
    var [weight, setWeight] = useState();
    var [bmi, setBmi] = useState();
    
    useEffect(()=>{
        getMe()
        .then(response => {
            setPath(response.data.file.path);
            setName(response.data.name);
            setSurname(response.data.surname);
            setHeight(response.data.height);
            setWeight(response.data.weight);
        })
    })
    return (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", gap: 64}}>
            <div style={{backgroundColor: '#eeeefe', height: 250, width: 250, borderRadius: 20, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <img src={path} style={{height: 250, width: 250, borderRadius: 20}}/>
            </div>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: 32}}>
                <div style={{fontSize: 24}}>{name + ' ' + surname}</div>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 8}}>
                    <div><HeightIcon/></div>
                    <b>{t('Height')}: </b>
                    <div>{height + " cm"}</div>
                </div>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 8}}>
                    <div><MonitorWeightIcon/></div>
                    <b>{t('Weight')}: </b>
                    <div>{weight + " kg"}</div>
                </div>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 8}}>
                    <div><CalculateIcon/></div>
                    <b>{t('BMI')}: </b>
                    <div>{Math.round((weight/(height*height/10000))*100)/100}</div>
                </div>
            </div>
        </div>
    );
}

export default MeDetails;