import React from 'react'
import { connectField } from 'uniforms'
import { MSCTableCell } from '../../../../@mscComponnent/UniformsComponnents/MSCTableCell'
import {HiddenField, ListDelField} from 'uniforms-material'
import { TableCell} from '@mui/material'
import MSCTableRowField from '../../../../@mscComponnent/UniformsComponnents/MSCTableRowField'

const GetInvoicedStocks = ({getViewModeEx, value}) => {
  return (
    <>
    <MSCTableRowField>
        <HiddenField name={'invoiceno'} value={0} />
        {/* <HiddenField name={'returnedqty'} value={value?.returnedqty ? value?.returnedqty : value?.transqty} /> */}
        <MSCTableCell name="itemcode" />
        <MSCTableCell name="batchno" />
        <MSCTableCell name="serialno" />
        <MSCTableCell name="transqty" />
        <TableCell align="center" style={{
          border: '0.5px solid #DCDCDC', height: '5', padding: 0, backgroundColor:
            value?.transqty - value?.returnedqty === 0 ? '#ffcccb' : null
        }}  >
          <ListDelField name="" size={'small'} variant="standard" InputProps={{ disableUnderline: true }}
            style={{ padding: "0px 5px", margin: "0px" }}
            disabled={getViewModeEx === 3 || value?.transqty - value?.returnedqty === 0 ? true : false}
            // disabled={getViewModeEx === 2 || value?.transqty - value?.returnedqty !== 0
            //   ? false : true} 
            />
        </TableCell>
    </MSCTableRowField>
    </>
  )
}

export default connectField(GetInvoicedStocks)