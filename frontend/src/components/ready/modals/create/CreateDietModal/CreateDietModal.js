import { useState } from "react";
import { useTranslation } from "react-i18next";
import { postDiet } from "../../../../../api/controllers/DietApi";
import { postFile } from "../../../../../api/controllers/FileApi";
import Modal from "../../../../utils/Modal/Modal";
import DietLayout from "../../../layouts/DietLayout/DietLayout";

function CreateDietModal(props){
    const { t } = useTranslation();

    let diet = {
        "name": null,
        "description": null,
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
    
    const onSave = () => {
        if(layoutData!==undefined){
            postDiet(layoutData)
            .then((response)=>{
                if(layoutFileData!==undefined) {
                    postFile({...layoutFileData,
                        diets: {
                            connect: {
                                id: response.data.id
                            }
                        }
                    });
                }
                props.onClose();
                window.location = '../../diet/' + response.data.id;
            });
        }
    }

    return (
        <Modal open={props.open} onClose={props.onClose} title={t('Add Diet')} onSave={onSave}>
            <DietLayout data={diet} onChangeLayoutData={handleChangeLayoutData} onChangeLayoutFileData={handleChangeLayoutFileData}/>
        </Modal>
    )
};

export default CreateDietModal;