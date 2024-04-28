import React from 'react';
import {  Grid, List, ListItem, ListItemText } from '@mui/material';
import _ from 'lodash';
import { colors } from 'Helpers/ColorHelper';

const initialState = props => ({
    tab: props.defaultTab || (props.tabs?.length > 0 ? props.tabs[0].label : null),
    tabs: props.tabs || []
})

class SideSwitcher extends React.Component {
    constructor(props){
        super(props);
        this.state = initialState(props);
    }

    componentDidUpdate(pevProps){
        if (this.props.tabs.length !== pevProps.tabs.length){
            this.setState({tabs: this.props.tabs});
        }
    }

    render(){
        const {tabs, tab} = this.state;

        return (
            <Grid container>
                <Grid item style={{width: `calc(100% - 250px)`}}>

                </Grid>
                <Grid item style={{width: `250px`, backgroundColor: colors.white}}>
                    <List>
                        {_.map(tabs, ({label}, idx) => 
                            <ListItem key={idx}>
                                <ListItemText>{label}</ListItemText>
                            </ListItem>
                        )}
                    </List>         
                </Grid>
            </Grid>
        )
    }
}

export default SideSwitcher;