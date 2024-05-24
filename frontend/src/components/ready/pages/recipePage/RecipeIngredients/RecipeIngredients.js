import CardsGrid from "../../../../utils/CardsGrid/CardsGrid";
import RecipeProductCard from "../../../platform/cards/RecipeProductCard/RecipeProductCard";

function RecipeIngredients(props) {
    return (
        <CardsGrid>
            {props.data.recipeProducts.map((recipeProduct, i) => 
                <RecipeProductCard data={recipeProduct} key={i}/>
            )}
        </CardsGrid>
    )
}
  
export default RecipeIngredients;