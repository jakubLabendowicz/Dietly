import Card from "../../../../utils/Card/Card";
import Tag from "../../../../utils/Tag/Tag";

function DietCard(props) {
  return (
    <Card
    location={"diet/" + props.data.id}
    image={props.data.file!==null?props.data.file.path: undefined}
    header={props.data.name}>
        {props.data.description}
    </Card>
    
  )
}

export default DietCard;