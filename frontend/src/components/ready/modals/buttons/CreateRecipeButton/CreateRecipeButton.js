import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useModal } from "../../../../../hooks/useModal";
import CreateRecipeModal from "../../create/CreateRecipeModal/CreateRecipeModal";

function CreateRecipeButton(props){
    const { t } = useTranslation();
    const [open, setOpen, handleOpen, handleClose] = useModal()
    return (
        <div>
            <Button variant="contained" style={{height: 36}} onClick={handleOpen}>{t('Add Recipe')}</Button>
            <CreateRecipeModal open={open} onClose={handleClose}/>
        </div>
    )
};

export default CreateRecipeButton;