import React from 'react'
import { connectField } from 'uniforms'
import { HiddenField} from 'uniforms-material'
import moment from 'moment'
import { useSelector } from 'react-redux'

const GetItem = () => {
    const user = useSelector(({ auth }) => auth.user)
    return (
        <>
           <HiddenField name={'invoiceds.0.invoiceno'} value={0} />
            <HiddenField name={'invoiceds.0.seqno'} value={1} />
            <HiddenField name={'invoiceds.0.plantid'} value={1} />
            <HiddenField name={'invoiceds.0.companyid'} value={1} />
            <HiddenField name={'invoiceds.0.conresproductvariantid'} value={null} />
            <HiddenField name={'invoiceds.0.conresproductlevelid'} value={null} />
            <HiddenField name={'invoiceds.0.discountrate'} value={0} />
            <HiddenField name={'invoiceds.0.discountamount'} value={0} />
            <HiddenField name={'invoiceds.0.pctcode'}/>
            <HiddenField name={'invoiceds.0.pctamount'} value={0} />
            <HiddenField name={'invoiceds.0.deliverynoteno'} value={0} />
            <HiddenField name={'invoiceds.0.deliverynoteseqno'} value={0} />
            <HiddenField name={'invoiceds.0.orderid'} value={0} />
            <HiddenField name={'invoiceds.0.orderseqno'} value={0} />
            <HiddenField name={'invoiceds.0.warehouseid'} value={0} />
            <HiddenField name={'invoiceds.0.locationid'} value={0} />
            <HiddenField name={'invoiceds.0.matdocno'} value={""} />
            <HiddenField name={'invoiceds.0.matdocyear'} value={0} />
            <HiddenField name={'invoiceds.0.incotermcode'} value={""} />
            <HiddenField name={'invoiceds.0.packagingtypecode'} value={""} />
            <HiddenField name={'invoiceds.0.packagenumber'} value={""} />
            <HiddenField name={'invoiceds.0.packagecount'} value={0} />
            <HiddenField name={'invoiceds.0.transportmodecode'} value={0} />
            <HiddenField name={'invoiceds.0.createuser'} value={user.data.displayName} />
            <HiddenField name={'invoiceds.0.createtime'} value={moment().format()} />
            <HiddenField name={'invoiceds.0.changeuser'} value={user.data.displayName} />
            <HiddenField name={'invoiceds.0.changetime'} value={moment().format()} />
            <HiddenField name={'invoiceds.0.deleted'} value={false} />
            <HiddenField name={'invoiceds.0.unit'} />
            <HiddenField name={'invoiceds.0.itemtype'} value={'E'}/>
        </>
    )
}

export default connectField(GetItem)