import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getMe, getUserTargetNutrients } from "../../../../../api/controllers/MeApi";
import { getUserMealsNutrients } from "../../../../../api/controllers/UserMealApi";

function MealsNutrients(props) {
    const { t } = useTranslation();
    let [rows, setRows] = useState([])

    function createRow(nutrientViewName, quantity, unitViewName, targetQuantity) {
        return { nutrientViewName, quantity, unitViewName, targetQuantity };
    }


    useEffect(() => {
        var userTargetNurtients = {};
        getUserTargetNutrients()
            .then(response => {
                for (const userTargetNurtient of response.data) {
                    userTargetNurtients[userTargetNurtient.code] = userTargetNurtient;
                }
                console.log(userTargetNurtients);
                getMe()
                    .then(response => {
                        getUserMealsNutrients({ where: '"userId":' + response.data.id + ',"year":' + props.date.year() + ',"month":' + (props.date.month() + 1) + ',"day":' + props.date.date() })
                            .then(response => {
                                let effectRows = [];
                                for (const homeNutrient of response.data) {
                                    effectRows.push(createRow(t(homeNutrient.nutrient.viewName), homeNutrient.quantity, homeNutrient.nutrient.unit.viewName, Math.round(userTargetNurtients[homeNutrient.nutrient.code].target * 100) / 100));
                                }
                                setRows(effectRows);
                            })
                    })
            });
    }, [props.date])

    return (
        <TableContainer>
            <Table sx={{ minWidth: 450 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>{t('Nutrients')}</TableCell>
                        <TableCell align="right">{props.date.toString()}</TableCell>
                        <TableCell align="right">{t('Target')}</TableCell>

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
                            <TableCell align="right">{row.targetQuantity} {row.unitViewName}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MealsNutrients;