import Card from "../../../../utils/Card/Card";
import Tag from "../../../../utils/Tag/Tag";

function UserMealRecipeCard(props) {
    let data = props.data.recipe;

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
        location={"recipe/" + data.id}
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

export default UserMealRecipeCard;