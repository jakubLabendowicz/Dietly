import { useState } from "react";
import { useTranslation } from "react-i18next";
import { patchDietMeal } from "../../../../../api/controllers/DietMealApi";
import { deleteDietMealProduct, patchDietMealProduct, postDietMealProduct } from "../../../../../api/controllers/DietMealProductApi";
import { deleteDietMealRecipe, patchDietMealRecipe, postDietMealRecipe } from "../../../../../api/controllers/DietMealRecipeApi";
import Modal from "../../../../utils/Modal/Modal";
import DietMealLayout from "../../../layouts/DietMealLayout/DietMealLayout";

function EditDietMealModal(props){
    const { t } = useTranslation();

    const [layoutData, setLayoutData] = useState();
    const handleChangeLayoutData = (layoutData) => {
        setLayoutData(layoutData);
    }

    const [layoutDietMealProductsData, setLayoutDietMealProductsData] = useState();
    const handleChangeLayoutDietMealProductsData = (layoutDietMealProductsData) => {
        setLayoutDietMealProductsData(layoutDietMealProductsData);
    }

    const [layoutDietMealRecipesData, setLayoutDietMealRecipesData] = useState();
    const handleChangeLayoutDietMealRecipesData = (layoutDietMealRecipesData) => {
        setLayoutDietMealRecipesData(layoutDietMealRecipesData);
    }
    
    const onSave = () => {
        let data = {};
        if(layoutData && layoutData.name) data.name = layoutData.name;
        if(layoutData && layoutData.day) data.day = layoutData.day;
        if(layoutData && layoutData.time) {
            let time = new Date(layoutData.time)
            data.hour = time.getHours();
            data.minute = time.getMinutes();
        }
        if(layoutData!==undefined) patchDietMeal(props.data.id, data);
        if(layoutDietMealProductsData) {
            for (const layoutDietMealProductData of layoutDietMealProductsData) {
                if(layoutDietMealProductData) {
                    if(layoutDietMealProductData.id) {
                        if(layoutDietMealProductData.quantity===0) {
                            deleteDietMealProduct(layoutDietMealProductData.id);
                        } else {
                            patchDietMealProduct(layoutDietMealProductData.id, {
                                quantity: layoutDietMealProductData.quantity
                            });
                        }
                    } else {
                        postDietMealProduct({
                            dietMealId: props.data.id,
                            productId: layoutDietMealProductData.productId,
                            quantity: layoutDietMealProductData.quantity,
                            unitId:  layoutDietMealProductData.unitId
                        });
                    }
                }
            }
        }
        if(layoutDietMealRecipesData) {
            for (const layoutDietMealRecipeData of layoutDietMealRecipesData) {
                if(layoutDietMealRecipeData) {
                    if(layoutDietMealRecipeData.id) {
                        if(layoutDietMealRecipeData.quantity===0) {
                            deleteDietMealRecipe(layoutDietMealRecipeData.id);
                        } else {
                            patchDietMealRecipe(layoutDietMealRecipeData.id, {
                                quantity: layoutDietMealRecipeData.quantity
                            });
                        }
                    } else {
                        postDietMealRecipe({
                            dietMealId: props.data.id,
                            recipeId: layoutDietMealRecipeData.recipeId,
                            quantity: layoutDietMealRecipeData.quantity,
                            unitId:  layoutDietMealRecipeData.unitId
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
            <DietMealLayout
                data={{...props.data, time: props.data.hour+':'+props.data.minute}}
                onChangeLayoutData={handleChangeLayoutData}
                onChangeLayoutDietMealProductsData={handleChangeLayoutDietMealProductsData}
                onChangeLayoutDietMealRecipesData={handleChangeLayoutDietMealRecipesData}/>
        </Modal>
    )
};

export default EditDietMealModal;