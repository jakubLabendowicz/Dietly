function Title(props) {
    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <div>
              <div style={{fontSize: 150, fontWeight: 500}}>{props.title}</div>
              <div style={{fontSize: 50, fontWeight: 500}}>{props.subtitle}</div>
            </div>
          </div>
    );
}

export default Title;