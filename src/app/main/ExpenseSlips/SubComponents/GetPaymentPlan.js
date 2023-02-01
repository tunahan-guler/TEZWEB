import React from 'react'
import { connectField } from 'uniforms'
import { HiddenField } from 'uniforms-material'
import moment from 'moment'

const GetPaymentPlan = () => {

    return (
        <>
            <HiddenField name={'invoicepaymentplan.invoiceno'} value={0} />
            <HiddenField name={'invoicepaymentplan.installmentcount'} value={1} />
            <HiddenField name={'invoicepaymentplan.installmentperiod'} value={1} />
            <HiddenField name={'invoicepaymentplan.installmentperiodunit'} value={'m'} />
            <HiddenField name={'invoicepaymentplan.initialpaymentdate'} value={moment().format('YYYY-MM-DD')} />
            <HiddenField name={'invoicepaymentplan.explanation'} value={''} />
        </>
    )
}

export default connectField(GetPaymentPlan)