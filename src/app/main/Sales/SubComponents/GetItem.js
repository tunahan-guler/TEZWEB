import { IconButton } from '@material-ui/core'
import { Collapse, TableCell } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { connectField } from 'uniforms'
import { TextField, HiddenField, ListDelField, ErrorField } from 'uniforms-material'
import FolderIcon from '@mui/icons-material/Folder'
import { useGetItemMastersLazyQuery, useGetItemTypesQuery, useGetStocksLazyQuery } from '../../../../generated/graphql'
import { GetItemTypes, MSCMessage } from '../../../../@mscComponnent/Global/GlobalFunc'
import { useTranslation } from 'react-i18next'
import StockSelectionModal from '../../../../@mscComponnent/Modal/StockSelectionModal';
import MSCModal from '../../../../@mscComponnent/Modal/MSCModal'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { showMessage } from '../../../store/fuse/messageSlice'
import { MSCTableCell } from '../../../../@mscComponnent/UniformsComponnents/MSCTableCell'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MSCTableRowField from '../../../../@mscComponnent/UniformsComponnents/MSCTableRowField'
import MSCTableField from '../../../../@mscComponnent/UniformsComponnents/MSCTableField'
import ItemSelectionDialog from '../../../../@mscComponnent/Modal/ItemSelectionDialog'
import StockSelectionDialog from '../../../../@mscComponnent/Modal/StockSelectionDialog'

const GetItem = ({ onChange, value, setSelectedItem, selectedItem, dataTaxes, getViewModeEx }) => {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    const [showItemSelectionModal, setShowItemSelectionModal] = useState(false);
    const [showStockSelectionModal, setShowStockSelectionModal] = useState({ open: false, data: null });
    const [getItemMastersLazyQuery, { data: dataItemMasters, loading: loadingItemMasters }] = useGetItemMastersLazyQuery();
    const [getStocksLazyQuery, { data: dataStocks, loading: loadingStocks }] = useGetStocksLazyQuery();
    const { data: dataItemTypes, loading: loadingItemTypes } = useGetItemTypesQuery();
    const dispatch = useDispatch();
    const user = useSelector(({ auth }) => auth.user)

    const vatCalculation = () => {
        if (getViewModeEx === 2) {
            let vatResult;
            let rate = 0;
            const filteredTaxes = dataTaxes?.filter(dt => dt?.taxcode === selectedItem?.vatcode);
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
            const filteredTaxes = dataTaxes?.filter(dt => dt?.taxcode === selectedItem?.sctcode);
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
                sctCalculation() + vatCalculation() + (value?.unitprice * value?.quantity) - value.discountamount
        })
    }, [vatCalculation(), sctCalculation()])

    const handleCloseItemSelectionModal = () => {
        setShowItemSelectionModal(false);
    }
    const handleCloseStockSelectionModal = () => {
        setShowStockSelectionModal({ open: false, data: null });
    }

    useEffect(() => {
        if (value?.itemcode && getViewModeEx === 2) {
            MSCMessage(dispatch, "warning", "Seçilen ürün için stok seçmeyi unutmayın.");
            onChange({ ...value, 'changetime': moment(), 'createtime': moment() })
        }
    }, [value?.itemcode])

    useEffect(() => {
        let totalReturnedQty = 0;
        value?.invoicedstocks?.map(val => totalReturnedQty += val.returnedqty)
        onChange({ ...value, 'returnedqty': totalReturnedQty })
    }, [value?.invoicedstocks]);

    return (
        < >
            {/* HIDDEN FIELDS */}
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
            {/* <HiddenField name={'createtime'} value={moment().format('HH:MM')} /> */}
            <HiddenField name={'changeuser'} value={user.data.displayName} />
            <HiddenField name={'returnedqty'} value={value?.returnedqty ? value?.returnedqty : 0} />
            {/* <HiddenField name={'changetime'} value={moment().format('HH:MM')} /> */}
            <HiddenField name={'deleted'} value={false} />
            <HiddenField name={'unit'} value={value?.unit} />

            <MSCTableRowField >
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
                                    disabled={getViewModeEx === 2 ? false : true}
                                    size={'small'}
                                    onClick={() => {
                                        if (value.itemtype) {
                                            getItemMastersLazyQuery({
                                                variables: {
                                                    itemtypecode: value.itemtype,
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
                <MSCTableCell name={'unitprice'} disabled={true} value={value?.unitprice?.toFixed(2)} onChange={(e) => onChange({
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
                <MSCTableCell name={'discountamount'} />
                <MSCTableCell name={'vatcode'} disabled={true} />
                <MSCTableCell name={'vatamount'} disabled={true} value={value?.vatamount?.toFixed(2)} />
                <MSCTableCell name={'sctcode'} disabled={true} />
                <MSCTableCell name={'sctamount'} disabled={true} value={value?.sctamount?.toFixed(2)} />
                <MSCTableCell name={'netamount'} disabled={true}
                    value={value?.netamount?.toFixed(2)} />
                <MSCTableCell name={'explanation'} />
                <TableCell align="right" style={{ border: '0.5px solid #DCDCDC', height: '5', padding: 0 }}>
                    <IconButton disabled={value?.stockcontrol === "A" ? false : true} size={'small'}
                        onClick={() => {
                            if (value.quantity) {
                                getStocksLazyQuery({
                                    variables: {
                                        itemCode: { filterType: 'equal', parameter: value?.itemcode },
                                        itemName: { filterType: '', parameter: "" },
                                        serialNo: { filterType: '', parameter: "" },
                                    }
                                }).then((res) => {
                                    if (res.data.stocks.length > 0) {
                                        setShowStockSelectionModal({ open: true, data: value.quantity });
                                    } else {
                                        MSCMessage(dispatch, 'warning', 'Bu ürün için stok bulunmamaktadır.');
                                    }
                                })

                            }
                            else {
                                MSCMessage(dispatch, 'warning', 'Lütfen miktar giriniz.')
                            }
                        }}>
                        <FolderIcon />
                    </IconButton>
                </TableCell>
                <TableCell align="right" style={{ border: '0.5px solid #DCDCDC', height: '5', padding: 0 }} >
                    <ListDelField name="" size={'small'} variant="standard" InputProps={{ disableUnderline: true }}
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
                                    <ListDelField name="" size={'small'} variant="standard"
                                        style={{ padding: "0px 5px", margin: "0px" }} />
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
                    <ErrorField name={'invoicedstocks'} />
                </TableCell>
            </MSCTableRowField>
            <StockSelectionDialog
                showModal={showStockSelectionModal}
                selectedRow={value?.invoicedstocks}
                handleClose={() => {
                    delete value?.invoicedstocks;
                    handleCloseStockSelectionModal();
                }}
                SaveButtonClick={() => {
                    let totalQuantity = 0;
                    value.invoicedstocks.map(val => totalQuantity += val.transqty);
                    if (value.quantity === totalQuantity) {
                        value.invoicedstocks.map(val => {
                            delete val.entrydate; delete val.variant; delete val.variantid; delete val.physicalqty;
                            delete val.itemcodeNavigation; delete val.availableqty; val.returnedqty = 0;
                            totalQuantity += val.transqty
                        })
                        handleCloseStockSelectionModal();
                    } else {
                        MSCMessage(dispatch, 'warning', `Lütfen miktarı tam karşılayın. Miktar : ${value.quantity}`)
                    }
                }}
                SelectRowData={(rowData) => {
                    let RowData;
                    RowData = rowData.map(val => val.original);
                    console.log(RowData, "rwData");
                    if (RowData) {
                        onChange({
                            ...value, invoicedstocks: RowData
                        })
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
                            ...value, itemcode: rowData?.itemcode, unitprice: rowData?.salesprice, sctcode: rowData?.sctcode,
                            vatcode: rowData?.vatcode, pctcode: rowData?.pctcode, unit: rowData?.unitsale,
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