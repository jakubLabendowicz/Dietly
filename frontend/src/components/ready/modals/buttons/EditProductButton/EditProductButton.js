import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useModal } from "../../../../../hooks/useModal";
import EditProductModal from "../../edit/EditProductModal/EditProductModal";

function EditProductButton(props){
    const { t } = useTranslation();
    const [open, setOpen, handleOpen, handleClose] = useModal()
    return (
        <div>
            <Button variant="contained" style={{height: 36}} onClick={handleOpen}>{t('Edit')}</Button>
            <EditProductModal open={open} onClose={handleClose} data={props.data}/>
        </div>
    )
};

export default EditProductButton;