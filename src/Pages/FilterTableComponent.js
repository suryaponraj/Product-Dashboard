// src/components/filter.table.js
import React from "react";

import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';
import './FilterTable.css'


// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span style={{fontWeight:600 , display:'flex',flexDirection:'row' , alignItems:'center'}}>
            <div style={{padding:'6px' ,fontSize:'24px' ,fontFamily: 'cursive',
    color: 'white'}}>Filter:{' '}</div>
            <input
              style={{height:'30px'}}
                className="form-control"
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
            />
        </span>
    )
}

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <input
            className="form-control"
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}

function Table({ columns, data }) {

    const defaultColumn = React.useMemo(
        () => ({
            // Default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            defaultColumn
        },
        useFilters,
        useGlobalFilter
    )

    return (
        <div >
            <div className='products'>
            <div style={{fontWeight: '700px', fontSize:'24px' ,fontFamily: 'cursive',
    color: 'white'}}> <strong>Product Details</strong></div>
            <div className="filter">
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            /></div></div>
            <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th style={{textAlign:'left'}}{...column.getHeaderProps()}>
                                    {column.render('Header')}
                                    {/* Render the columns filter UI */}
                                    {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                    {
                        rows.length===0 && <tr><td style={{width:'100%', textAlign:'center'}}>No Data Available</td>
                        <td></td>
                        <td></td> <td></td> <td></td> <td></td>
                        </tr>
                    }
                </tbody>
            </table>
            <br />
            {/* <div>Showing the first 20 results of {rows.length} rows</div>
            <div>
                <pre>
                    <code>{JSON.stringify(state.filters, null, 2)}</code>
                </pre>
            </div> */}
        </div>
    )
}



function FilterTableComponent() {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Company',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'name',
                    },
                    {
                        Header: 'Location',
                        accessor: 'location'
                    },
                ],
            },
            {
                Header: 'Product Info',
                columns: [
                    {
                        Header: 'Product name',
                        accessor: 'product'
                    },
                    {
                        Header: 'Price',
                        accessor: 'price'
                    },
                    {
                        Header: 'Stock Status',
                        accessor: 'status'
                    },
                    {
                        Header: 'Quantity',
                        accessor: 'quantity'
                    },
                ],
            },
        ],
        []
    )

    const data = [
        {
            "name": "Himalayas",
            "location": "New Delhi",
            "product": "Face Wash",
            "price": 500,
            "status": "available",
            "quantity": 60,
        },
        {
            "name": "Mama Earth",
            "location": "Mumbai",
            "product": "Night Cream",
            "price": 450,
            "status": "available",
            "quantity": 30,
        },
        {
            "name": "Vilvah",
            "location": "Banglore",
            "product": "Hair Oil",
            "price": 550,
            "status": "Out of Stock",
            "quantity": 0,
        },
        {
            "name": "Himalayas",
            "location": "New Delhi",
            "product": "Aloe vera gel",
            "price": 300,
            "status": "available",
            "quantity": 80,
        },
        {
            "name": "Brown Living",
            "location": "Jharkhand",
            "product": "Skin Glow Cream",
            "price": 800,
            "status": "limited",
            "quantity": 10,
        },
        {
            "name": "Dove",
            "location": "New Delhi",
            "product": "Face Whitening Cream",
            "price": 500,
            "status": "available",
            "quantity": 60,
        },
        {
            "name": "Attitude",
            "location": "USA",
            "product": "Face Wash",
            "price": 700,
            "status": "available",
            "quantity": 100,
        },
    ]

    return (
        <Table columns={columns} data={data} />
    )
}

export default FilterTableComponent;