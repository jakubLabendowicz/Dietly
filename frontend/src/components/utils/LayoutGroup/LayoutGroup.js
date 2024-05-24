import './LayoutGroup.css';

function LayoutGroup(props) {
  return (
    <div className="layout_group">
        <div className="layout_group__inner">
            {props.children}
        </div>
    </div>
  )
}

export default LayoutGroup;