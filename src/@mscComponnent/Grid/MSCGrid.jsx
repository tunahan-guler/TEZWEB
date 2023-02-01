import React, { useState } from 'react'
import DataGrid from 'react-data-grid';
import EmptyRowsRenderer from './EmptyRowsRenderer'

const MSCGrid = (props) => {
  return (
    <DataGrid
      className='rdg-light'
      columns={props.columns}
      rows={props.rows}
      onRowDoubleClick={props.onRowDoubleClick}
      components={{ noRowsFallback: <EmptyRowsRenderer /> }}
      onRowsChange={props.onRowsChange}
      selectedRows={props.selectedRows}
      onSelectedRowsChange={props.onSelectedRowsChange}
      rowKeyGetter={props.rowKeyGetter}
      onRowClick={props.onRowClick}
    />
  )
}

export default MSCGrid