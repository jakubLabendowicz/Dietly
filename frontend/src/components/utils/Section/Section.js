import './Section.css';

function Section(props) {
  return (
    <div className="section">
        <div className="section__inner">
            {props.header !== undefined &&
                <div className="section_header">
                    <div className="section_header__inner">
                        {props.header}
                    </div>
                </div>
            }
            <div className="section_body">
                <div className="section_body__inner">
                    {props.children}
                </div>
            </div>
            {props.footer !== undefined &&
                <div className="section_footer">
                    <div className="section_footer__inner">
                        {props.footer}
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default Section;