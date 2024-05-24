import './AppBar.css';

function AppBar(props) {
  return (
    <div className="app_bar">
        <div className="app_bar__inner">
            <div className='app_bar__top'>
                <div className="app_bar_header">
                    <div className="app_bar_header__inner">
                        {props.header}
                    </div>
                </div>
                <div className="app_bar_body">
                    <div className="app_bar_body__inner">
                        {props.children}
                    </div>
                </div>
            </div>
            <div className="app_bar_footer"> 
                {props.footer}
            </div>
        </div>
    </div>
  )
}

export default AppBar;