import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useModal } from "../../../../../hooks/useModal";
import EditDietModal from "../../edit/EditDietModal/EditDietModal";

function EditDietButton(props){
    const { t } = useTranslation();
    const [open, setOpen, handleOpen, handleClose] = useModal()
    return (
        <div>
            <Button variant="contained" style={{height: 36}} onClick={handleOpen}>{t('Edit')}</Button>
            <EditDietModal open={open} onClose={handleClose} data={props.data}/>
        </div>
    )
};

export default EditDietButton;