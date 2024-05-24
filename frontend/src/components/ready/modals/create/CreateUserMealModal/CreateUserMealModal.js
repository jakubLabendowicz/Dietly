import { useState } from "react";
import { useTranslation } from "react-i18next";
import { postUserMeal } from "../../../../../api/controllers/UserMealApi";
import { postUserMealProduct } from "../../../../../api/controllers/UserMealProductApi";
import { postUserMealRecipe } from "../../../../../api/controllers/UserMealRecipeApi";
import Modal from "../../../../utils/Modal/Modal";
import UserMealLayout from "../../../layouts/UserMealLayout/UserMealLayout";

function CreateUserMealModal(props){
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

    const [layoutUserMealProductsData, setLayoutUserMealProductsData] = useState();
    const handleChangeLayoutUserMealProductsData = (layoutUserMealProductsData) => {
        setLayoutUserMealProductsData(layoutUserMealProductsData);
    }

    const [layoutUserMealRecipesData, setLayoutUserMealRecipesData] = useState();
    const handleChangeLayoutUserMealRecipesData = (layoutUserMealRecipesData) => {
        setLayoutUserMealRecipesData(layoutUserMealRecipesData);
    }
    
    const onSave = () => {
        if(layoutData!==undefined){
            let date=new Date(layoutData.date);
            let time=new Date(layoutData.time);
            postUserMeal({
                name: layoutData.name,
                year: date.getFullYear(),
                month: date.getMonth()+1,
                day: date.getDate(),
                hour: time.getHours(),
                minute: time.getMinutes()
            })
            .then((response)=>{
                if(layoutUserMealProductsData) {
                    for (const layoutUserMealProductData of layoutUserMealProductsData) {
                        if(layoutUserMealProductData) {
                            postUserMealProduct({
                                userMealId: response.data.id,
                                productId: layoutUserMealProductData.productId,
                                quantity: layoutUserMealProductData.quantity,
                                unitId:  layoutUserMealProductData.unitId
                            });
                        }
                    }
                }

                if(layoutUserMealRecipesData) {
                    for (const layoutUserMealRecipeData of layoutUserMealRecipesData) {
                        if(layoutUserMealRecipeData) {
                            postUserMealRecipe({
                                userMealId: response.data.id,
                                recipeId: layoutUserMealRecipeData.recipeId,
                                quantity: layoutUserMealRecipeData.quantity,
                                unitId:  layoutUserMealRecipeData.unitId
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
            <UserMealLayout
                data={dietMeal}
                onChangeLayoutData={handleChangeLayoutData}
                onChangeLayoutUserMealProductsData={handleChangeLayoutUserMealProductsData}
                onChangeLayoutUserMealRecipesData={handleChangeLayoutUserMealRecipesData}/>
        </Modal>
    )
};

export default CreateUserMealModal;