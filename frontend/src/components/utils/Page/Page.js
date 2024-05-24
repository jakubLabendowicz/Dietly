import './Page.css';

function Page(props) {
  return (
    <div className="page">
        <div className="page__inner" style={{marginTop: props.bar_header !== undefined?152:64, paddingTop: props.bar_body !== undefined?48:0}}>
            {(props.bar_header !== undefined || props.bar_body !== undefined) &&
                <div className="page_bar_container">
                    <div className="page_bar_container__inner">
                        {props.bar_header !== undefined &&
                            <div className="page_bar_header">
                                <div className="page_bar_header__inner">
                                    {props.bar_header}
                                </div>
                            </div>
                        }
                        {props.bar_body !== undefined &&
                            <div className="page_bar_body">
                                <div className="page_bar_body__inner">
                                    {props.bar_body}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }
            {props.header !== undefined &&
                <div className="page_header_container">
                    <div className="page_header_container__inner">
                        {props.header}
                    </div>
                </div>
            }
            <div className="page_body_container">
                <div className="page_body_container__inner">
                    {props.children}
                </div>
            </div>
            {props.footer !== undefined &&
                <div className="page_footer_container">
                    <div className="page_footer_container__inner">
                        {props.footer}
                    </div>
                </div>
            }
            {props.speedDial!== undefined &&
                <div className="page_speed_dial_container">
                    <div className="page_speed_dial_container__inner">
                        {props.speedDial}
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default Page;