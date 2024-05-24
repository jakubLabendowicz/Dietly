import './LayoutSection.css';

function LayoutSection(props) {
  return (
    <div className="layout_section">
        <div className="layout_section__inner">
            {props.header !== undefined &&
                <div className="layout_section_header">
                    <div className="layout_section_header__inner">
                        {props.header}
                    </div>
                </div>
            }
            <div className="layout_section_body">
                <div className="layout_section_body__inner">
                    {props.children}
                </div>
            </div>
            {props.footer !== undefined &&
                <div className="layout_section_footer">
                    <div className="layout_section_footer__inner">
                        {props.footer}
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default LayoutSection;