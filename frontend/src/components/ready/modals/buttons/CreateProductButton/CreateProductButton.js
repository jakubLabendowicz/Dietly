import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useModal } from "../../../../../hooks/useModal";
import CreateProductModal from "../../create/CreateProductModal/CreateProductModal";

function CreateProductButton(props){
    const { t } = useTranslation();
    const [open, setOpen, handleOpen, handleClose] = useModal()
    return (
        <div>
            <Button variant="contained" style={{height: 36}} onClick={handleOpen}>{t('Add Product')}</Button>
            <CreateProductModal open={open} onClose={handleClose}/>
        </div>
    )
};

export default CreateProductButton;