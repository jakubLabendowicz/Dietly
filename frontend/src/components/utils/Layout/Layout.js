import './Layout.css';

function Layout(props) {
  return (
    <div className="layout">
        <div className="layout__inner">
            {props.children}
        </div>
    </div>
  )
}

export default Layout;