import { TextField } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Layout from "../../../utils/Layout/Layout";
import LayoutGroup from "../../../utils/LayoutGroup/LayoutGroup";
import LayoutSection from "../../../utils/LayoutSection/LayoutSection";

function DietLayout(props) {
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

    const [viewLayoutFileData, setViewLayoutFileData] = useState(props.data.file);
    const handleChangeLayoutFileData = (value) => {
        setViewLayoutFileData({path: value});
        props.onChangeLayoutFileData({path: value});
    }

    const defaultValue = (value)=>{
        if(value!==undefined) return value;
        else return null;
    }

    return (
        <Layout>
            {viewLayoutFileData!==null&&viewLayoutFileData.path!==null&&viewLayoutFileData.path!==""&&
                <LayoutSection>
                    <center>
                        <img src={viewLayoutFileData.path} style={{width: "30%", margin: "64px 0px"}}/>
                    </center>
                </LayoutSection>
            }
            <LayoutGroup>
                <LayoutSection
                    header={"Details"}>
                    <TextField id="standard-basic" label={t('Name')} defaultValue={defaultValue(viewLayoutData.name)} variant="standard" type="text" style={standardFieldStyle} onChange={(event)=>{handleChangeLayoutData("name", event.target.value)}}/>
                    <TextField id="standard-basic" label={t('Photo path')} defaultValue={viewLayoutFileData!==null?viewLayoutFileData.path:""} variant="standard" type="text" style={standardFieldStyle} onChange={(event)=>{handleChangeLayoutFileData(event.target.value)}}/>
                    <TextField id="standard-basic" label={t('Description')} defaultValue={defaultValue(viewLayoutData.description)} variant="standard" type="text" fullWidth onChange={(event)=>{handleChangeLayoutData("description", event.target.value)}}/>
                </LayoutSection>
            </LayoutGroup>
        </Layout>
    )
}

export default DietLayout;