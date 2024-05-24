import { MenuItem, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

function UnitField(props) {
    const { t } = useTranslation();
    const defaultValue = (value)=>{
        if(value!==undefined) return value;
        else return null;
    }

    const units = [
        {
            value: 1,
            label: 'g',
        },
        {
            value: 2,
            label: 'ml',
        }
      ];

    return (
        <TextField id="standard-basic" label={t('Unit')} defaultValue={defaultValue(props.defaultValue)} select variant="standard" type="number" style={props.style} onChange={(event)=>{props.onChange(event.target.value)}}>
            {units.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
}

export default UnitField;