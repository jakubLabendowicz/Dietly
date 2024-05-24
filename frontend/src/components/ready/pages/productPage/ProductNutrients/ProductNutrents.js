import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function ProductNutrients(props) {
    const { t } = useTranslation();
    let [rows, setRows] = useState([])

    function createRow(nutrientViewName, quantity, totalQuantity, unitViewName) {
        return { nutrientViewName, quantity, totalQuantity, unitViewName };
    }

    useEffect(()=>{
        let effectRows = [];
        for (const productNutrient of props.data.productNutrients) {
            effectRows.push(createRow(t(productNutrient.nutrient.viewName), productNutrient.quantity, productNutrient.quantity*(props.data.quantity/100), productNutrient.nutrient.unit.viewName));
        }
        setRows(effectRows);
    }, [])

    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>{t('Nutrients')}</TableCell>
                    <TableCell align="right">100 {props.data.unit.viewName}</TableCell>
                    <TableCell align="right">{props.data.quantity}{props.data.unit.viewName}</TableCell>
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
                    <TableCell align="right">{row.totalQuantity} {row.unitViewName}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
  
export default ProductNutrients;