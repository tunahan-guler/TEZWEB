import React from 'react'
import { connectField } from 'uniforms'
import {GetCurrencies} from '../../../../@mscComponnent/Global/GlobalFunc'
import { MSCTableCell } from '../../../../@mscComponnent/UniformsComponnents/MSCTableCell'
import moment from 'moment'

const GetMovementHistory = ({value,dataCurrencies}) => {
    return (
        <>
            <MSCTableCell name={'docdate'} value={moment(value.docdate).format('DD-MM-YYYY')}/>
            <MSCTableCell name={'accdocno'}/>
            <MSCTableCell name={'amountlc'} value={value.amountlc.toFixed(2)}/>
            <MSCTableCell name={'currencylc'} options={GetCurrencies(dataCurrencies)}/>
        </>
    )
}

export default connectField(GetMovementHistory)