import { useState } from "react";
import { useTranslation } from "react-i18next";
import { postFile } from "../../../../../api/controllers/FileApi";
import { postProduct } from "../../../../../api/controllers/ProductApi";
import { patchProductNutrient, postProductNutrient } from "../../../../../api/controllers/ProductNutrientApi";
import Modal from "../../../../utils/Modal/Modal";
import ProductLayout from "../../../layouts/ProductLayout/ProductLayout";

function CreateProductModal(props){
    const { t } = useTranslation();

    let product = {
        "name": null,
        "category": null,
        "producer": null,
        "code": null,
        "nutriScore": null,
        "vegan": false,
        "vegetarian": false,
        "description": null,
        "unitId": null,
        "quantity": null,
        "productNutrients": [],
        "file": {
            "path": null
        }
    }

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
        if(layoutData!==undefined){
            postProduct(layoutData)
            .then((response)=>{
                if(layoutFileData!==undefined) {
                    postFile({...layoutFileData,
                        products: {
                            connect: {
                                id: response.data.id
                            }
                        }
                    });
                }

                if(layoutNutrientsData) {
                    for (const layoutNutrientData of layoutNutrientsData) {
                        if(layoutNutrientData) {
                            postProductNutrient({
                                productId: response.data.id,
                                nutrientId: layoutNutrientData.nutrientId,
                                quantity: layoutNutrientData.quantity
                            });
                        }
                    }
                }

                props.onClose();
                window.location = '../../product/' + response.data.id;
            });
        }
    }

    return (
        <Modal open={props.open} onClose={props.onClose} title={t('Add Product')} onSave={onSave}>
            <ProductLayout data={product} onChangeLayoutData={handleChangeLayoutData} onChangeLayoutFileData={handleChangeLayoutFileData} onChangeLayoutNutrientsData={handleChangeLayoutNutrientsData}/>
        </Modal>
    )
};

export default CreateProductModal;