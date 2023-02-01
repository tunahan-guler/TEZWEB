import { TableCell } from '@mui/material'
import React, { useEffect } from 'react'
import { connectField } from 'uniforms'
import { HiddenField, ListDelField } from 'uniforms-material'
import { MSCTableCell } from '../../../../@mscComponnent/UniformsComponnents/MSCTableCell'
import MSCTableRowField from '../../../../@mscComponnent/UniformsComponnents/MSCTableRowField'

const AddStock = ({ itemcode, value, onChange }) => {
    useEffect(() => {
        onChange({...value, 'transqty':1})
    },[])
    return (
        <>
        <MSCTableRowField>
            <HiddenField name={'invoiceno'} value={0} />
            <HiddenField name={'id'} value={0} />
            <HiddenField name={'seqno'} value={1} />
            <HiddenField name={'itemcode'} value={itemcode} />
            <HiddenField name={'returnedqty'} value={0} />
            <MSCTableCell name={'serialno'} maxLength={20}/>
            <MSCTableCell name={'batchno'} maxLength={20}/>
            <MSCTableCell name={'transqty'} disabled/>
            <TableCell align="center" style={{ border: '0.5px solid #DCDCDC', height: '5', padding: 0 }} >
                <ListDelField name="" size={'small'} variant="standard"
                    style={{ padding: "0px 5px", margin: "0px" }} />
            </TableCell>
            </MSCTableRowField>
        </>
    )
}

export default connectField(AddStock)