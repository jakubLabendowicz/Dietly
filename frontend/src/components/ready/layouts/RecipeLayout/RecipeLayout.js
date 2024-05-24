import { Button, Checkbox, IconButton, InputAdornment, InputBase, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { searchProducts } from "../../../../api/controllers/ProductApi";
import Layout from "../../../utils/Layout/Layout";
import LayoutGroup from "../../../utils/LayoutGroup/LayoutGroup";
import LayoutSection from "../../../utils/LayoutSection/LayoutSection";
import UnitField from "../../platform/UnitField/UnitField";
import AddIcon from '@mui/icons-material/Add';

function RecipeLayout(props) {
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
    }

    const [viewLayoutFileData, setViewLayoutFileData] = useState(props.data.file);
    const handleChangeLayoutFileData = (value) => {
        setViewLayoutFileData({path: value});
        props.onChangeLayoutFileData({path: value});
    }

    const [viewLayoutRecipeProductsData, setViewLayoutRecipeProductsData] = useState(props.data.recipeProducts);
    const [saveLayoutRecipeProductsData, setSaveLayoutRecipeProductsData] = useState([]);
    const handleChangeLayoutRecipeProductsData = (key, value) => {
        let tempViewLayoutRecipeProductsData = viewLayoutRecipeProductsData;
        tempViewLayoutRecipeProductsData[key] = value;
        setViewLayoutRecipeProductsData(tempViewLayoutRecipeProductsData);

        let tempSaveLayoutRecipeProductsData = saveLayoutRecipeProductsData;
        tempSaveLayoutRecipeProductsData[key] = value;
        setSaveLayoutRecipeProductsData(tempSaveLayoutRecipeProductsData);
        props.onChangeLayoutRecipeProductsData(saveLayoutRecipeProductsData);
    }
    const handleAddLayoutRecipeProductsData = (value) => {
        let tempViewLayoutRecipeProductsData = viewLayoutRecipeProductsData;
        tempViewLayoutRecipeProductsData.push(value);
        setViewLayoutRecipeProductsData(tempViewLayoutRecipeProductsData);

        let tempSaveLayoutRecipeProductsData = saveLayoutRecipeProductsData;
        tempSaveLayoutRecipeProductsData.push(value);
        setSaveLayoutRecipeProductsData(tempSaveLayoutRecipeProductsData);
        props.onChangeLayoutRecipeProductsData(saveLayoutRecipeProductsData);
    }

    let [searchedProducts, setSearchedProducts] = useState();
    let [searchedProductsTerm, setSearchedProductsTerm] = useState();
    let handleSearchProducts = (term) => {
        setSearchedProductsTerm(term);
        searchProducts(term)
        .then(response => {
            setSearchedProducts(response.data);
        });
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
                    header={t('Basic information')}>
                    <TextField id="standard-basic" label={t('Name')} defaultValue={defaultValue(viewLayoutData.name)} variant="standard" type="text" style={standardFieldStyle} onChange={(event)=>{handleChangeLayoutData("name", event.target.value)}}/>
                    <TextField id="standard-basic" label={t('Category')} defaultValue={defaultValue(viewLayoutData.category)} variant="standard" type="text" style={standardFieldStyle} onChange={(event)=>{handleChangeLayoutData("category", event.target.value)}}/>
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
                </LayoutSection>
                <LayoutSection
                    header={t('Preparation infromation')}>
                    <TextField id="standard-basic" label={t('Preparation')} defaultValue={defaultValue(viewLayoutData.preparation)} multiline variant="standard" type="text" fullWidth onChange={(event)=>{handleChangeLayoutData("preparation", event.target.value)}}/>
                </LayoutSection>
            </LayoutGroup>
            <LayoutSection
                header={
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div>{t('Products')}</div>
                        <TextField
                            id="standard-basic"
                            label={t('Search')}
                            variant="standard"
                            type="text"
                            style={standardFieldStyle}
                            onChange={(event)=>{handleSearchProducts(event.target.value)}}
                            />
                    </div>
                }>
                {searchedProducts && searchedProductsTerm && searchedProductsTerm!=="" &&
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>{t('Image')}</TableCell>
                                <TableCell>{t('Name')}</TableCell>
                                <TableCell align="right">{t('Quantity')}</TableCell>
                                <TableCell align="right">{t('Add')}</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            { searchedProducts.map((row, index) => (
                                <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <div style={{backgroundImage: "url("+row.file.path+")", width: 168, height: 120, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", borderRadius: 20}}/>
                                    </TableCell>
                                    <TableCell component="th" scope="row">{row.name}</TableCell>
                                    <TableCell align="right">
                                        {defaultValue(row.quantity)} {row.unit.viewName}
                                    </TableCell>
                                    <TableCell align="right">
                                    <IconButton variant="contained" style={{backgroundColor: "#7C99DB", width: 36, height: 36, borderRadius: 8}}
                                        onClick={()=>{handleAddLayoutRecipeProductsData({id: undefined, productId: row.id, product: row, quantity: row.quantity, unitId: row.unitId})}}>
                                        <AddIcon style={{color: "white"}}/>
                                    </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }

                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>{t('Image')}</TableCell>
                            <TableCell>{t('Name')}</TableCell>
                            <TableCell align="right">{t('Quantity')}</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {viewLayoutRecipeProductsData && viewLayoutRecipeProductsData.map((row, index) => (
                            <TableRow
                            key={row.productId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <div style={{backgroundImage: "url("+row.product.file.path+")", width: 168, height: 120, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", borderRadius: 20}}/>
                                </TableCell>
                                <TableCell component="th" scope="row">{row.product.name}</TableCell>
                                <TableCell align="right">
                                    <InputBase
                                        id="standard-basic"
                                        defaultValue={defaultValue(row.quantity)}
                                        variant="standard"
                                        type="number"
                                        endAdornment={<InputAdornment position="end">{row.product.unit.viewName}</InputAdornment>}
                                        style={{width: 100}}
                                        onChange={(event)=>{handleChangeLayoutRecipeProductsData(index, {id: row.id, productId: row.productId, product: row.product, quantity: event.target.valueAsNumber, unitId: row.unitId})}}
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

export default RecipeLayout;