import { Link } from '@mui/material';
import './Card.css';

function Card(props) {
  return (
    <div className="card" onClick={()=>{window.location="../../"+props.location}}>
        <div className="card__inner">
            {props.image !== undefined &&
                <div className="card_image">
                    <div className="card_image__inner" style={{backgroundImage: "url("+props.image+")"}}>
                    </div>
                </div>
            }
            {props.header !== undefined &&
                <div className="card_header">
                    <div className="card_header__inner">
                        {props.header}
                    </div>
                </div>
            }
            <div className="card_body">
                <div className="card_body__inner">
                    {props.children}
                </div>
            </div>
            {props.footer !== undefined &&
                <div className="card_footer">
                    <div className="card_footer__inner">
                        {props.footer}
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default Card;