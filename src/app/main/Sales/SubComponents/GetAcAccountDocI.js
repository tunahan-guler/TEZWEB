import { TableCell } from '@mui/material'
import React from 'react'
import { connectField, useForm } from 'uniforms'
import { AutoField, HiddenField, SelectField } from 'uniforms-material'
import { enumMovementTypes } from '../../../../@mscComponnent/Global/GlobalFunc'
import { MSCTableCell } from '../../../../@mscComponnent/UniformsComponnents/MSCTableCell'
import moment from 'moment'

const GetAcAccountDocI = ({ onChange, value, acJSON, selectedStakeholder, invoiceH }) => {

    return (
        <>
            <HiddenField name={'companyid'} value={1} />
            <HiddenField name={'accdocno'} value={acJSON?.accdocno} />
            <HiddenField name={'accdocyear'} value={0} />
            <HiddenField name={'accdocseq'} value={0} />
            <HiddenField name={'dcindicator'} value={invoiceH.invoicetype === "SA" ? "C" : "D"} />
            <HiddenField name={'amount'} value={value.amountlc} />
            <HiddenField name={'maturitydate'} value={moment().format('YYYY-MM-DD')} />
            <HiddenField name={'accountclassid'} value={value.movementtypeid === 1 ? 3 : (value.movementtypeid === 4 ||
                value.movementtypeid === 8 ? 2 : '')} />
            <HiddenField name={'stakeholderid'} value={selectedStakeholder?.stakeholderid} />
            <HiddenField name={'deleted'} value={false} />
            <HiddenField name={'createtime'} value={moment().format('HH:MM')} />
            <HiddenField name={'createuser'} value={"Tunahan"} />
            <HiddenField name={'changetime'} value={moment().format('HH:MM')} />
            <HiddenField name={'changeuser'} value={"Tunahan"} />
            <MSCTableCell name={'movementtypeid'} options={enumMovementTypes()} />
            <MSCTableCell name={'ownercode'} />
            <MSCTableCell name={'amountlc'} value={value.amountlc.toFixed(2)} />
            <MSCTableCell name={'currency'} />
            <MSCTableCell name={'explanation'} />
        </>
    )
}

export default connectField(GetAcAccountDocI)