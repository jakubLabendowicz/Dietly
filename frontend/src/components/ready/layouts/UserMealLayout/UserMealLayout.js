import { Checkbox, IconButton, InputAdornment, InputBase, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { searchProducts } from "../../../../api/controllers/ProductApi";
import { searchRecipes } from "../../../../api/controllers/RecipeApi";
import Layout from "../../../utils/Layout/Layout";
import LayoutGroup from "../../../utils/LayoutGroup/LayoutGroup";
import LayoutSection from "../../../utils/LayoutSection/LayoutSection";
import AddIcon from '@mui/icons-material/Add';

function UserMealLayout(props) {
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

    //Products
    const [viewLayoutUserMealProductsData, setViewLayoutUserMealProductsData] = useState(props.data.userMealProducts?props.data.userMealProducts:[]);
    const [saveLayoutUserMealProductsData, setSaveLayoutUserMealProductsData] = useState([]);
    const handleChangeLayoutUserMealProductsData = (key, value) => {
        let tempViewLayoutUserMealProductsData = viewLayoutUserMealProductsData;
        tempViewLayoutUserMealProductsData[key] = value;
        setViewLayoutUserMealProductsData(tempViewLayoutUserMealProductsData);

        let tempSaveLayoutUserMealProductsData = saveLayoutUserMealProductsData;
        tempSaveLayoutUserMealProductsData[key] = value;
        setSaveLayoutUserMealProductsData(tempSaveLayoutUserMealProductsData);
        props.onChangeLayoutUserMealProductsData(saveLayoutUserMealProductsData);
    }
    const handleAddLayoutUserMealProductsData = (value) => {
        let tempViewLayoutUserMealProductsData = viewLayoutUserMealProductsData;
        tempViewLayoutUserMealProductsData.push(value);
        setViewLayoutUserMealProductsData(tempViewLayoutUserMealProductsData);

        let tempSaveLayoutUserMealProductsData = saveLayoutUserMealProductsData;
        tempSaveLayoutUserMealProductsData.push(value);
        setSaveLayoutUserMealProductsData(tempSaveLayoutUserMealProductsData);
        props.onChangeLayoutUserMealProductsData(saveLayoutUserMealProductsData);
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

    //Recipes
    const [viewLayoutUserMealRecipesData, setViewLayoutUserMealRecipesData] = useState(props.data.userMealRecipes?props.data.userMealRecipes:[]);
    const [saveLayoutUserMealRecipesData, setSaveLayoutUserMealRecipesData] = useState([]);
    const handleChangeLayoutUserMealRecipesData = (key, value) => {
        let tempViewLayoutUserMealRecipesData = viewLayoutUserMealRecipesData;
        tempViewLayoutUserMealRecipesData[key] = value;
        setViewLayoutUserMealRecipesData(tempViewLayoutUserMealRecipesData);

        let tempSaveLayoutUserMealRecipesData = saveLayoutUserMealRecipesData;
        tempSaveLayoutUserMealRecipesData[key] = value;
        setSaveLayoutUserMealRecipesData(tempSaveLayoutUserMealRecipesData);
        props.onChangeLayoutUserMealRecipesData(saveLayoutUserMealRecipesData);
    }
    const handleAddLayoutUserMealRecipesData = (value) => {
        let tempViewLayoutUserMealRecipesData = viewLayoutUserMealRecipesData;
        tempViewLayoutUserMealRecipesData.push(value);
        setViewLayoutUserMealRecipesData(tempViewLayoutUserMealRecipesData);

        let tempSaveLayoutUserMealRecipesData = saveLayoutUserMealRecipesData;
        tempSaveLayoutUserMealRecipesData.push(value);
        setSaveLayoutUserMealRecipesData(tempSaveLayoutUserMealRecipesData);
        props.onChangeLayoutUserMealRecipesData(saveLayoutUserMealRecipesData);
    }

    let [searchedRecipes, setSearchedRecipes] = useState();
    let [searchedRecipesTerm, setSearchedRecipesTerm] = useState();
    let handleSearchRecipes = (term) => {
        setSearchedRecipesTerm(term);
        searchRecipes(term)
        .then(response => {
            setSearchedRecipes(response.data);
        });
    }

    return (
        <Layout>
            <LayoutGroup>
                <LayoutSection
                    header={t('Details')}>
                    <TextField id="standard-basic" label={t('Name')} defaultValue={defaultValue(viewLayoutData.name)} variant="standard" type="text" fullWidth onChange={(event)=>{handleChangeLayoutData("name", event.target.value)}}/>
                    <TextField id="standard-basic" label={t('Date')} defaultValue={defaultValue(viewLayoutData.date)} variant="standard" type="date" style={standardFieldStyle} onChange={(event)=>{handleChangeLayoutData("date", event.target.valueAsDate)}}/>
                    <TextField id="standard-basic" label={t('Time')} defaultValue={defaultValue(viewLayoutData.time)} variant="standard" type="time" style={standardFieldStyle} onChange={(event)=>{handleChangeLayoutData("time", event.target.valueAsDate)}}/>
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
                                        onClick={()=>{handleAddLayoutUserMealProductsData({id: undefined, productId: row.id, product: row, quantity: row.quantity, unitId: row.unitId})}}>
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
                        {viewLayoutUserMealProductsData && viewLayoutUserMealProductsData.map((row, index) => (
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
                                        onChange={(event)=>{handleChangeLayoutUserMealProductsData(index, {id: row.id, productId: row.productId, product: row.product, quantity: event.target.valueAsNumber, unitId: row.unitId})}}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </LayoutSection>
            <LayoutSection
                header={
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div>{t('Recipes')}</div>
                        <TextField
                            id="standard-basic"
                            label={t('Search')}
                            variant="standard"
                            type="text"
                            style={standardFieldStyle}
                            onChange={(event)=>{handleSearchRecipes(event.target.value)}}
                            />
                    </div>
                }>
                {searchedRecipes && searchedRecipesTerm && searchedRecipesTerm!=="" &&
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
                            {searchedRecipes.map((row, index) => (
                                <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.file && 
                                            <div style={{backgroundImage: "url("+row.file.path+")", width: 168, height: 120, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", borderRadius: 20}}/>
                                        }
                                    </TableCell>
                                    <TableCell component="th" scope="row">{row.name}</TableCell>
                                    <TableCell align="right">
                                        {defaultValue(row.quantity)} {row.unit.viewName}
                                    </TableCell>
                                    <TableCell align="right">
                                    <IconButton variant="contained" style={{backgroundColor: "#7C99DB", width: 36, height: 36, borderRadius: 8}}
                                        onClick={()=>{handleAddLayoutUserMealRecipesData({id: undefined, recipeId: row.id, recipe: row, quantity: row.quantity, unitId: row.unitId})}}>
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
                        {viewLayoutUserMealRecipesData && viewLayoutUserMealRecipesData.map((row, index) => (
                            <TableRow
                            key={row.recipeId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <div style={{backgroundImage: "url("+row.recipe.file.path+")", width: 168, height: 120, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", borderRadius: 20}}/>
                                </TableCell>
                                <TableCell component="th" scope="row">{row.recipe.name}</TableCell>
                                <TableCell align="right">
                                    <InputBase
                                        id="standard-basic"
                                        defaultValue={defaultValue(row.quantity)}
                                        variant="standard"
                                        type="number"
                                        endAdornment={<InputAdornment position="end">{row.recipe.unit.viewName}</InputAdornment>}
                                        style={{width: 100}}
                                        onChange={(event)=>{handleChangeLayoutUserMealRecipesData(index, {id: row.id, recipeId: row.recipeId, recipe: row.recipe, quantity: event.target.valueAsNumber, unitId: row.unitId})}}
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

export default UserMealLayout;