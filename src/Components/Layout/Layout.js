import React from 'react';
import { Box, Grid } from '@mui/material';
import { connect } from 'react-redux';
import AuthHelper from 'Helpers/AuthHelper';

import Login from './../Pages/Login/Login';
import LayoutHeader from './LayoutHeader';
import LayoutFooter from './LayoutFooter';
import LayoutRouter from './LayoutRouter';
import { theme } from 'Helpers/ColorHelper';

import { setLists } from 'Redux/Actions/Lists/Lists';
import API from 'API';

class Layout extends React.Component {

    componentDidMount = async () => {
        if ( !this.props.lists?.users?.length ) {
           this.getUsers();
        }
        if ( !this.props.lists?.reasons?.length ) {
            this.getReasons();
         }
    }

    getUsers = () => {
        API.get('/lists/users').then(res => {
            this.props.setLists('users',res)
        })
    }
    getReasons = () => {
        API.get('/lists/reasons').then(res => {
            this.props.setLists('reasons',res)
        })
    }

    render() {

        return (
            <Box
                style={{
                    BackgroundColor: theme.background,
                    height: '-webkit-fill-available'
                }}            
            >
                {(AuthHelper.isLoggedIn()) ? 
                    <Grid container>
                        <Grid item xs={12}
                            style={{ height: '60px' }}
                        >
                            <LayoutHeader />
                        </Grid>
                        <Grid item xs={12}
                            style={{ height: 'calc(100% - 130px)',
                        }}
                        >
                            <LayoutRouter/>
                        </Grid>
                        <Grid item xs={12}
                            style={{ height: '70px' }}
                        >
                            <LayoutFooter/> 
                        </Grid>
                    
                    </Grid> :
                    <Login/>
                }
                
            </Box>
        )

    }

}

const mapStateToProps = (state) => ({
    user: state.user,
    lists: state.lists
})

const mapDispatchToProps = (dispatch) => ({
    setLists: (k,v) => dispatch(setLists(k,v))
}) 


export default connect(mapStateToProps, mapDispatchToProps)(Layout);