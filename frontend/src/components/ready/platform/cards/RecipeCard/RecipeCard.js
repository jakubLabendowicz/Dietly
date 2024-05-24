import Card from "../../../../utils/Card/Card";
import Tag from "../../../../utils/Tag/Tag";
import { useTranslation } from "react-i18next";

function RecipeCard(props) {
  const { t } = useTranslation();
  let getEnergy = (data)=> {
    if(data.recipeNutrients !== undefined) {
      for (let recipeNutrient of data.recipeNutrients) {
        if(recipeNutrient.nutrient.code === "ENERGY") {
          return <Tag>{recipeNutrient.quantity * (data.quantity/100)} {recipeNutrient.nutrient.viewName}</Tag>;
        }
      }
    }
  }
  return (
    <Card
    location={"recipe/" + props.data.id}
    image={props.data.file!==null?props.data.file.path: undefined}
    header={
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
            <div>{props.data.name}</div>
            <div style={{fontSize: 8}}>{props.data.quantity + " " + props.data.unit.viewName}</div>
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

export default RecipeCard;