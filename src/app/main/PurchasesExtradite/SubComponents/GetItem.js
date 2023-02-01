import { Collapse, IconButton } from '@material-ui/core'
import { TableCell } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { connectField } from 'uniforms'
import { TextField, HiddenField, ListDelField } from 'uniforms-material'
import FolderIcon from '@mui/icons-material/Folder'
import { useGetItemMastersLazyQuery, useGetItemTypesQuery } from '../../../../generated/graphql'
import { GetItemTypes } from '../../../../@mscComponnent/Global/GlobalFunc'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { showMessage } from '../../../store/fuse/messageSlice'
import { MSCTableCell } from '../../../../@mscComponnent/UniformsComponnents/MSCTableCell'
import MSCTableRowField from '../../../../@mscComponnent/UniformsComponnents/MSCTableRowField'
import MSCTableField from '../../../../@mscComponnent/UniformsComponnents/MSCTableField'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import GetInvoicedStocks from './GetInvoicedStocks'

const GetItem = ({ onChange, value, getViewModeEx }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(true);
    const [showItemSelectionModal, setShowItemSelectionModal] = useState(false);
    const [getItemMastersLazyQuery, { data: dataItemMasters }] = useGetItemMastersLazyQuery();
    const { data: dataItemTypes } = useGetItemTypesQuery();
    const dispatch = useDispatch();
    const user = useSelector(({ auth }) => auth.user)

    useEffect(() => {
        onChange({ ...value, 'changetime': moment(), 'createtime': moment() });
    }, [])

    return (
        <>
            <HiddenField name={'invoiceno'} value={0} />
            <HiddenField name={'seqno'} value={1} />
            <HiddenField name={'plantid'} value={1} />
            <HiddenField name={'companyid'} value={1} />
            <HiddenField name={'conresproductvariantid'} value={null} />
            <HiddenField name={'conresproductlevelid'} value={null} />
            <HiddenField name={'discountrate'} value={0} />
            <HiddenField name={'discountamount'} value={value?.discountamount ? value?.discountamount : 0} />
            <HiddenField name={'pctcode'} />
            <HiddenField name={'pctamount'} value={0} />
            <HiddenField name={'deliverynoteno'} value={0} />
            <HiddenField name={'deliverynoteseqno'} value={0} />
            <HiddenField name={'orderid'} value={0} />
            <HiddenField name={'orderseqno'} value={0} />
            <HiddenField name={'warehouseid'} value={0} />
            <HiddenField name={'locationid'} value={0} />
            <HiddenField name={'matdocno'} value={""} />
            <HiddenField name={'matdocyear'} value={0} />
            <HiddenField name={'incotermcode'} value={""} />
            <HiddenField name={'packagingtypecode'} value={""} />
            <HiddenField name={'packagenumber'} value={""} />
            <HiddenField name={'packagecount'} value={0} />
            <HiddenField name={'transportmodecode'} value={0} />
            <HiddenField name={'createuser'} value={user.data.displayName} />
            <HiddenField name={'changeuser'} value={user.data.displayName} />
            <HiddenField name={'deleted'} value={false} />
            <HiddenField name={'unit'} />
            {value.invoicedstocks.map((val, index) =>
                <><HiddenField name={`invoicedstocks.${index}.id`} value={0} />
                    <HiddenField name={`invoicedstocks.${index}.invoiceno`} value={0} />
                </>)}
            <MSCTableRowField >
                <TableCell style={{ border: '0.5px solid #DCDCDC', height: '5', padding: 0 }}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        style={{ padding: "0px 5px", margin: "0px" }}
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                    </IconButton>
                </TableCell>
                <MSCTableCell name="itemtype" options={GetItemTypes(dataItemTypes)} onChange={(e) => onChange({ ...value, 'itemtype': e })} />
                <TableCell style={{ border: '0.5px solid #DCDCDC', height: '5', padding: 0 }} >
                    <TextField
                        label={null}
                        name="itemcode"
                        disabled
                        variant={'standard'}
                        style={{ padding: "0px 5px", margin: "0px" }}
                        InputProps={{
                            disableUnderline: true,
                            endAdornment:
                                <IconButton
                                    size={'small'}
                                    style={{ padding: "0px 5px", margin: "0px" }}
                                    onClick={() => {
                                        if (value.itemtype) {
                                            getItemMastersLazyQuery({
                                                variables: {
                                                    itemtypecode: value.itemtype
                                                }
                                            });
                                            setShowItemSelectionModal(true);
                                        }
                                        else {
                                            dispatch(
                                                showMessage({
                                                    message: 'Ürün tipi seçiniz.',
                                                    autoHideDuration: 6000,
                                                    anchorOrigin: {
                                                        vertical: 'top',
                                                        horizontal: 'right'
                                                    },
                                                    variant: 'warning'
                                                }))
                                        }
                                    }}>
                                    <FolderIcon />
                                </IconButton>
                        }}
                    />
                </TableCell>
                <MSCTableCell name={'unitprice'} disabled value={value?.unitprice?.toFixed(2)} />
                <MSCTableCell name='quantity'
                    onChange={(e) => onChange({
                        ...value, 'quantity': e, 'netamount':
                            (e * value?.unitprice) - (value?.discountamount ?
                                value?.discountamount : 0) + vatCalculation() + sctCalculation()
                    })} />
                <MSCTableCell name={'discountamount'} disabled value={value?.discountamount?.toFixed(2)} />
                <MSCTableCell name={'vatcode'} disabled />
                <MSCTableCell name={'vatamount'} disabled value={value?.vatamount?.toFixed(2)} />
                <MSCTableCell name={'sctcode'} disabled />
                <MSCTableCell name={'sctamount'} disabled value={value?.sctamount?.toFixed(2)} />
                <MSCTableCell name={'netamount'} disabled value={value?.netamount?.toFixed(2)} />
                <MSCTableCell name={'explanation'} />
                <TableCell align={'center'} style={{
                    border: '0.5px solid #DCDCDC', height: '5', padding: 0,
                    backgroundColor: value?.quantity - value?.returnedqty === 0 ? '#ffcccb' : null
                }} >
                    <ListDelField name="" size={'small'} variant="standard" style={{ padding: "0px 5px", margin: "0px" }}
                        disabled={(value?.quantity - value?.returnedqty === 0 || getViewModeEx === 3) ? true : false} />
                </TableCell>
            </MSCTableRowField>
            <MSCTableRowField >
                <TableCell style={{ border: '0.5px solid #DCDCDC', height: '0', padding: '0px 16px 0px 16px' }} padding='0' colSpan={'100%'}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <MSCTableField
                            name="invoicedstocks"
                            columns={[t('itemcode'), t('batchno'), t('serialno'), t('transqty')]}
                            addIcon={null}
                            disabled={true}
                        >
                            <GetInvoicedStocks name={'$'} getViewModeEx={getViewModeEx} />
                        </MSCTableField>
                    </Collapse>
                </TableCell>
            </MSCTableRowField>

        </>
    )
}

export default connectField(GetItem)