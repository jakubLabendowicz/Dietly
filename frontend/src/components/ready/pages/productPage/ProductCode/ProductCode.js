var Barcode = require('react-barcode');

function ProductCode(props) {
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <Barcode value={props.data.code} format={"EAN13"}/>
        </div>
    )
}
  
export default ProductCode;