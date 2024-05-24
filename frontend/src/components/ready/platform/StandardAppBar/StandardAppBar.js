import { Button, IconButton } from "@mui/material";
import AppBar from "../../../utils/AppBar/AppBar";
import Logo from "../Logo/Logo";
import HomeIcon from '@mui/icons-material/Home';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ExploreIcon from '@mui/icons-material/Explore';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

import '../../../utils/AppBar/AppBar.css';
import MeIcon from "../MeIcon/MeIcon";
import { removeToken } from "../../../../api/utils/TokenUtils";

function StandardAppBar() {
    return (
        <AppBar
            header={
                <Logo/>
            }
            footer={
                <div className="app_bar_footer__inner">
                    <IconButton
                        style={{width: 48, height: 48, borderRadius: 8}}
                        onClick={()=>{
                            removeToken();
                            window.location = "/sign-in";
                        }}>
                        <LogoutIcon
                            style={{color: "black"}}/>
                    </IconButton>
                    <IconButton
                        style={{width: 48, height: 48, borderRadius: 8}}
                        href='/settings'>
                        <SettingsIcon
                            style={{color: "black"}}/>
                    </IconButton>
                    <IconButton
                        variant="contained"
                        style={{width: 48, height: 48, borderRadius: 8}}
                        href='/me'>
                        <MeIcon/>
                    </IconButton>
                </div>
            }>
            <IconButton
                variant="contained"
                style={{backgroundColor: "#212121", width: 48, height: 48, borderRadius: 8}}
                href='/home'>
                <HomeIcon
                    style={{color: "white"}}/>
            </IconButton>
            <IconButton
                variant="contained"
                style={{backgroundColor: "#7C99DB", width: 48, height: 48, borderRadius: 8}}
                href='/meals'>
                <RestaurantIcon
                    style={{color: "white"}}/>
            </IconButton>
            <IconButton variant="contained" style={{backgroundColor: "#6D9EE6", width: 48, height: 48, borderRadius: 8}} href='/discover'>
                <ExploreIcon style={{color: "white"}}/>
            </IconButton>
            <IconButton variant="contained" style={{backgroundColor: "#6464BB", width: 48, height: 48, borderRadius: 8}} href='/diets'>
                <MenuBookIcon style={{color: "white"}}/>
            </IconButton>
            <IconButton variant="contained" style={{backgroundColor: "#bf555a", width: 48, height: 48, borderRadius: 8}} href='/search'>
                <SearchIcon style={{color: "white"}}/>
            </IconButton>
        </AppBar>
    );
}

export default StandardAppBar;
