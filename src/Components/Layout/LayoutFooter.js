import React from "react";
import {Box, Grid} from '@mui/material'
import { theme } from "Helpers/ColorHelper";
import _ from 'lodash'
import AllIcon from "Components/Common/Icons/AllIcon";

const menuItems = [
    {
        name: 'Dice',
        link:'/dice',
        icon: 'dice'
    },
    {
        name: 'Bank',
        link:'/bank',
        icon: 'piggy-bank'
    }
];

class LayoutHeader extends React.Component {


    render() {

        return (
            <Box
                style={{
                    borderTop: `1px solid ${theme.divider}`,
                    paddingTop: 9
                }}
            >
                <Grid container spacing={1}
                    style={{
                        textAlign: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignContent: 'center'
                    }}
                >
                    {_.map( menuItems, ({name, link, icon}) => 
                        <Grid item style={{width: `${100/menuItems.length}%`}}>
                            <AllIcon icon={icon} 
                                size={35}
                                color={
                                    window.location.pathname.includes(link) && theme.primary
                                }
                                onClick={()=>window.location.replace(link)}
                            />
                        </Grid>
                    )}
                </Grid>
            </Box>
        )
    }

}

export default LayoutHeader;