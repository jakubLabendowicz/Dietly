import nutriScore_A from '../../../../../images/NutriScore_A.png';
import nutriScore_B from '../../../../../images/NutriScore_B.png';
import nutriScore_C from '../../../../../images/NutriScore_C.png';
import nutriScore_D from '../../../../../images/NutriScore_D.png';
import nutriScore_E from '../../../../../images/NutriScore_E.png';

function ProductNutriScore(props) {
    let nutriScoreMap = {
        'A': nutriScore_A,
        'B': nutriScore_B,
        'C': nutriScore_C,
        'D': nutriScore_D,
        'E': nutriScore_E
    }
    return (
        <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
            <img src={nutriScoreMap[props.data.nutriScore]} style={{width: 200, height: 82}}/>
        </div>
    )
}
  
export default ProductNutriScore;