import { IconButton, InputBase} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function SearchBar() {
    const { t } = useTranslation();
    let [term, setTerm] = useState();

    useEffect(()=>{
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        setTerm(urlParams.get('term'));
      }, []);
    return (
        <div className="search_bar" style={{height: 48, width: 800, backgroundColor: "#EEEEFE", borderRadius: 20}}>
            <div className="search_name__inner" style={{display: "flex", flexDirection: "row", justifyContent: "space-between", margin:"0px 16px"}}>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder={t('Search')}
                    value={term}
                    onChange={(event)=>{setTerm(event.target.value)}}
                />
                <IconButton style={{width: 48, height: 48, borderRadius: 8}} onClick={()=>{window.location="/search?term="+term}}>
                    <SearchIcon style={{color: "black"}}/>
                </IconButton>
            </div>
        </div>
    );
}

export default SearchBar;