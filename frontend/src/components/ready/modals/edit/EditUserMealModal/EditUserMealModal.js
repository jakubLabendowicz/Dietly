import { useState } from "react";
import { useTranslation } from "react-i18next";
import { patchUserMeal } from "../../../../../api/controllers/UserMealApi";
import { deleteUserMealProduct, patchUserMealProduct, postUserMealProduct } from "../../../../../api/controllers/UserMealProductApi";
import { deleteUserMealRecipe, patchUserMealRecipe, postUserMealRecipe } from "../../../../../api/controllers/UserMealRecipeApi";
import Modal from "../../../../utils/Modal/Modal";
import UserMealLayout from "../../../layouts/UserMealLayout/UserMealLayout";

function EditUserMealModal(props){
    const { t } = useTranslation();

    const [layoutData, setLayoutData] = useState();
    const handleChangeLayoutData = (layoutData) => {
        setLayoutData(layoutData);
    }

    const [layoutUserMealProductsData, setLayoutUserMealProductsData] = useState();
    const handleChangeLayoutUserMealProductsData = (layoutUserMealProductsData) => {
        setLayoutUserMealProductsData(layoutUserMealProductsData);
    }

    const [layoutUserMealRecipesData, setLayoutUserMealRecipesData] = useState();
    const handleChangeLayoutUserMealRecipesData = (layoutUserMealRecipesData) => {
        setLayoutUserMealRecipesData(layoutUserMealRecipesData);
    }
    
    const onSave = () => {
        let data = {};
        if(layoutData && layoutData.name) data.name = layoutData.name;
        if(layoutData && layoutData.date) {
            let date = new Date(layoutData.date);
            data.year = date.getFullYear();
            data.month = date.getMonth()+1;
            data.day = date.getDate();
        }
        if(layoutData && layoutData.time) {
            let time = new Date(layoutData.time)
            data.hour = time.getHours();
            data.minute = time.getMinutes();
        }
        if(layoutData!==undefined) patchUserMeal(props.data.id, data);
        if(layoutUserMealProductsData) {
            for (const layoutUserMealProductData of layoutUserMealProductsData) {
                if(layoutUserMealProductData) {
                    if(layoutUserMealProductData.id) {
                        if(layoutUserMealProductData.quantity===0) {
                            deleteUserMealProduct(layoutUserMealProductData.id);
                        } else {
                            patchUserMealProduct(layoutUserMealProductData.id, {
                                quantity: layoutUserMealProductData.quantity
                            });
                        }
                    } else {
                        postUserMealProduct({
                            userMealId: props.data.id,
                            productId: layoutUserMealProductData.productId,
                            quantity: layoutUserMealProductData.quantity,
                            unitId:  layoutUserMealProductData.unitId
                        });
                    }
                }
            }
        }
        if(layoutUserMealRecipesData) {
            for (const layoutUserMealRecipeData of layoutUserMealRecipesData) {
                if(layoutUserMealRecipeData) {
                    if(layoutUserMealRecipeData.id) {
                        if(layoutUserMealRecipeData.quantity===0) {
                            deleteUserMealRecipe(layoutUserMealRecipeData.id);
                        } else {
                            patchUserMealRecipe(layoutUserMealRecipeData.id, {
                                quantity: layoutUserMealRecipeData.quantity
                            });
                        }
                    } else {
                        postUserMealRecipe({
                            userMealId: props.data.id,
                            recipeId: layoutUserMealRecipeData.recipeId,
                            quantity: layoutUserMealRecipeData.quantity,
                            unitId:  layoutUserMealRecipeData.unitId
                        });
                    }
                }
            }
        }
        props.onClose();
        window.location.reload();
    }

    return (
        <Modal open={props.open} onClose={props.onClose} title={t('Edit Meal')} onSave={onSave}>
            <UserMealLayout
                data={{...props.data, date: props.data.year+'-'+props.data.month+'-'+props.data.day,  time: props.data.hour+':'+props.data.minute+':00'}}
                onChangeLayoutData={handleChangeLayoutData}
                onChangeLayoutUserMealProductsData={handleChangeLayoutUserMealProductsData}
                onChangeLayoutUserMealRecipesData={handleChangeLayoutUserMealRecipesData}/>
        </Modal>
    )
};

export default EditUserMealModal;