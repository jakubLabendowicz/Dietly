import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useModal } from "../../../../../hooks/useModal";
import CreateDietMealModal from "../../create/CreateDietMealModal/CreateDietMealModal";

function CreateDietMealButton(props){
    const { t } = useTranslation();
    const [open, setOpen, handleOpen, handleClose] = useModal()
    return (
        <div>
            <Button variant="contained" style={{height: 36}} onClick={handleOpen}>{t('Add Meal')}</Button>
            <CreateDietMealModal open={open} onClose={handleClose} dietId={props.dietId}/>
        </div>
    )
};

export default CreateDietMealButton;