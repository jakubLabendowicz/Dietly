import './Group.css';

function Group(props) {
  return (
    <div className="group">
        <div className="group__inner">
            {props.children}
        </div>
    </div>
  )
}

export default Group;