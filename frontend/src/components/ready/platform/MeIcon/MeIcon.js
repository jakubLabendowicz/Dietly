import { useState } from "react";
import { getMe } from "../../../../api/controllers/MeApi";

function MeIcon() {
    var [path, setPath] = useState();
    getMe()
        .then(response => {
            setPath(response.data.file.path);
        })
    return (
        <img src={path} style={{height: 36, width: 36}}/>
    );
}

export default MeIcon;