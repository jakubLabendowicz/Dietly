import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useModal } from "../../../../../hooks/useModal";
import CreateUserMealModal from "../../create/CreateUserMealModal/CreateUserMealModal";

function CreateUserMealButton(props){
    const { t } = useTranslation();
    const [open, setOpen, handleOpen, handleClose] = useModal()
    return (
        <div>
            <Button variant="contained" style={{height: 36}} onClick={handleOpen}>{t('Add Meal')}</Button>
            <CreateUserMealModal open={open} onClose={handleClose}/>
        </div>
    )
};

export default CreateUserMealButton;