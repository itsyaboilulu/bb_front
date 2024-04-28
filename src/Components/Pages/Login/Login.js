import React from "react";
import { Grid, Typography } from '@mui/material';
import Button from "Components/Common/Buttons/Button";
import TextField from "Components/Common/Inputs/TextField";
import API from "API";
import InputHelper from "Helpers/InputHelper";
import {connect} from 'react-redux';

import { setUser } from 'Redux/Actions/User/User';

const initialState = {
    formData: {
        username: '',
        password: '',
    }
}

class Login extends React.Component {
    constructor (props) {
        super(props)
        this.state = initialState;
        this.input = new InputHelper(this.state, (e) => this.setState(e))
    } 

    login = () => {
        API.post('/auth/login', this.state.formData).then((response) => {
            if (!response.errors){
                this.props.setUser(
                        response.user,
                        response.jwt
                )
            }
        })
    }

    render() {

        const { formData } = this.state;

        return (
            <Grid container spacing={2}
                style={{
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Grid item xs={8}>
                    <Typography variant="h1">Login</Typography>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        label='Username'
                        value={formData.username}
                        name='formData.username'
                        onChange={this.input.handleTextInputChange}
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        label='Password'
                        type="password"
                        value={formData.password}
                        name='formData.password'
                        onChange={this.input.handleTextInputChange}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Button
                        onClick={this.login}
                    >Log in</Button>
                </Grid>
            </Grid>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    setUser: (user, jwt) => dispatch(setUser(user, jwt)),
})

export default connect(null, mapDispatchToProps)(Login);