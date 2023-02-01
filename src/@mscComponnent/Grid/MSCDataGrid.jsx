import { Icon, IconButton } from '@mui/material';
import React, { useState } from 'react'
import DataGrid from 'react-data-grid';
import EmptyRowsRenderer from './EmptyRowsRenderer'

const MSCDataGrid = (props) => {
  return (
    <DataGrid
      className='rdg-light'
      columns={[...props.columns, {
        key: 'action', name: null, width: 130, formatter: (fprops) => {
          return (
            <div style={{ display: 'flex' }}>
              {
                props.icon ?
                  props.icon.map((i, index) => (
                    <IconButton key={index} style={{ marginLeft: 'auto', marginRight: 'auto' }} onClick={(e) => i.onClick(e, fprops)}>
                      <Icon key={index}>{i.icon}</Icon>
                    </IconButton>
                  ))
                  : null}
            </div>
          )
        }
      }]}
      rows={props.rows}
      onRowDoubleClick={props.onRowDoubleClick}
      components={{ noRowsFallback: <EmptyRowsRenderer /> }}
      onRowsChange={props.onRowsChange}
      selectedRows={props.selectedRows}
      onSelectedRowsChange={props.onSelectedRowsChange}
      rowKeyGetter={props.rowKeyGetter}
    />
  )
}

export default MSCDataGrid