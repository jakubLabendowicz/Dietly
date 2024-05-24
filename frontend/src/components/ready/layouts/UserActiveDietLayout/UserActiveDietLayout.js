import { Checkbox, TextField } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Layout from "../../../utils/Layout/Layout";
import LayoutGroup from "../../../utils/LayoutGroup/LayoutGroup";
import LayoutSection from "../../../utils/LayoutSection/LayoutSection";

function UserActiveDietLayout(props) {
    const { t } = useTranslation();
    const standardFieldStyle = {width: "45%"};

    const [viewLayoutData, setViewLayoutData] = useState(props.data);
    const [saveLayoutData, setSaveLayoutData] = useState({});
    const handleChangeLayoutData = (key, value) => {
        let tempViewLayoutData = viewLayoutData;
        tempViewLayoutData[key] = value;
        setViewLayoutData(tempViewLayoutData);

        let tempSaveLayoutData = saveLayoutData;
        tempSaveLayoutData[key] = value;
        setSaveLayoutData(tempSaveLayoutData);
        props.onChangeLayoutData(saveLayoutData);
        console.log(saveLayoutData);
    }

    const defaultValue = (value)=>{
        if(value!==undefined) return value;
        else return null;
    }

    return (
        <Layout>
            <LayoutSection
                header={t("Details")}>
                <TextField id="standard-basic" label={t('Start time')} defaultValue={defaultValue(viewLayoutData.startTime)} variant="standard" type="date" style={standardFieldStyle} onChange={(event)=>{handleChangeLayoutData("startTime", event.target.valueAsDate)}}/>
                <TextField id="standard-basic" label={t('End time')} defaultValue={defaultValue(viewLayoutData.endTime)} variant="standard" type="date" style={standardFieldStyle} onChange={(event)=>{handleChangeLayoutData("endTime", event.target.valueAsDate)}}/>
                <div style={{borderBottom: "1px solid black", width: "100%"}}>
                    {t('Active')}
                    <Checkbox id="standard-basic" label={t('Active')} defaultValue={defaultValue(viewLayoutData.active)} onChange={(event)=>{handleChangeLayoutData("active", event.target.checked)}}/>
                </div>
            </LayoutSection>
        </Layout>
    )
}

export default UserActiveDietLayout;