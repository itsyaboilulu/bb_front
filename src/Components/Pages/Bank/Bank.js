import { Box, Grid, List, ListItem } from "@mui/material";
import API from "API";
import Button from "Components/Common/Buttons/Button";
import Dialog from "Components/Common/Dialogs/Dialog";
import Select from "Components/Common/Inputs/Select";
import TextField from "Components/Common/Inputs/TextField";
import Loading from "Components/Common/Loading/Loading";
import { theme } from "Helpers/ColorHelper";
import React from "react";
import { connect } from 'react-redux';
import PotItem from "./PotItem";
import _ from "lodash"

const initialState = (props=null) => ({
    data: {},
    dialog: {
        open: false,
        formData: {
            pot: '20.00',
            payee: props.user.user.id,
            reason: 1,
            notes: ''
        }
    },
    isLoading: true
})

class Bank extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = initialState(props);
    }

    componentDidMount(){
        this.getData();
    }

    getData(){
        API.get('/bank').then((data) => {
            this.setState({
                data: data,
                isLoading: false
            })
        })
    }

    setDialogData = (e, float=false) => {
        const { value, name } = e.target
        this.setState({
            dialog: {
                ...this.state.dialog,
                formData: {
                    ...this.state.dialog.formData,
                    [name]: float ? parseFloat(value).toFixed(2) : value
                }
            }
        })
    }

    handleAddToPot = () => {
        API.post('/bank/pot', this.state.dialog.formData).then(res => {
            this.setState({
                dialog: initialState(this.props).dialog
            }, this.getData)
        })
    }

    render() {

        const { isLoading, dialog, data } = this.state;
        if (isLoading) {
            <Loading/>
        }


        // AuthHelper.logOut()

        return (

            <>
                <Grid
                    container
                    spacing={1}
                >
                    <Grid item xs={12}
                        style={{
                            borderBottom: `1px solid ${theme.divider}`
                        }}
                    >
                        head
                    </Grid>
                    <Grid item xs={12}>
                        <List>
                            {_.map(data.transactions, t => 
                                <ListItem>
                                    <PotItem item={t} lists={this.props.lists} />
                                </ListItem>
                            )}
                        </List>
                    </Grid>
                    <Box
                        style={{
                            position: 'fixed',
                            bottom: 60,
                            left: 0,
                            width: 'calc(100vw - 2em)',
                            margin: '1em'
                        }}
                    >
                        <Button
                            fullWidth
                            onClick={() => this.setState({
                                dialog:{
                                    ...initialState(this.props).dialog,
                                    open: true
                                }
                            })}
                        >Add To Pot</Button>

                    </Box>
                </Grid>
                {dialog.open &&
                    <Dialog
                        open={dialog.open}
                        title='Add To Pot'
                        fullWidth
                    >
                        <Grid container spacing={1} style={{paddingTop: 10}}>
                            <Grid item xs={12}>
                                <TextField
                                    value={dialog.formData.pot}
                                    name='pot'
                                    onChange={e=>this.setDialogData(e,false)}
                                    onBlur={e=>this.setDialogData(e,true)}
                                    inputProps={{
                                        startAdornment: '£'
                                    }}
                                    fullWidth
                                    label='Amount'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Select
                                    value={dialog.formData.payee}
                                    options={
                                        this.props.lists.users.map(i=>({
                                            value: i.id,
                                            label: i.name
                                        }))
                                    }
                                    fullWidth
                                    name='payee'
                                    label='Payee'
                                    onChange={e=>this.setDialogData(e,false)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Select
                                    value={dialog.formData.reason}
                                    options={
                                        this.props.lists.reasons.map(i=>({
                                            value: i.id,
                                            label: i.name
                                        }))
                                    }
                                    fullWidth
                                    name='reason'
                                    label='Reason'
                                    onChange={e=>this.setDialogData(e,false)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={dialog.formData.notes}
                                    name='notes'
                                    onChange={e=>this.setDialogData(e,false)}
                                    fullWidth
                                    placeholder='Additional notes'
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    variant='outlined'
                                    fullWidth
                                    onClick={()=>this.setState({dialog: initialState(this.props).dialog})}
                                >Close</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    disabled={
                                        parseFloat(dialog.formData.amount) <= 0 
                                    }
                                    onClick={this.handleAddToPot}
                                >Add To Pot</Button>
                            </Grid>
                        </Grid>
                    </Dialog>
                }
            </>
        )
    }

}

const mapStateToProps = state => ({
    user: state.user,
    lists: state.lists
})

export default connect(mapStateToProps)(Bank);