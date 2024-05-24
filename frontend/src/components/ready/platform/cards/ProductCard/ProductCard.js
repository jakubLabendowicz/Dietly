import Card from "../../../../utils/Card/Card";
import Tag from "../../../../utils/Tag/Tag";
import { useTranslation } from "react-i18next";

function ProductCard(props) {
  const { t } = useTranslation();
  let getEnergy = (data)=> {
    if(data.productNutrients !== undefined) {
      for (let productNutrient of data.productNutrients) {
        if(productNutrient.nutrient.code === "ENERGY") {
          return <Tag>{productNutrient.quantity * (data.quantity/100)} {productNutrient.nutrient.unit.viewName}</Tag>;
        }
      }
    }
  }
  return (
    <Card
    location={"product/" + props.data.id}
    image={props.data.file!==null?props.data.file.path: undefined}
    header={
      <div style={{width: "100%"}}>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
            <div>{props.data.name}</div>
            <div style={{fontSize: 8}}>{props.data.quantity + " " + props.data.unit.viewName}</div>
        </div>
        {props.data.producer !== undefined && props.data.producer !== null  &&
          <div style={{fontSize: 11}}>{props.data.producer}</div>
        }
      </div>
    }
    footer={
      <div style={{display: "flex", flexDirection: "row", gap: 8}}>
        {getEnergy(props.data)}
        {true === props.data.vegan &&
          <Tag backgroundColor={"#2e7d32"} color={"white"}>{t('Vegan')}</Tag>
        }
        {true === props.data.vegetarian &&
          <Tag backgroundColor={"#2e7d32"} color={"white"}>{t('Vegetarian')}</Tag>
        }
      </div>
      }>
        {props.data.description}
    </Card>
    
  )
}

export default ProductCard;