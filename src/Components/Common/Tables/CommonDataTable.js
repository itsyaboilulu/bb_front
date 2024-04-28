import { TableBody, TableCell, TableRow, Table, TableHead } from '@mui/material';
import React from 'react';
import _ from 'lodash';
import { v1 } from "uuid";
import SideDataTable from "./SideDataTable";

import { getField, renderColumn, getFormatedHeader } from './TableElements';

const initialState = props => ({
    key: v1(),
    rows: _.map(props.rows, (row, rowIdx) => ({...row, rowIdx}))
})


class DataTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = initialState(props);

    }

    componentDidUpdate(prevProps){
        if (JSON.stringify(prevProps) !== JSON.stringify(this.props)){
            this.setState({
                ...this.state,
                rows: initialState(this.props).rows
            })
        }
    }

    renderBody(){
        if (this.state.rows.length === 0) return (
            <TableBody>
                <TableRow>
                    <TableCell
                        colSpan={this.props.columns.length}
                        style={{textAlign: 'center'}}
                    >No Data</TableCell>
                </TableRow>
            </TableBody>
        )
        return (
            <TableBody
                key={`${this.state.key}_body`}
            >
                {_.map(_.filter(this.state.rows, i =>i), (row) => this.renderRow(row))}
            </TableBody>
        ) 
    }

    renderRow(row) {
        return (
            <TableRow
                key={getField(this.props.config.key, row)}
            >
                {this.props.sideHeading && this.getSideHeading(row)}
                {_.map(this.props.columns, (column) => renderColumn(column, row))}
            </TableRow>
        )
    }

    

    renderHeaders(){
        const { columns } = this.props
        return (
            <TableHead>
                {this.props.sideHeading && this.renderHeader()}
                {_.map(columns, (column) => this.renderHeader(column) )}
            </TableHead>
        )
    }

    renderHeader(column){
        return getFormatedHeader(column?.heading ?? '')
    }

    getSideHeading = row => {
        return getFormatedHeader(
            getField(this.props.sideHeading,row)
        )
    }

    render() {

        const { rows, columns, config } = this.props;

        return (
            
            <Table
                key={`${this.state.key}_table`}
            >
                {this.renderHeaders()}
                {this.renderBody()}
            </Table>
        )
    }
}

export default DataTable