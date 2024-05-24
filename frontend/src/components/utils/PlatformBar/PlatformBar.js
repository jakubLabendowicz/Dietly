import './PlatformBar.css';

function PlatformBar(props) {
  return (
    <div className="platform_bar">
        <div className="platform_bar__inner">
            <div className="platform_bar_header">
                {props.header}
            </div>
            <div className="platform_bar_body">
                <div className="platform_bar_body__inner">
                    {props.body}
                </div>
            </div>
            <div className="platform_bar_footer">
                {props.footer}
            </div>
        </div>
    </div>
  )
}

export default PlatformBar;