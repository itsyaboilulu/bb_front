import { TableCell } from '@mui/material'
import _, { head } from 'lodash'

export function getColumnStyle(column, row = null) {
    let style = column.style ? getField(column.style, row) : {}
    if (column?.sizeToContent){
        style = {
            ...style,
            width: '1%'
        }
    }

    if (column?.align){
        style = {
            ...style,
            textAlign: column?.align
        }
    } 

    return style;
}


export function getNestedFieldStr(field, row){
    if (field.search('.')){
        let data = row[field.split('.')[0]];
        if (!data) return data;
        return getNestedFieldStr(field.split('.').shift().join('.'))
    }

    return row[field]
}

export function getField(field, row=null){
    if (!row) return field;
    return _.isFunction(field) ? field(row) :  (_.isObject(field) ? field :  (getNestedFieldStr(field, row) ?? field))
}

export function renderColumn(column, row, rowIdx=0, cIdx=0, last=false){

    let child = getField(column.field, row);
    if (column.header){
        return getFormatedHeader({...column, heading: child})
    }

    let style = getColumnStyle(column, row)

    if (last){
        style = {
            ...style,
            borderBottom: 'none'
        }
    }

    return (
        <TableCell
            key={`dataTable-row-${row.rowIdx}-${cIdx}`}
            style={style}
        >
            {child}
        </TableCell>
    )
}

export function getFormatedHeader (header) {
    let style = getColumnStyle(header)
    return (
        <TableCell
            style={style}
        >
            {header.heading}
        </TableCell>
    )
}

export function renderTotalColumn(total, rows, column){
    let dataRefData = _.map(rows, r => getField(column?.dataRef,r));
    let _total = _.sumBy(dataRefData, i => getField(total.total, i))
    return getFormatedHeader({...total, heading:_total})
}