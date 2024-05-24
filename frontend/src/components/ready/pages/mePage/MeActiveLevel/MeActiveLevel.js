import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { getMe, patchMe } from "../../../../../api/controllers/MeApi";

function MeActivityLevel() {
    let [activeLevel, setActiveLevel] = useState();
    let updateActiveLevel = (activeLevel) => {
        patchMe({activeLevel: activeLevel})
        .then(()=>{
            setActiveLevel(activeLevel)
        })
    }
    useEffect(()=>{
        getMe()
        .then(response => {
            setActiveLevel(response.data.activeLevel);
        })
    })
    return (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", gap: 32}}>
            <IconButton
                variant="contained"
                style={{backgroundColor: activeLevel===1?"#6D9EE6":"#CCCCCC", color:"white", width: 48, height: 48, borderRadius: 8}}
                onClick={()=>{updateActiveLevel(1)}}>1</IconButton>
            <IconButton
                variant="contained"
                style={{backgroundColor: activeLevel===2?"#6D9EE6":"#CCCCCC", color:"white", width: 48, height: 48, borderRadius: 8}}
                onClick={()=>{updateActiveLevel(2)}}>2</IconButton>
            <IconButton
                variant="contained"
                style={{backgroundColor: activeLevel===3?"#6D9EE6":"#CCCCCC", color:"white", width: 48, height: 48, borderRadius: 8}}
                onClick={()=>{updateActiveLevel(3)}}>3</IconButton>
            <IconButton
                variant="contained"
                style={{backgroundColor: activeLevel===4?"#6D9EE6":"#CCCCCC", color:"white", width: 48, height: 48, borderRadius: 8}}
                onClick={()=>{updateActiveLevel(4)}}>4</IconButton>
            <IconButton
                variant="contained"
                style={{backgroundColor: activeLevel===5?"#6D9EE6":"#CCCCCC", color:"white", width: 48, height: 48, borderRadius: 8}}
                onClick={()=>{updateActiveLevel(5)}}>5</IconButton>
        </div>
    );
}

export default MeActivityLevel;