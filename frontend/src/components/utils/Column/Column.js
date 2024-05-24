import './Column.css';

function Column(props) {
  var columnStyle = {};
  let columnClassNames = "column";
  if(props.style !== undefined) columnStyle=props.style;
  if(props.widthPoints !== undefined) {
    if(props.widthPoints === 1) columnClassNames = columnClassNames + ", column__width_points_1";
    if(props.widthPoints === 2) columnClassNames = columnClassNames + ", column__width_points_2";
  }
  if(props.width !== undefined) columnStyle.width = props.width;
  return (
    <div className={columnClassNames} style={columnStyle}>
        <div className="column__inner">
            {props.children}
        </div>
    </div>
  )
}

export default Column;