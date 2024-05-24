import { useState } from "react";
import { useTranslation } from "react-i18next";
import { postDietMeal } from "../../../../../api/controllers/DietMealApi";
import { postDietMealProduct } from "../../../../../api/controllers/DietMealProductApi";
import { postDietMealRecipe } from "../../../../../api/controllers/DietMealRecipeApi";
import Modal from "../../../../utils/Modal/Modal";
import DietMealLayout from "../../../layouts/DietMealLayout/DietMealLayout";

function CreateDietMealModal(props){
    const { t } = useTranslation();

    let dietMeal = {
        "name": null,
        "date": null,
        "time": null
    }

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
        if(layoutData!==undefined){
            let time=new Date(layoutData.time);
            postDietMeal({
                name: layoutData.name,
                day: layoutData.day,
                hour: time.getHours(),
                minute: time.getMinutes(),
                dietId: props.dietId
            })
            .then((response)=>{
                if(layoutDietMealProductsData) {
                    for (const layoutDietMealProductData of layoutDietMealProductsData) {
                        if(layoutDietMealProductData) {
                            postDietMealProduct({
                                dietMealId: response.data.id,
                                productId: layoutDietMealProductData.productId,
                                quantity: layoutDietMealProductData.quantity,
                                unitId:  layoutDietMealProductData.unitId
                            });
                        }
                    }
                }

                if(layoutDietMealRecipesData) {
                    for (const layoutDietMealRecipeData of layoutDietMealRecipesData) {
                        if(layoutDietMealRecipeData) {
                            postDietMealRecipe({
                                dietMealId: response.data.id,
                                recipeId: layoutDietMealRecipeData.recipeId,
                                quantity: layoutDietMealRecipeData.quantity,
                                unitId:  layoutDietMealRecipeData.unitId
                            });
                        }
                    }
                }
                props.onClose();
                window.location.reload();
            });
        }
    }

    return (
        <Modal open={props.open} onClose={props.onClose} title={t('Add Meal')} onSave={onSave}>
            <DietMealLayout
                data={dietMeal}
                onChangeLayoutData={handleChangeLayoutData}
                onChangeLayoutDietMealProductsData={handleChangeLayoutDietMealProductsData}
                onChangeLayoutDietMealRecipesData={handleChangeLayoutDietMealRecipesData}/>
        </Modal>
    )
};

export default CreateDietMealModal;