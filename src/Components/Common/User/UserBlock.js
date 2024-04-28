import { Grid, Typography } from '@mui/material';
import UnoPaper from 'Components/Common/Paper/UnoPaper';
import AllIcon from '../Icons/AllIcon';
import IconHelper from 'Helpers/IconHelper'
import { colors } from 'Helpers/ColorHelper';
export default function(props){
    const { userName, id, lobbyIdx, admin, removeUser } = props;
    return (
        <UnoPaper key={id} style={{padding: 15}} fullWidth white={!admin}>
            <Grid container alignItems={'center'} spacing={2} >
                <Grid item>
                    <Grid container>
                        <Grid xs={12}>
                            <Typography variant='h5'>
                                #{lobbyIdx + 1}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item >
                    <Typography variant='h5'>
                        {userName}
                    </Typography>
                </Grid>
                <Grid item style={{marginLeft: 'auto'}}>
                    {admin ?
                        <AllIcon
                            icon={IconHelper.admin}
                            size={33}
                        /> :
                        (removeUser &&
                            <AllIcon
                                icon={IconHelper.ban}
                                size={33}
                                color={colors.uRed}
                                toolTip='Kick user'
                                onClick={() => removeUser(id)}
                            />
                        )
                    }
                </Grid>
            </Grid>
        </UnoPaper>
    )
}