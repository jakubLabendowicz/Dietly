import './Tag.css';

function Tag(props) {
  return (
    <div className="tag" style={{backgroundColor: props.backgroundColor, color: props.color}}>
        <div className="tag__inner">
            {props.children}
        </div>
    </div>
  )
}

export default Tag;