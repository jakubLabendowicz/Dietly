import { useState } from "react";
import { useTranslation } from "react-i18next";
import { patchFile, postFile } from "../../../../../api/controllers/FileApi";
import { patchRecipe } from "../../../../../api/controllers/RecipeApi";
import { deleteRecipeProduct, patchRecipeProduct, postRecipeProduct } from "../../../../../api/controllers/RecipeProductApi";
import Modal from "../../../../utils/Modal/Modal";
import RecipeLayout from "../../../layouts/RecipeLayout/RecipeLayout";

function EditRecipeModal(props){
    const { t } = useTranslation();

    const [layoutData, setLayoutData] = useState();
    const handleChangeLayoutData = (layoutData) => {
        setLayoutData(layoutData);
    }
    const [layoutFileData, setLayoutFileData] = useState();
    const handleChangeLayoutFileData = (layoutFileData) => {
        setLayoutFileData(layoutFileData);
    }

    const [layoutRecipeProductsData, setLayoutRecipeProductsData] = useState();
    const handleChangeLayoutRecipeProductsData = (layoutRecipeProductsData) => {
        setLayoutRecipeProductsData(layoutRecipeProductsData);
    }
    
    const onSave = () => {
        if(layoutFileData) {
            if(props.data.file) {
                patchFile(props.data.file.id, layoutFileData);
            }
            else {
                let tempLayoutFileData = {...layoutFileData,
                    recipes: {
                        connect: {
                            id: props.data.id
                        }
                    }
                };
                postFile(tempLayoutFileData);
            }
        }
        if(layoutData!==undefined) patchRecipe(props.data.id, layoutData);
        if(layoutRecipeProductsData) {
            for (const layoutRecipeProductData of layoutRecipeProductsData) {
                if(layoutRecipeProductData) {
                    if(layoutRecipeProductData.id) {
                        if(layoutRecipeProductData.quantity===0) {
                            deleteRecipeProduct(layoutRecipeProductData.id);
                        } else {
                            patchRecipeProduct(layoutRecipeProductData.id, {
                                quantity: layoutRecipeProductData.quantity
                            });
                        }
                    } else {
                        postRecipeProduct({
                            recipeId: props.data.id,
                            productId: layoutRecipeProductData.productId,
                            quantity: layoutRecipeProductData.quantity,
                            unitId:  layoutRecipeProductData.unitId
                        });
                    }
                }
            }
        }
        props.onClose();
        window.location.reload();
    }

    return (
        <Modal open={props.open} onClose={props.onClose} title={t('Edit Recipe')} onSave={onSave}>
            <RecipeLayout
                data={props.data}
                onChangeLayoutData={handleChangeLayoutData}
                onChangeLayoutFileData={handleChangeLayoutFileData}
                onChangeLayoutRecipeProductsData={handleChangeLayoutRecipeProductsData}/>
        </Modal>
    )
};

export default EditRecipeModal;