import logo from '../../../../icons/logo.png';

function Logo() {
    return (
        <div style={{height: 48, width: 48, display: 'flex', flexDirection: 'row', justifyContent: "center", alignItems: "center"}}>
            <img src={logo} style={{height: 30, width: 30}}/>
        </div>
    );
}

export default Logo;