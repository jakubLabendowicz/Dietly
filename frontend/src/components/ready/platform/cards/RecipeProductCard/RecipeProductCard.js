import Card from "../../../../utils/Card/Card";
import Tag from "../../../../utils/Tag/Tag";

function RecipeProductCard(props) {
  let product = props.data.product;

  let getEnergy = (product)=> {
    if(product.productNutrients !== undefined) {
      for (let productNutrient of product.productNutrients) {
        if(productNutrient.nutrient.code === "ENERGY") {
          return <Tag>{productNutrient.quantity * (product.quantity/100)} {productNutrient.nutrient.viewName}</Tag>;
        }
      }
    }
  }
  return (
    <Card
    location={"product/" + product.id}
    image={product.file!==null?product.file.path: undefined}
    header={
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
            <div>{product.name}</div>
            {props.data.unit!==undefined &&
              <div style={{fontSize: 8}}>{props.data.quantity + " " + props.data.unit.viewName}</div>
            }
        </div>
    }
    footer={getEnergy(product)}>
        {product.description}
    </Card>
    
  )
}

export default RecipeProductCard;