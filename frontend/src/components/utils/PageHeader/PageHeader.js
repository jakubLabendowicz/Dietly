import './PageHeader.css';

function PageHeader(props) {
  return (
    <div className="page_header">
        <div className="page_header__inner">
            <div className='page_header__left'>
                {props.image !== undefined &&
                    <div className="page_header_image">
                        <div className="page_header_image__inner" style={{backgroundImage: "url("+props.image+")"}}>
                        </div>
                    </div>
                }
                {props.header !== undefined &&
                    <div className="page_header_header">
                        <div className="page_header_header__inner">
                            {props.header}
                        </div>
                    </div>
                }
                <div className="page_header_body">
                    <div className="page_header_body__inner">
                        {props.children}
                    </div>
                </div>
            </div>
            {props.footer !== undefined &&
                <div className="page_header_footer">
                    <div className="page_header_footer__inner">
                        {props.footer}
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default PageHeader;