import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useModal } from "../../../../../hooks/useModal";
import CreateDietModal from "../../create/CreateDietModal/CreateDietModal";

function CreateDietButton(props){
    const { t } = useTranslation();
    const [open, setOpen, handleOpen, handleClose] = useModal()
    return (
        <div>
            <Button variant="contained" style={{height: 36}} onClick={handleOpen}>{t('Add Diet')}</Button>
            <CreateDietModal open={open} onClose={handleClose}/>
        </div>
    )
};

export default CreateDietButton;