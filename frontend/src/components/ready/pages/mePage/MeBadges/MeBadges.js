import { useEffect, useState } from "react";
import { getMe } from "../../../../../api/controllers/MeApi";
import { Grid } from '@mui/material';

function MeBadges() {
    var [userBadges, setUserBadges] = useState();
    
    useEffect(()=>{
        getMe()
        .then(response => {
            setUserBadges(response.data.userBadges);
        })
    }, [])
    return (
        <div>
            {userBadges!==undefined&&
                <Grid container spacing={{ xs: 2, md: 3 }}>
                    {userBadges.map((userBadge) => (
                        <Grid item xs={1} sm={2} md={3} key={userBadge.id}>
                            <div style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                                <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center", gap:8}}>
                                    <img src={userBadge.badge.file.path} style={{width: 100, height: 100}}/>
                                    <div style={{fontSize:10, fontWeight:600}}>{userBadge.badge.name}</div>
                                </div>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            }
        </div>
    );
}

export default MeBadges;