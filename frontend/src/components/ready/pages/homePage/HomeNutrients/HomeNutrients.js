import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getMe } from "../../../../../api/controllers/MeApi";
import { getUserMealsNutrients } from "../../../../../api/controllers/UserMealApi";
import { useTranslation } from "react-i18next";

function HomeNutrients(props) {
    const { t } = useTranslation();
    let [date, setDate] = useState(dayjs(new Date()));
    let [rows, setRows] = useState([])

    function createRow(nutrientViewName, quantity, unitViewName) {
        return { nutrientViewName, quantity, unitViewName };
    }

    useEffect(()=>{
        getMe()
        .then(response => {
            getUserMealsNutrients({where: '"userId":'+response.data.id+',"year":'+date.year()+',"month":'+(date.month()+1)+',"day":'+date.date()})
            .then(response => {
                let effectRows = [];
                for (const homeNutrient of response.data) {
                    effectRows.push(createRow(t(homeNutrient.nutrient.viewName), homeNutrient.quantity, homeNutrient.nutrient.unit.viewName));
                }
                setRows(effectRows);
            })
        })
    }, [])

    return (
        <TableContainer>
            <Table sx={{ minWidth: 450 }}>
                <TableHead>
                <TableRow>
                    <TableCell>{t('Nutrients')}</TableCell>
                    <TableCell align="right">{t('Today')}</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow
                    key={row.nutrientViewName}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.nutrientViewName}
                    </TableCell>
                    <TableCell align="right">{row.quantity} {row.unitViewName}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
  
export default HomeNutrients;