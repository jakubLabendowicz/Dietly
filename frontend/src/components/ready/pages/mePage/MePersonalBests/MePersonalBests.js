import { useEffect, useState } from "react";
import { getMe } from "../../../../../api/controllers/MeApi";
import { Grid } from '@mui/material';

function MePersonalBests() {
    var [userPersonalBests, setUserPersonalBests] = useState();
    
    useEffect(()=>{
        getMe()
        .then(response => {
            setUserPersonalBests(response.data.userPersonalBests);
        })
    }, [])
    return (
        <div>
            {userPersonalBests!==undefined&&
                <Grid container spacing={{ xs: 2, md: 3 }}>
                    {userPersonalBests.map((userPersonalBest) => (
                        <Grid item xs={12} sm={6} md={4} key={userPersonalBest.id}>
                            <div style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                                <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center", gap:8}}>
                                    <img src={userPersonalBest.personalBest.file.path} style={{width: 100}}/>
                                    <div style={{fontSize:10, fontWeight:600}}>{userPersonalBest.personalBest.name}</div>
                                </div>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            }
        </div>
    );
}

export default MePersonalBests;