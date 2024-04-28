import React from "react";
import { Grid, Typography } from '@mui/material'
import AllIcon from "Components/Common/Icons/AllIcon";
import _ from 'lodash';
import moment from "moment";

class PotItem extends React.Component {
    render(){
        let { item, lists } = this.props;
        console.log(lists, item);

        let reason = _.find(lists.reasons, {id: item.pot_reason_id});
        let user = _.find(lists.users, {id: parseInt(item.pot_created_for)});

        return (
            <Grid container>
                <Grid item xs={1}>
                    <AllIcon icon={reason?.icon} size={33}/>
                </Grid>
                <Grid item xs={9}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="body2">
                                {user?.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='caption'>
                                {item.pot_notes}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant='caption'>
                        {moment(item.pot_datetime).format('DD/MM/YYYY')}
                    </Typography>
                    <Typography variant="body1">
                        £{parseFloat(item.pot_amount).toFixed(2)}
                    </Typography>
                </Grid>
               
            </Grid>
        )
    }
}

export default PotItem;