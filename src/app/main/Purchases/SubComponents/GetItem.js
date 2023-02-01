import { IconButton } from '@material-ui/core'
import { Collapse, TableCell } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { connectField } from 'uniforms'
import { TextField, HiddenField, ListDelField, ErrorField } from 'uniforms-material'
import FolderIcon from '@mui/icons-material/Folder'
import { useGetItemMastersLazyQuery, useGetItemTypesQuery } from '../../../../generated/graphql'
import { GetItemTypes, GetTaxes, MSCMessage } from '../../../../@mscComponnent/Global/GlobalFunc'
import { useTranslation } from 'react-i18next'
import AddStockModal from './AddStockModal'
import MSCModal from '../../../../@mscComponnent/Modal/MSCModal'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { showMessage } from '../../../store/fuse/messageSlice'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MSCTableRowField from '../../../../@mscComponnent/UniformsComponnents/MSCTableRowField'
import MSCTableField from '../../../../@mscComponnent/UniformsComponnents/MSCTableField'
import { MSCTableCell } from '../../../../@mscComponnent/UniformsComponnents/MSCTableCell'
import ItemSelectionDialog from '../../../../@mscComponnent/Modal/ItemSelectionDialog'

const GetItem = ({ onChange, value, setSelectedItem, dataTaxes, getViewModeEx }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [showItemSelectionModal, setShowItemSelectionModal] = useState(false);
    const [showAddStockModal, setShowAddStockModal] = useState({ open: false, data: null });
    const [getItemMastersLazyQuery, { data: dataItemMasters, loading: loadingItemMasters }] = useGetItemMastersLazyQuery();
    const user = useSelector(({ auth }) => auth.user);
    const { data: dataItemTypes } = useGetItemTypesQuery();
    const filteredSCT = dataTaxes?.filter(dt => dt?.taxkey === "SCT");
    const filteredVAT = dataTaxes?.filter(dt => dt?.taxkey === "VAT");
    const dispatch = useDispatch();

    const vatCalculation = () => {
        if (getViewModeEx === 2) {
            let vatResult;
            let rate = 0;
            const filteredTaxes = dataTaxes?.filter(dt => dt?.taxcode === value?.vatcode);
            if (filteredTaxes?.length > 0) {
                rate = filteredTaxes[0]?.taxrate;
            }
            vatResult = (parseFloat((value?.unitprice * value?.quantity)
                - (value?.discountamount ? value.discountamount : 0)) * rate / 100).toFixed(2);
            return parseFloat(vatResult);
        } else { return value.vatamount }
    }

    const sctCalculation = () => {
        if (getViewModeEx === 2) {
            let sctResult;
            let rate = 0;
            const filteredTaxes = dataTaxes?.filter(dt => dt?.taxcode === value?.sctcode);
            if (filteredTaxes?.length > 0) {
                rate = filteredTaxes[0]?.taxrate;
            }
            sctResult = (parseFloat(((value?.unitprice * value?.quantity) + vatCalculation()) +
                - (value?.discountamount ? value.discountamount : 0)) * rate / 100).toFixed(2);
            return parseFloat(sctResult);
        } else { return value.sctamount }
    }

    useEffect(() => {
        onChange({
            ...value, 'vatamount': vatCalculation(), 'sctamount': sctCalculation(), 'netamount':
                sctCalculation() + vatCalculation() + (value?.unitprice * value?.quantity)
        })
    }, [vatCalculation(), sctCalculation()])

    const handleCloseItemSelectionModal = () => {
        setShowItemSelectionModal(false);
    }
    const handleCloseAddStockModal = () => {
        setShowAddStockModal({ open: false, data: null });
    }

    useEffect(() => {
        if (value.itemcode && getViewModeEx === 2) {
            MSCMessage(dispatch, 'warning', "Seçilen ürün için stok eklemeyi unutmayın.");
            onChange({ ...value, 'createtime': moment(), 'changetime': moment() })
        }
    }, [value.itemcode])

    return (
        <>
            <HiddenField name={'invoiceno'} value={0} />
            <HiddenField name={'seqno'} value={1} />
            <HiddenField name={'plantid'} value={1} />
            <HiddenField name={'companyid'} value={1} />
            <HiddenField name={'conresproductvariantid'} value={null} />
            <HiddenField name={'conresproductlevelid'} value={null} />
            <HiddenField name={'discountrate'} value={0} />
            <HiddenField name={'discountamount'} value={0} />
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
            {/* <HiddenField name={'createtime'} value={moment().format('HH:MM')} /> */}
            <HiddenField name={'changeuser'} value={user.data.displayName} />
            <HiddenField name={'returnedqty'} value={0} />
            {/* <HiddenField name={'changetime'} value={moment().format('HH:MM')} /> */}
            <HiddenField name={'deleted'} value={false} />
            <HiddenField name={'unit'} value={value?.unit} />
            <MSCTableRowField>
                <TableCell style={{ border: '0.5px solid #DCDCDC', height: '5', padding: 0 }}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
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
                        variant={'standard'}
                        style={{ padding: "0px 5px", margin: "0px" }}
                        disabled
                        InputProps={{
                            disableUnderline: true,
                            endAdornment:
                                <IconButton
                                    size={'small'}
                                    disabled={getViewModeEx === 2 ? false : true}
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
                <MSCTableCell name={'unitprice'} onChange={(e) => onChange({
                    ...value, 'unitprice': e, 'netamount':
                        (e * value?.quantity) - (value?.discountamount ?
                            value?.discountamount : 0) + vatCalculation() + sctCalculation()
                })} />
                <MSCTableCell name='quantity'
                    onChange={(e) => onChange({
                        ...value, 'quantity': e, 'netamount':
                            (e * value?.unitprice) - (value?.discountamount ?
                                value?.discountamount : 0) + vatCalculation() + sctCalculation()
                    })} />
                <MSCTableCell name={'vatcode'} options={getViewModeEx === 2 ? GetTaxes(filteredVAT) : null}
                    disabled={getViewModeEx === 2 ? false : true} />
                <MSCTableCell name={'vatamount'} disabled value={value?.vatamount?.toFixed(2)} />
                <MSCTableCell name={'sctcode'} options={getViewModeEx === 2 ? GetTaxes(filteredSCT) : null}
                    disabled={getViewModeEx === 2 ? false : true} />
                <MSCTableCell name={'sctamount'} disabled value={value?.sctamount?.toFixed(2)} />
                <MSCTableCell name={'netamount'} disabled value={value?.netamount?.toFixed(2)} />
                <MSCTableCell name={'explanation'} />
                <TableCell align="right" style={{ border: '0.5px solid #DCDCDC', height: '5', padding: 0 }}>
                    <IconButton size={'small'} disabled={getViewModeEx === 2 ? false : true}
                        onClick={() => {
                            if (value.quantity) {
                                setShowAddStockModal({ open: true, data: value.quantity });
                            }
                            else {
                                MSCMessage(dispatch, 'warning', 'Lütfen miktar giriniz.')
                            }
                        }}>
                        <FolderIcon />
                    </IconButton>
                </TableCell>
                <TableCell align="center" style={{ border: '0.5px solid #DCDCDC', height: '5', padding: 0 }} >
                    <ListDelField name="" size={'small'} variant="standard"
                        style={{ padding: "0px 5px", margin: "0px" }} />
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
                            <MSCTableRowField name="$" >
                                <MSCTableCell name="itemcode" />
                                <MSCTableCell name="batchno" />
                                <MSCTableCell name="serialno" />
                                <MSCTableCell name="transqty" />
                                <TableCell align="center" style={{ border: '0.5px solid #DCDCDC', height: '5', padding: 0 }} >
                                    <ListDelField name="" size={'small'} variant="standard" InputProps={{ disableUnderline: true }}
                                        style={{ padding: "0px 5px", margin: "0px" }} disabled={true} />
                                </TableCell>
                            </MSCTableRowField>
                        </MSCTableField>
                    </Collapse>
                </TableCell>
            </MSCTableRowField>
            <MSCTableRowField>
                <TableCell style={{ border: '0.5px solid #DCDCDC', height: '0', padding: '0px 16px 0px 16px' }} padding='0' colSpan={'100%'}>
                    <ErrorField name={'itemtype'} />
                    <ErrorField name={'itemcode'} />
                    <ErrorField name={'quantity'} />
                    <ErrorField name={'sctcode'} />
                    <ErrorField name={'vatcode'} />
                    <ErrorField name={'invoicedstocks'} />
                </TableCell>
            </MSCTableRowField>

            <AddStockModal
                showModal={showAddStockModal}
                handleClose={handleCloseAddStockModal}
                itemname={value?.itemname}
                itemcode={value?.itemcode}
                selectedRow={value?.invoicedstocks}
                saveButtonClick={() => {
                    let count = 0;
                    let totalQuantity = 0;
                    value?.invoicedstocks?.map(val => {
                        totalQuantity += val.transqty
                        if (val.batchno) {
                            count++;
                        }
                    })
                    if (count === value?.invoicedstocks?.length) {
                        if (totalQuantity === value.quantity) {
                            handleCloseAddStockModal();
                        }
                        else {
                            MSCMessage(dispatch, "warning", `Lütfen miktarı tam karşılayın. Miktar : ${value.quantity}`)
                        }
                    } else {
                        MSCMessage(dispatch, 'warning', "Lütfen parti numarası giriniz.");
                    }
                }}
                exitButtonClick={() => {
                    handleCloseAddStockModal();
                    if (value?.invoicedstocks) {
                        onChange({ ...value, 'invoicedstocks': [] })
                    }
                }}
            />
            <ItemSelectionDialog
                showModal={showItemSelectionModal}
                handleClose={handleCloseItemSelectionModal}
                SelectRowData={(rowData) => {
                    if (rowData) {
                        setSelectedItem(rowData);
                        onChange({
                            ...value, itemcode: rowData?.itemcode, sctcode: rowData?.sctcode,
                            vatcode: rowData?.vatcode, pctcode: rowData?.pctcode,  unit: rowData?.unitsale,
                            stockcontrol: rowData?.stockcontrol,
                        })
                        handleCloseItemSelectionModal();
                    }
                }}
            />

        </>
    )
}

export default connectField(GetItem)