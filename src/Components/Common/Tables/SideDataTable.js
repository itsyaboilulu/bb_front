import { TableBody, TableCell, TableRow, Table, TableHead, Grid } from '@mui/material';
import React from 'react';
import _ from 'lodash';
import { v1 } from "uuid";

import { getField, renderColumn, getFormatedHeader, renderGroupColumn, renderTotalColumn } from './TableElements';
import AllIcon from '../Icons/AllIcon';
import IconHelper from 'Helpers/IconHelper';
import { colors } from 'Helpers/ColorHelper'

const initialState = props => ({
    key: v1(),
    ogRows: _.map(props.rows, (row, rowIdx) => ({...row, rowIdx})),
    rows: _.map(props.rows, (row, rowIdx) => ({...row, rowIdx})),
    
    rowsPerPage: props?.pagination?.rowsPerPage ?? 4,
    totalPages: props?.pagination ? (
        Math.ceil(props.rows.length / (props?.pagination?.rowsPerPage ?? 4))
        ) : 1,

    currentPage: 0,
    pageStartIndex: 0,
    pageEndIndex: 0,
    paginationLoading: props?.pagination ? 1 : 0,

})


class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState(props);
       
    }

    componentDidMount(){
        if (this.props?.pagination){
            this.setPaginationPage(this.props?.pagination?.defaultPage ?? 0)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevProps.rows) !== JSON.stringify(this.props.rows)){
            console.log('update')
            this.setState({
                ...this.state,
                rows: initialState(this.props).rows
            }, () => {
                this.setPaginationPage(this.state.currentPage);
            })
        }
    }

    setPaginationPage = pageNumber => {
        
        let { rowsPerPage, totalPages } = this.state;

        console.log(pageNumber, totalPages)

        let pageStartIndex = (rowsPerPage * pageNumber);
        let pageEndIndex = (rowsPerPage * ( pageNumber + 1 ) );

        if (pageEndIndex > (totalPages * rowsPerPage) ){
            pageEndIndex = (totalPages * rowsPerPage);
        }

        let rows = [];
        let _pageEndIndex = 0;

        for ( var i = pageStartIndex; i < pageEndIndex; i++  ) {
            if (this.state.ogRows[i]) {
                rows.push(this.state.ogRows[i])
                _pageEndIndex = i;
            }
        }

        console.log(rows);

        this.setState({
            currentPage: pageNumber,
            pageStartIndex: pageStartIndex,
            pageEndIndex: _pageEndIndex,
            rows: rows,
        })
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
                {(this.props?.sideProps?.top ?? this.props.pagination) && this.renderTopRow()}
                {_.map(_.filter(this.props.columns, i => i), (column, index) => this.renderRow(column, index))}
            </TableBody>
        ) 
    }

    renderRow(column, index) {
        
        return (
            <TableRow
                key={`${this.state.key}_${index}_row`}
            >
                {this.props?.sideProps?.pre && this.getSideColumns('pre', column, index , -1, index === ( this.props.columns.length - 1 ))}
                {_.map(this.state.rows, (row, rIdx) => renderColumn(column, row, index, rIdx, index === ( this.props.columns.length - 1 )))}
                {this.props?.sideProps?.post && this.getSideColumns('post',  column, index , this.state.rows.length, index === ( this.props.columns.length - 1 ))}
            </TableRow>
        )
    }

    renderPaginationRow(column) {
        let rows = [];
        for(var i = (this.state.currentPage * this.state.rowsPerPage); i < (this.state.currentPage + 1 ) * this.state.rowsPerPage; i++){
            rows.push(this.state.rows[i]);
        }
        return (
            _.map(rows, (row) => renderColumn(column, row))
        )
    }

    getSideColumns = (direction, column, rowIdx=0, cIdx=0, last=false) => {
        let columns = this.props?.sideProps[direction];
        return (_.map(columns, c => {
            if (c.total){
                return renderTotalColumn({...c, style: {...c.style, borderBottom: last ? 'none' : 'default'}}, this.state.ogRows, column)
            }
            if (c.useColumns || !c.field) {
                return getFormatedHeader({...c, style: {...c.style, borderBottom: last ? 'none' : 'default'}, heading: column.heading});
            }
            return renderColumn(c, this.state.rows, rowIdx, cIdx, last)
        }))
    }

    renderTopRow = () => {
        return (
            <>
                {this.props.pagination &&
                    this.renderPagination()
                }
                {this.props?.sideProps?.top &&
                    _.map(this.props?.sideProps?.top, (top, tIndex) => 
                        <TableRow
                            key={`${this.state.key}_top_${tIndex}_row`}
                        >
                            {(tIndex + 1) === this.props?.sideProps?.top.length  && 
                                _.map(this.props?.sideProps?.pre, (pre, tIndex) => getFormatedHeader(pre) )
                            }
                            {_.map(this.state.rows, (row) => renderColumn({...top, header: true}, row))}
                            {(tIndex + 1) === this.props?.sideProps?.top.length  && 
                                _.map(this.props?.sideProps?.post, (post, tIndex) => getFormatedHeader(post) )
                            }
                        </TableRow>
                    )
                }
            </>
        )
    }

    renderPagination = () => {
        let header = `${getField(_.first(this.props?.sideProps?.top).field, this.state.ogRows[this.state.pageStartIndex])} - ${getField(_.first(this.props?.sideProps?.top).field, this.state.ogRows[this.state.pageEndIndex])}`

        return (
            <>
                <TableCell colSpan={(this.state.rowsPerPage) + (this.props?.sideProps?.post.length + this.props?.sideProps?.pre.length)} 
                    style={this.props?.pagination?.style}
                >
                    <Grid container spacing={1} justifyContent='space-around' alignItems='center'>
                        <Grid item>
                            <AllIcon 
                                icon={IconHelper.pagePrev}
                                disabled={this.state.currentPage === 0}    
                                onClick={()=>
                                    this.setPaginationPage(this.state.currentPage - 1)
                                }
                            />
                        </Grid>
                        <Grid item>{header}</Grid>
                        <Grid item>
                            <AllIcon 
                                icon={IconHelper.pageNext}
                                disabled={ ( this.state.currentPage + 1 ) === this.state.totalPages}    
                                onClick={()=>
                                    this.setPaginationPage(this.state.currentPage + 1)
                                }
                            />
                        </Grid>
                    </Grid>
                </TableCell>
            </> 
        )
    }


    render() {
        const { paginationLoading } = this.props

        return (
            <div
                style={{
                    borderRadius: '15px',
                    border: `1px solid ${colors.primary}`
                }}
            >
                <Table
                    key={`${this.state.key}_table`}
                >
                    {this.renderBody()}
                </Table>
            </div>
        )
    }
}

export default DataTable