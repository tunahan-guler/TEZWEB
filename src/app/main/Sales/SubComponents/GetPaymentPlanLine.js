import { Stack, TableCell } from '@mui/material'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { connectField } from 'uniforms'
import { AutoField, HiddenField } from 'uniforms-material'
import { MSCTableCell } from '../../../../@mscComponnent/UniformsComponnents/MSCTableCell'
import MSCTableRowField from '../../../../@mscComponnent/UniformsComponnents/MSCTableRowField'
import moment from 'moment'
import { GetCurrencies } from '../../../../@mscComponnent/Global/GlobalFunc'

const GetPaymentPlanLine = ({ value, dataCurrencies }) => {


    return (
        <>
            <MSCTableRowField  >
                <HiddenField name={'paymentplanid'} />
                <HiddenField name={'invoiceno'} />
                <MSCTableCell name={'paymentdate'} value={moment(value.paymentdate).format("DD-MM-YYYY")} />
                <MSCTableCell name={'currency'} options={GetCurrencies(dataCurrencies)}/>
                <MSCTableCell name={'amount'} value={value.amount.toFixed(2)}/>
            </MSCTableRowField>
        </>
    )
}

export default connectField(GetPaymentPlanLine)