import "./NoToDi.css"

import NoToDiIcon from '../../../../images/NoToDi.png'

const NoToDi = ({show}) => {
    if(show) {
        return (
            <div className="notodi">
                <div className="notodi__inner">
                    <img src={NoToDiIcon} className="notodi_img"></img>
                </div>
            </div>
        )
    } else {
        return (
            <div>
            </div>
        )
    }
}

export default NoToDi;