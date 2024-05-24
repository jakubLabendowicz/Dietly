import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useModal } from "../../../../../hooks/useModal";
import EditDietMealModal from "../../edit/EditDietMealModal/EditDietMealModal";

function EditDietMealButton(props){
    const { t } = useTranslation();
    const [open, setOpen, handleOpen, handleClose] = useModal()
    return (
        <div>
            <Button variant="contained" style={{height: 36}} onClick={handleOpen}>{t('Edit')}</Button>
            <EditDietMealModal open={open} onClose={handleClose} data={props.data}/>
        </div>
    )
};

export default EditDietMealButton;