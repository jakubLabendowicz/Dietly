import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getUserActiveDiets } from "../../../../../api/controllers/UserActiveDietApi";
import { useModal } from "../../../../../hooks/useModal";
import EditDietModal from "../../edit/EditDietModal/EditDietModal";
import EditUserActiveDietModal from "../../edit/EditUserActiveDietModal/EditUserActiveDietModal";

function EditUserActiveDietButton(props){
    const { t } = useTranslation();
    const [created, setCreated] = useState(false);
    const [active, setActive] = useState(false);
    const [userActiveDiet, setUserActiveDiet] = useState();
    const [open, setOpen, handleOpen, handleClose] = useModal();

    useEffect(()=>{
        getUserActiveDiets({where: '"userId":'+props.userId+',"dietId":'+props.dietId})
        .then(response => {
            console.log(response.data);
            if(response.data.length > 0) {
                setCreated(true);
                setUserActiveDiet(response.data[0]);
                setActive(response.data[0].active);
            } else {
                setCreated(false);
            }
        });
      }, [props.userId]);

    return (
        <div>
            <Button variant="contained" style={{height: 36}} onClick={handleOpen}>{t(active?'Disactive':'Active')}</Button>
            <EditUserActiveDietModal open={open} onClose={handleClose} data={userActiveDiet} userId={props.userId} dietId={props.dietId} created={created} active={active}/>
        </div>
    )
};

export default EditUserActiveDietButton;