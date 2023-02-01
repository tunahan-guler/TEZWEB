import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useFilters, useGlobalFilter, useRowSelect, useSortBy, useTable } from 'react-table/dist/react-table.development'
import DefaultColumnFilter from './DefaultColumnFilter'

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef
        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])

        return (
            <>
                <Checkbox ref={resolvedRef} {...rest} size={'small'} style={{ padding: 0, margin: 0 }} />
            </>
        )
    }
)

const defaultColumn = { Filter: DefaultColumnFilter }

export const MSCReactTable = ({ columns, data, SelectRowData, filter = true, cursor, onRowClicked, globalFilterTable, selection, multipleSelection = false }) => {
    const { t } = useTranslation();
    const tableInstance = useTable(
        {
            columns,
            data,
            defaultColumn
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        useRowSelect,
        hooks => {
            (selection || multipleSelection) ?
                hooks.allColumns.push(columns => [
                    // Let's make a column for selection
                    {
                        id: 'selection',
                        // The header can use the table's getToggleAllRowsSelectedProps method
                        // to render a checkbox.  Pagination is a problem since this will select all
                        // rows even though not all rows are on the current page.  The solution should
                        // be server side pagination.  For one, the clients should not download all
                        // rows in most cases.  The client should only download data for the current page.
                        // In that case, getToggleAllRowsSelectedProps works fine.

                        Header: ({ getToggleAllRowsSelectedProps }) => {

                            if (multipleSelection) {
                                return (
                                    <div>
                                        <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                                    </div>
                                )
                            }
                        },

                        // The cell can use the individual row's getToggleRowSelectedProps method
                        // to the render a checkbox
                        Cell: ({ row }) => {
                            if (!multipleSelection) {
                                if (
                                    rows.filter((row) => row.isSelected).length < 1 ||
                                    row.isSelected
                                ) {
                                    return (
                                        <div>
                                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div>
                                            <IndeterminateCheckbox
                                                {...row.getToggleRowSelectedProps({
                                                    onChange: () => {
                                                        toggleAllRowsSelected(false);
                                                        row.toggleRowSelected(true);
                                                    },
                                                })}
                                            />
                                        </div>
                                    );
                                }
                            }
                            else {
                                return (
                                    <div>
                                        <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                                    </div>
                                )
                            }

                        },
                    },
                    ...columns,
                ])
                : null
        }
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        preGlobalFilteredRows,
        setGlobalFilter,
        toggleAllRowsSelected,
        state: { selectedRowIds, globalFilter },
    } = tableInstance;

    useEffect(() => {
        if (SelectRowData && selection) {
            SelectRowData(selectedFlatRows[0]?.original)
        }
        else if (SelectRowData && multipleSelection) {
            SelectRowData(selectedFlatRows)
        }
    }, [selectedRowIds])

    useEffect(() => {
        if (globalFilterTable) {
            globalFilterTable(preGlobalFilteredRows, setGlobalFilter, globalFilter)
        }
    }, [globalFilter]);

    return (
        <React.Fragment>
            <TableContainer components={Paper} style={{ maxHeight: 450, borderRadius: 15 }}>
                <Table stickyHeader sx={{maxHeight: 450 }}  {...getTableProps()} size="small" >
                    <TableHead>
                        {
                            headerGroups.map(headerGroup => (
                                <>
                                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                                        {
                                            headerGroup.headers.map(column => (
                                                <TableCell
                                                    {...(column.id === 'selection'
                                                        ? column.getHeaderProps()
                                                        : column.getHeaderProps(column.getSortByToggleProps()))}
                                                >
                                                    {column.render('Header')}
                                                    {column.id !== 'selection' ? (
                                                        <TableSortLabel
                                                            active={column.isSorted}
                                                            // react-table has a unsorted state which is not treated here
                                                            direction={column.isSortedDesc ? 'desc' : 'asc'}
                                                        />
                                                    ) : null}
                                                    {filter ?
                                                        <div>{column.canFilter ? column.render('Filter') : null}</div> : null}
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                </>
                            ))
                        }
                    </TableHead>
                    <TableBody {...getTableBodyProps()} >
                        {
                            rows.map(row => {
                                prepareRow(row);
                                const backgroundColor = row.isSelected ? '#d4ebf2' : null;
                                return (
                                    <TableRow style={{
                                        height: 40, backgroundColor: backgroundColor,
                                        cursor: selection || multipleSelection || cursor ? 'pointer' : null
                                    }}
                                        {...row.getRowProps({
                                            onDoubleClick: e => onRowClicked && onRowClicked(row, e),
                                            onClick: (e) => {
                                                if (selection || multipleSelection) {
                                                    if (!multipleSelection) {
                                                        if (rows.filter((row) => row.isSelected).length < 1 ||
                                                            row.isSelected) {
                                                            row.toggleRowSelected();
                                                        } else {
                                                            toggleAllRowsSelected(false);
                                                            row.toggleRowSelected();
                                                        }
                                                    } else {

                                                        row.toggleRowSelected();
                                                    }
                                                }
                                            },
                                        })}
                                    >
                                        {
                                            row.cells.map(cell => {
                                                return (
                                                    <TableCell style={{ padding: 0 }} {...cell.getCellProps({
                                                        style: {
                                                            // textAlign:cell.column.type === 'number' ? 'right' : null,
                                                            width: cell.column.width,
                                                            whiteSpace: "noWrap",
                                                            textOverflow: "ellipsis",
                                                            overflow: "hidden",
                                                        }
                                                    })}>
                                                        {
                                                            cell.render('Cell')
                                                        }
                                                    </TableCell>
                                                )
                                            })
                                        }
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>{
                    rows.length === 0 &&
                    <Typography style={{ textAlign: 'center', marginTop: '2%' }}>{t('nodata')}</Typography>
                }
            </TableContainer>
        </React.Fragment>
    )
}
