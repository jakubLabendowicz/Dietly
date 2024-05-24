import { Checkbox, Input, InputAdornment, InputBase, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getNutrients } from "../../../../api/controllers/NutrientApi";
import Layout from "../../../utils/Layout/Layout";
import LayoutGroup from "../../../utils/LayoutGroup/LayoutGroup";
import LayoutSection from "../../../utils/LayoutSection/LayoutSection";
import UnitField from "../../platform/UnitField/UnitField";

function ProductLayout(props) {
    const { t } = useTranslation();
    const standardFieldStyle = {width: "45%"};

    const defaultValue = (value)=>{
        if(value!==undefined) return value;
        else return null;
    }

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

    const [viewLayoutNutrientsData, setViewLayoutNutrientsData] = useState([]);
    const [saveLayoutNutrientsData, setSaveLayoutNutrientsData] = useState([]);
    const handleChangeLayoutNutrientsData = (key, value) => {
        let tempViewLayoutNutrientsData = viewLayoutNutrientsData;
        tempViewLayoutNutrientsData[key] = value;
        setViewLayoutNutrientsData(tempViewLayoutNutrientsData);

        let tempSaveLayoutNutrientsData = saveLayoutNutrientsData;
        tempSaveLayoutNutrientsData[key] = value;
        setSaveLayoutNutrientsData(tempSaveLayoutNutrientsData);
        props.onChangeLayoutNutrientsData(saveLayoutNutrientsData);
    }

    useEffect(()=>{
        getNutrients()
        .then((response)=>{
            console.log(response.data);
            let productNutrients = [];
            for (const nutrient of response.data) {
                var productNutrient = {
                    id: undefined,
                    quantity: 0,
                    nutrient: nutrient,
                    nutrientId: nutrient.id
                }
                for (const dataProductNutrient of props.data.productNutrients) {
                    if(dataProductNutrient.nutrient.code === nutrient.code) productNutrient = dataProductNutrient;
                }
                productNutrients.push(productNutrient);
            }
            setViewLayoutNutrientsData(productNutrients);
        })
    }, [props.data]);

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
                    header={t('Basic information')}>
                    <TextField id="standard-basic" label={t('Name')} defaultValue={defaultValue(viewLayoutData.name)} variant="standard" type="text" style={standardFieldStyle} onChange={(event)=>{handleChangeLayoutData("name", event.target.value)}}/>
                    <TextField id="standard-basic" label={t('Category')} defaultValue={defaultValue(viewLayoutData.category)} variant="standard" type="text" style={standardFieldStyle} onChange={(event)=>{handleChangeLayoutData("category", event.target.value)}}/>
                    <TextField id="standard-basic" label={t('Producer')} defaultValue={defaultValue(viewLayoutData.producer)} variant="standard" type="text" style={standardFieldStyle} onChange={(event)=>{handleChangeLayoutData("producer", event.target.value)}}/>
                    <TextField id="standard-basic" label={t('Code')} defaultValue={defaultValue(viewLayoutData.code)} variant="standard" type="text" style={standardFieldStyle} onChange={(event)=>{handleChangeLayoutData("code", event.target.value)}}/>
                    <UnitField defaultValue={defaultValue(viewLayoutData.unitId)} style={standardFieldStyle} onChange={(value)=>{handleChangeLayoutData("unitId", value)}}/>
                    <TextField id="standard-basic" label={t('Quantity')} defaultValue={defaultValue(viewLayoutData.quantity)} variant="standard" type="number" style={standardFieldStyle} onChange={(event)=>{handleChangeLayoutData("quantity", event.target.valueAsNumber)}}/>
                    <TextField id="standard-basic" label={t('Photo path')} defaultValue={viewLayoutFileData!==null?viewLayoutFileData.path:""} variant="standard" type="text" style={standardFieldStyle} onChange={(event)=>{handleChangeLayoutFileData(event.target.value)}}/>
                    <TextField id="standard-basic" label={t('Description')} defaultValue={defaultValue(viewLayoutData.description)} multiline variant="standard" type="text" fullWidth onChange={(event)=>{handleChangeLayoutData("description", event.target.value)}}/>
                </LayoutSection>
                <LayoutSection
                    header={t('Additional information')}>
                    <div style={{borderBottom: "1px solid black", width: standardFieldStyle.width}}>
                        {t('Vegan')}
                        <Checkbox id="standard-basic" label={t('Vegan')} defaultValue={defaultValue(viewLayoutData.vegan)} onChange={(event)=>{handleChangeLayoutData("vegan", event.target.checked)}}/>
                    </div>
                    <div style={{borderBottom: "1px solid black", width: standardFieldStyle.width}}>
                        {t('Vegetarian')}
                        <Checkbox id="standard-basic" label={t('Vegetarian')} defaultValue={defaultValue(viewLayoutData.vegetarian)} onChange={(event)=>{handleChangeLayoutData("vegetarian", event.target.checked)}}/>
                    </div>
                    <TextField id="standard-basic" label={t('Nutri-Score')} defaultValue={defaultValue(viewLayoutData.nutriScore)} variant="standard" type="text" style={standardFieldStyle} onChange={(event)=>{handleChangeLayoutData("nutriScore", event.target.value)}}/>
                </LayoutSection>
            </LayoutGroup>          
            <LayoutSection
                header={t('Nutrients')}>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>{t('Nutrients')}</TableCell>
                            <TableCell align="right">100 g</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {viewLayoutNutrientsData && viewLayoutNutrientsData.map((row, index) => (
                            <TableRow
                            key={row.nutrient.viewName}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{t(row.nutrient.viewName)}</TableCell>
                                <TableCell align="right">
                                    <InputBase
                                        id="standard-basic"
                                        defaultValue={defaultValue(row.quantity)}
                                        variant="standard"
                                        type="number"
                                        endAdornment={<InputAdornment position="end">{row.nutrient.unit.viewName}</InputAdornment>}
                                        style={{width: 100}}
                                        onChange={(event)=>{handleChangeLayoutNutrientsData(index, {id: row.id, nutrientId: row.nutrientId, nutrient: row.nutrient, quantity: event.target.valueAsNumber})}}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </LayoutSection>
        </Layout>
    )
}

export default ProductLayout;