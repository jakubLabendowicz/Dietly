import { useState } from "react";
import { useTranslation } from "react-i18next";
import { patchDiet } from "../../../../../api/controllers/DietApi";
import { patchFile, postFile } from "../../../../../api/controllers/FileApi";
import Modal from "../../../../utils/Modal/Modal";
import DietLayout from "../../../layouts/DietLayout/DietLayout";

function EditDietModal(props){
    const { t } = useTranslation();

    const [layoutData, setLayoutData] = useState();
    const handleChangeLayoutData = (layoutData) => {
        setLayoutData(layoutData);
    }
    const [layoutFileData, setLayoutFileData] = useState();
    const handleChangeLayoutFileData = (layoutFileData) => {
        setLayoutFileData(layoutFileData);
    }
    
    const onSave = () => {
        if(layoutFileData) {
            if(props.data.file) {
                patchFile(props.data.file.id, layoutFileData);
            }
            else {
                let tempLayoutFileData = {...layoutFileData,
                    diets: {
                        connect: {
                            id: props.data.id
                        }
                    }
                };
                postFile(tempLayoutFileData);
            }
        }
        if(layoutData!==undefined) patchDiet(props.data.id, layoutData);
        props.onClose();
        window.location = '../../diet/' + props.data.id;
    }

    return (
        <Modal open={props.open} onClose={props.onClose} title={t('Edit Diet')} onSave={onSave}>
            <DietLayout data={props.data} onChangeLayoutData={handleChangeLayoutData} onChangeLayoutFileData={handleChangeLayoutFileData}/>
        </Modal>
    )
};

export default EditDietModal;