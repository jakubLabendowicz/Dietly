import { useState } from "react";
import { useTranslation } from "react-i18next";
import { patchUserActiveDiet, postUserActiveDiet } from "../../../../../api/controllers/UserActiveDietApi";
import Modal from "../../../../utils/Modal/Modal";
import UserActiveDietLayout from "../../../layouts/UserActiveDietLayout/UserActiveDietLayout";

function EditUserActiveDietModal(props){
    const { t } = useTranslation();

    const [layoutData, setLayoutData] = useState();
    const handleChangeLayoutData = (layoutData) => {
        setLayoutData(layoutData);
    }
    
    const onSave = () => {
        if(props.created) {
            if(layoutData!==undefined) patchUserActiveDiet(props.data.id, layoutData);
        } else {
            if(layoutData!==undefined) postUserActiveDiet({...layoutData, userId: props.userId, dietId:props.dietId});
        }
        props.onClose();
    }

    let userActiveDiet = {
        "startTime": null,
        "endTime": null,
        "active": true
    }

    return (
        <Modal open={props.open} onClose={props.onClose} title={t(props.active?'Disactive':'Active')} onSave={onSave}>
            <UserActiveDietLayout data={props.created?props.data:userActiveDiet} onChangeLayoutData={handleChangeLayoutData}/>
        </Modal>
    )
};

export default EditUserActiveDietModal;