import { useState } from "react";
import { useTranslation } from "react-i18next";
import { patchFile, postFile } from "../../../../../api/controllers/FileApi";
import { patchNutrient, postNutrient } from "../../../../../api/controllers/NutrientApi";
import { patchProduct } from "../../../../../api/controllers/ProductApi";
import { patchProductNutrient, postProductNutrient } from "../../../../../api/controllers/ProductNutrientApi";
import Modal from "../../../../utils/Modal/Modal";
import ProductLayout from "../../../layouts/ProductLayout/ProductLayout";

function EditProductModal(props){
    const { t } = useTranslation();

    const [layoutData, setLayoutData] = useState();
    const handleChangeLayoutData = (layoutData) => {
        setLayoutData(layoutData);
    }
    const [layoutFileData, setLayoutFileData] = useState();
    const handleChangeLayoutFileData = (layoutFileData) => {
        setLayoutFileData(layoutFileData);
    }
    const [layoutNutrientsData, setLayoutNutrientsData] = useState();
    const handleChangeLayoutNutrientsData = (layoutNutrientsData) => {
        setLayoutNutrientsData(layoutNutrientsData);
    }
    
    const onSave = () => {
        if(layoutFileData) {
            if(props.data.file) {
                patchFile(props.data.file.id, layoutFileData);
            }
            else {
                let tempLayoutFileData = {...layoutFileData,
                    products: {
                        connect: {
                            id: props.data.id
                        }
                    }
                };
                postFile(tempLayoutFileData);
            }
        }
        if(layoutData) patchProduct(props.data.id, layoutData);
        if(layoutNutrientsData) {
            for (const layoutNutrientData of layoutNutrientsData) {
                if(layoutNutrientData) {
                    if(layoutNutrientData.id) {
                        patchProductNutrient(layoutNutrientData.id, {
                            quantity: layoutNutrientData.quantity
                        });
                    } else {
                        postProductNutrient({
                            productId: props.data.id,
                            nutrientId: layoutNutrientData.nutrientId,
                            quantity: layoutNutrientData.quantity
                        });
                    }
                }
            }
        }
        props.onClose();
        window.location = '../../product/' + props.data.id;
    }

    return (
        <Modal open={props.open} onClose={props.onClose} title={t('Edit Product')} onSave={onSave}>
            <ProductLayout data={props.data} onChangeLayoutData={handleChangeLayoutData} onChangeLayoutFileData={handleChangeLayoutFileData} onChangeLayoutNutrientsData={handleChangeLayoutNutrientsData}/>
        </Modal>
    )
};

export default EditProductModal;