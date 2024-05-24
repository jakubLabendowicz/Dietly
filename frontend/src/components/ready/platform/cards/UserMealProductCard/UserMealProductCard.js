import Card from "../../../../utils/Card/Card";
import Tag from "../../../../utils/Tag/Tag";

function UserMealProductCard(props) {
  let data = props.data.product;

  let getEnergy = (data)=> {
    if(data.productNutrients !== undefined) {
      for (let productNutrient of data.productNutrients) {
        if(productNutrient.nutrient.code === "ENERGY") {
          return <Tag>{productNutrient.quantity * (data.quantity/100)} {productNutrient.nutrient.viewName}</Tag>;
        }
      }
    }
  }
  return (
    <Card
    location={"product/" + data.id}
    image={data.file!==null?data.file.path: undefined}
    header={
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
            <div>{data.name}</div>
            {/* <div style={{fontSize: 8}}>{data.quantity + " " + data.unit.viewName}</div> */}
        </div>
    }
    footer={getEnergy(data)}>
        {data.description}
    </Card>
    
  )
}

export default UserMealProductCard;