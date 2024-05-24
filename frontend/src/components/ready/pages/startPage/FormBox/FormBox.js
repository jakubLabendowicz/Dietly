function FormBox(props) {
    return (
        <div style={{backgroundColor: 'white', height: 'calc(100vh - 3 * 64px)', width: "100%", borderRadius: 20}}>
            <div style={{padding: 32, height: 'calc(100% - 64px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', flexDirection: 'column', gap:64}}>
                    <div style={{fontSize: 30, fontWeight: 600}}>
                        {props.header}
                    </div>
                    <div>
                        {props.children}
                    </div>
                </div>
                <div>
                    {props.footer}
                </div>
            </div>
        </div>
    );
}

export default FormBox;