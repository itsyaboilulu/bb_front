import { Grid } from "@mui/material";
import UserBlock from "Components/Common/User/UserBlock";
import _ from 'lodash'

export default function({ users, showMax, max, style, removeUser }){
    return (
        <Grid item style={{
            width: 'fit-content',
            height: '100%',
            ...style
        }}> 
            <Grid container alignItems={'flex-start'} style={{height: '100%',}} alignContent='flex-start'>
                {_.map(users, (i,idx) => 
                    <Grid item xs={12} style={{marginBottom: '1em'}}>
                        <UserBlock
                            userName={i.u} 
                            id={i.i} 
                            lobbyIdx={idx} 
                            admin={i.a}
                            removeUser={removeUser}
                        />
                    </Grid>
                )}
            </Grid>
        </Grid>
    )
}