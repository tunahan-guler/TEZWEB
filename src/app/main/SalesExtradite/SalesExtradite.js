import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from "@mui/icons-material/Menu"
import { useTranslation } from 'react-i18next';
import MSCToolbar, { ViewMode } from '../../../@mscComponnent/CRUDPage/MSCToolbar'
import { AutoForm, HiddenField, ErrorField } from 'uniforms-material';
import { bridge as schema } from '../../../@mscComponnent/UniformsSchema/InvoiceHSchema';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { changeViewMode, getViewMode, getViewModeFunc } from '../../store/mscToolbar/mscToolbarSlice'
import { GetCurrencies, GetInvoiceType, GetRowAndColumn, isMobile, MSCCurrencyFormatter, MSCMessage } from '../../../@mscComponnent/Global/GlobalFunc'
import {
    AddOrUpdateEnum, useAddOrUpdateInvoiceHMutation, useGetAcAccountDocumentHLazyQuery, useGetCurrenciesQuery,
    useGetInvoiceTypesQuery, useDeleteInvoicehMutation, useGetInvoicehWithFilterForReturnLazyQuery
} from '../../../generated/graphql';
import GetItem from './SubComponents/GetItem'
import { Card, CardContent, Grid, Typography } from '@mui/material';
import MSCTableField from '../../../@mscComponnent/UniformsComponnents/MSCTableField'
import moment from 'moment'
import { MSCReactTable } from '../../../@mscComponnent/MSCReactTable/MSCReactTable';
import TextLabelField from '../../../@mscComponnent/UniformsComponnents/TextLabelField'
import AutoLabelField from '../../../@mscComponnent/UniformsComponnents/AutoLabelField';
import MSCListItemField from '../../../@mscComponnent/UniformsComponnents/MSCTableRowField'
import GetMovementHistory from './SubComponents/GetMovementHistory'
import FuseLoading from '../../../@fuse/core/FuseLoading'
import ConfirmModal from '../../../@mscComponnent/Modal/ConfirmModal';
import MSCDateLabelField from '../../../@mscComponnent/UniformsComponnents/MSCDateLabelField'
import MaterialUiGridComp from '../../../@mscComponnent/MaterialuiGrid/MaterialUiGridComp';
import MSCTextField from '../../../@mscComponnent/MSCInput/MSCTextField';
import MSCLookup from '../../../@mscComponnent/MSCInput/MSCLookup';
import Loading from '../../../@mscComponnent/Loading'
import MSCButton from '../../../@mscComponnent/Buttons/MSCButton'

const dates = {
    changetime: moment(),
    createtime: moment(),
    eiSendingtime: moment(),
    invdate: moment(),
    invtime: moment(),
    maturitydate: moment(),
}

function SalesExtradite() {
    const { t } = useTranslation();
    const getViewModeFuncEx = useSelector(getViewModeFunc);
    const dispatch = useDispatch();
    const ref_autoForm = useRef();
    const [getInvoicehWithFilterForReturn, { data, loading, error, refetch }] = useGetInvoicehWithFilterForReturnLazyQuery();
    const user = useSelector(({ auth }) => auth.user)
    const period = moment().format("YYYY-MM").replace('-', '');
    const acJSON = [{
        accdocno: "0",//Prosedürden gelecek
        accdoctype: 5,
        accdocyear: 0,//Prosedürden gelecek
        accountcode: "",
        companyid: 1,
        invoiceno: 0,
        accountclassid: 1,
        changetime: moment(),
        changeuser: user.data.displayName,
        createtime: moment(),
        createuser: user.data.displayName,
        currency: "TRY",
        currencylc: "TRY",
        deleted: false,
        docdate: moment(),
        exchangedate: moment(),
        exchangerate: 1,
        explanation: "",
        period: parseInt(period),
        plantid: 1,
        referenceno: "",
    }]
    const [dataAcAccountDocumenth, setDataAcAccountDocumenth] = useState(null);
    const [getAcAccountDocumentHLazyQuery, { data: dataAcAccountDocH, loading: loadingAcAccountDocH }] = useGetAcAccountDocumentHLazyQuery({
        onCompleted: res => setDataAcAccountDocumenth(res?.acAccountdocumenths)
    });
    const [searchText, setSearchText] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const getViewModeEx = useSelector(getViewMode); // 18042022 
    const [filterGlobal, setFilterGlobal] = useState();
    const [addOrUpdate, setAddOrUpdate] = useState(AddOrUpdateEnum.Add)
    const [rowData, setRowData] = useState({})
    const [selectedData, setSelectedData] = useState({});
    const [isReturnedAll, setIsReturnedAll] = useState(false);
    const { data: dataInvoiceTypes } = useGetInvoiceTypesQuery({
        variables: {
            prmType: "Satış"
        }
    });
    const [filterParams, setFilterParams] = useState({
        invoiceno: 0,
        eino: "",
        starttime: null,
        endtime: null,
        invoicetype: "",
    })
    const [addOrUpdateInvoiceHMutation, { data: dataMutation, error: ErrorMutation, loading: loadingMutation }] = useAddOrUpdateInvoiceHMutation();
    const [deleteInvoicehMutation, { data: deleteMutationData }] = useDeleteInvoicehMutation();
    const { data: dataCurrencies } = useGetCurrenciesQuery();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const visibleColumns = ['invoiceno', 'referenceno', 'eiNo', "invoicetype", "stakeholdercode",
        "stakeholdername", "invdate", "gtotalamount", "paidamount"]
    let gridData = GetRowAndColumn(data?.invoicehWithFilterForReturn, visibleColumns);
    let subTotal = 0;
    let vatamount = 0;
    let sctamount = 0;
    let discountAmount = 0
    let totalCollectionAmount = 0;
    
    console.log(dataAcAccountDocumenth,"s")

    useEffect(() => {
        if (getViewModeEx === 3) {
            // Ekranı yavaslatıyor
            getAcAccountDocumentHLazyQuery({
                variables: {
                    prmInvoiceNo: selectedData?.invoiceno,
                    prmDocType: 1
                }
            });
        }
        else if (getViewModeEx === 1) {
            setRowData({});
        }
        if (selectedData && Object.keys(selectedData)?.length > 0) {
            if (selectedData.invoiceds.length > 0) {
                let total = 0;
                selectedData?.invoiceds?.map(val => total += (val.quantity - val.returnedqty));
                if (total === 0) {
                    setIsReturnedAll(true);
                } else {
                    setIsReturnedAll(false);
                }
            } else {
                setIsReturnedAll(false);
            }
        }
        totalCollectionAmount = 0;
    }, [selectedData, getViewModeEx]);

    useEffect(() => {
        if (dataAcAccountDocumenth && getViewModeEx === 3) {
            ref_autoForm.current.change('acAccountdocumenths', dataAcAccountDocumenth);
        }
    }, [dataAcAccountDocumenth, getViewModeEx])


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        filterGlobal?.setGlobalFilter(searchText)
    }, [searchText])

    for (let i = 0; i < rowData?.invoiceds?.length; i++) {
        if (rowData?.invoiceds[i]?.netamount)
            subTotal += rowData?.invoiceds[i]?.unitprice * rowData?.invoiceds[i]?.quantity;
    }

    for (let i = 0; i < rowData?.invoiceds?.length; i++) {
        if (rowData?.invoiceds[i]?.vatamount) {
            vatamount += rowData?.invoiceds[i]?.vatamount
        }
    }

    for (let i = 0; i < rowData?.invoiceds?.length; i++) {
        if (rowData?.invoiceds[i]?.sctamount) {
            sctamount += rowData?.invoiceds[i]?.sctamount
        }
    }

    const gTotalCalculation = () => {
        let gTotalAmount = 0;
        gTotalAmount = (subTotal - discountAmount + sctamount + vatamount);
        return parseFloat(gTotalAmount);
    }

    for (let i = 0; i < rowData?.acAccountdocumenths?.length; i++) {
        totalCollectionAmount += rowData?.acAccountdocumenths[i].amount;
    }

    useEffect(() => {
        if (loadingAcAccountDocH) {
            Loading.show();
        } else {
            Loading.hide();
        }
    }, [loadingAcAccountDocH])

    const AddOrUpdate = (model, addOrUpdateStatus) => {
        addOrUpdateInvoiceHMutation({
            variables: {
                addOrUpdate: addOrUpdateStatus,
                prmInvoiceH: model,
                prmInvoiceno: selectedData?.invoiceno
            }
        }).then(res => {
            console.log(res, "res");
            if (res.data.addOrUpdateInvoiceH.resultType === "SUC") {
                MSCMessage(dispatch, 'success', "Kaydedildi.")
                setRowData({});
                setSelectedData({});
                getViewModeFuncEx(ViewMode.Read);
                dispatch(changeViewMode(ViewMode.Read))
                refetch();
            } else {
                MSCMessage(dispatch, 'error', res.data.addOrUpdateInvoiceH.messageText)
                setRowData({});
                setSelectedData({});
                getViewModeFuncEx(ViewMode.Read);
                dispatch(changeViewMode(ViewMode.Read))
            }
        })
            .catch(err => console.log(err, "err"));
    }

    const ViewButtonClick = (prmRowData, addOrUpdateStatus) => {
        setAddOrUpdate(addOrUpdateStatus); // kayıt modu belirleme
        getViewModeFuncEx(ViewMode.Update)
        dispatch(changeViewMode(ViewMode.Update))
        const state = prmRowData;
        delete state?.acAccountdocumenths;
        setSelectedData(state);
        handleClose();
    }

    const MenuButtonClick = (prmRowData, addOrUpdateStatus) => {
        setAddOrUpdate(addOrUpdateStatus); // kayıt modu belirleme
        getViewModeFuncEx(ViewMode.Create)
        dispatch(changeViewMode(ViewMode.Create))
        const state = prmRowData;
        delete state?.explanation;
        delete state?.discountamount;
        delete state?.maturitydate;
        delete state?.acAccountdocumenths;
        setSelectedData(state);
        handleClose();
    };

    const dataRow = React.useMemo(
        () => gridData.rows,
        [gridData?.rows?.length, data]
    );

    if (loading || loadingMutation) {
        return <FuseLoading />
    }

    const onDeleteButtonClick = () => {
        setShowDeleteModal(true);
    }

    const onDeleteModalButtonClick = (invoiceno) => {
        deleteInvoicehMutation({
            variables: {
                prmInvoiceNo: invoiceno
            }
        })
            .then(res => {
                if (res.data.deleteInvoiceh.resultType === "SUC") {
                    MSCMessage(dispatch, 'success', "Kaydedildi.")
                    setRowData({});
                    setSelectedData({});
                    getViewModeFuncEx(ViewMode.Read);
                    dispatch(changeViewMode(ViewMode.Read))
                    refetch();
                } else {
                    MSCMessage(dispatch, 'error', "Hata Oluştu.");
                }
            })
            .catch(err => console.log(err, "err"))
    }

    const GetInvoicehForReturn = () => {
        getInvoicehWithFilterForReturn({
            variables: {
                prmEino: filterParams.eino,
                prmInvoiceno: parseInt(filterParams.invoiceno),
                prmInvoiceType: filterParams.invoicetype === "" ? "SA" : filterParams.invoicetype,
                prmInvoiceType2: filterParams.invoicetype === "" ? "SR" : "",
                prmStartDate: filterParams.starttime,
                prmEndDate: filterParams.endtime
            }
        })
        setFilterParams({
            eino: "",
            endtime: null,
            invoiceno: 0,
            invoicetype: "",
            starttime: null
        })
    }

    console.log(selectedData,"selectedDAta");

    return (
        <AutoForm
            ref={ref_autoForm}
            schema={schema}
            model={{ ...selectedData, ...dates }}
            onChangeModel={(model) => {
                setRowData(model);
                if (model?.invdate && getViewModeEx === 2) {
                    const dtNow = moment().startOf('days');
                    let difference = dtNow.diff(moment(model?.invdate).startOf('days'), 'days');
                    if (difference > 7) {
                        MSCMessage(dispatch, "warning", t('YouCannotBillMoreThan1WeekRetrospectively'))
                        model.invdate = moment();
                    }
                    if (difference < 0) {
                        MSCMessage(dispatch, "warning", t('YouCannotBillForward'));
                        model.invdate = moment();
                    }
                }
            }}
            onSubmit={model => {
                delete model.stakeholder;
                delete model.invoicepaymentplan;
                delete model.invoicepaymentplanlines;
                acJSON[0] = Object.assign(acJSON[0], {
                    amount: gTotalCalculation(), stakeholderid: selectedData?.stakeholderid, amountlc: gTotalCalculation()
                })
                model = Object.assign(model, { acAccountdocumenths: [...acJSON] });
                let deleteIndexes = [];
                for (let i = 0; i < model?.invoiceds?.length; i++) {
                    let indexes = []
                    if (model?.invoiceds[i].quantity !== model?.invoiceds[i].returnedqty) {
                        for (let j = 0; j < model?.invoiceds[i]?.invoicedstocks?.length; j++) {
                            if (model?.invoiceds[i]?.invoicedstocks[j]?.returnedqty === model?.invoiceds[i]?.invoicedstocks[j]?.transqty) {
                                const index = model.invoiceds[i].invoicedstocks.findIndex(a => a.serialno === model.invoiceds[i].invoicedstocks[j].serialno);
                                indexes.push(index)
                            }
                        }
                        for (let a = indexes.length - 1; a >= 0; a--) {
                            model?.invoiceds[i]?.invoicedstocks.splice(indexes[a], 1);
                        }
                    } else {
                        const index = model.invoiceds.findIndex(a => a.itemcode === model.invoiceds[i].itemcode);
                        deleteIndexes.push(index);
                    }
                }
                for (let b = deleteIndexes.length - 1; b >= 0; b--) {
                    model?.invoiceds?.splice(deleteIndexes[b], 1);
                }
                console.log(model, "sybmitted")
                AddOrUpdate(model, addOrUpdate);
            }} >
            <MSCToolbar
                filterSearch={setSearchText}
                headerName={t('SalesExtradite')}
                queryList={GetInvoicehForReturn}
                hideSubmitButton={getViewModeEx === 3 && true}
                SubmitComponnent={
                    getViewModeEx === 3 ?
                        <MSCButton title={'Delete'}
                            onClick={() => { onDeleteButtonClick() }}
                        /> : null}
                ReadModeHeaderComponnent={<div>
                    <MSCButton title={'Search'} onClick={() =>  {getViewModeFuncEx(ViewMode.Search)
                            dispatch(changeViewMode(ViewMode.Search))}}/>
                    <MSCButton title={'View'}
                        disabled={selectedData ? ((Object.keys(selectedData)?.length > 0 ? false : true)) : true}
                        onClick={() => { ViewButtonClick(selectedData, AddOrUpdateEnum.Update) }}
                    />
                    <Button
                        className="whitespace-nowrap mx-4"
                        variant={'contained'}
                        color={'secondary'}
                        startIcon={<MenuIcon />}
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        {t('Transactions')}
                    </Button>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        onBackdropClick={handleClose}
                    >
                        <MenuItem onClick={() => { MenuButtonClick(selectedData, AddOrUpdateEnum.Add) }}
                            disabled={selectedData?.invoicetype === "SA" ? isReturnedAll : true}
                        >{t('SalesExtradite')}</MenuItem>
                    </Menu>
                </div>}
                ReadComponnent={
                    <div style={{ width: '100%' }}>
                        <MSCReactTable
                            selection
                            columns={[
                                { accessor: 'invoiceno', Header: t('invoiceno') },
                                { accessor: 'referencedocno', Header: t('ReferenceNo') },
                                { accessor: 'eiNo', Header: t('eiNo') },
                                {
                                    accessor: (row) => {
                                        if (row.invoicetype === "SA") { return t('SaleInvoice') }
                                        else { return t('SalesExtradite') }
                                    },
                                    Header: t('invoicetype')
                                },
                                { accessor: (row) => { return row.stakeholder.stakeholdercode }, Header: t('stakeholdercode') },
                                { accessor: (row) => { return row.stakeholder.stakeholdername }, Header: t('stakeholdername') },
                                { accessor: (row) => { return moment(row.invdate).format('DD-MM-YYYY') }, Header: t('invdate') },
                                { accessor: (row) => { return MSCCurrencyFormatter(row?.gtotalamount,rowData?.currency) }, Header: t('gtotalamount') },
                                { accessor: (row) => { return MSCCurrencyFormatter(row?.paidamount,rowData?.currency) }, Header: t('collectionAmount') },
                            ]}
                            data={dataRow}
                            SelectRowData={(e) => {
                                setSelectedData(e)
                            }}
                            globalFilterTable={(preGlobalFilteredRows, setGlobalFilter, globalFilter) => {
                                setFilterGlobal({ ...filterGlobal, setGlobalFilter })
                            }}
                        />
                    </div>
                }
                SearchComponent={
                    <MaterialUiGridComp
                        children={[
                            <MSCLookup options={GetInvoiceType(dataInvoiceTypes)} label={t('invoicetype')}
                                onChange={(e) => setFilterParams({ ...filterParams, invoicetype: e.target.value })} />,
                            <MSCTextField label={t('invoiceno')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, invoiceno: e.target.value })} />,
                            <MSCTextField label={t('eiNo')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, eino: e.target.value })} />,
                            <MSCTextField type={'date'} label={t('starttime')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, starttime: e.target.value })} />,
                            <MSCTextField type={'date'} label={t('endtime')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, endtime: e.target.value })} />
                        ]}
                    />
                }
                CreateOrUpdateComponnent={
                    <div>
                        {/* Hidden Fields */}
                        <>
                            <HiddenField name={'discountamount'} value={discountAmount} />
                            <HiddenField name={'gtotalamount'} value={gTotalCalculation()} />
                            <HiddenField name="stakeholderid" />
                            <HiddenField name="shadbookid" />
                            <HiddenField name={'changeuser'} value={user.data.displayName} />
                            <HiddenField name={'createuser'} value={user.data.displayName} />
                            <HiddenField name={'invoicedoctype'} value={"SR"} />
                            <HiddenField name={'invoicetype'} value={"SR"} />
                            <HiddenField name={'invoiceno'} value={0} />
                        </>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                <Card>
                                    <CardContent>
                                        <Grid container spacing={1}>
                                            <ErrorField name={'stakeholder'} />
                                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                                <TextLabelField
                                                    name={'stakeholder.stakeholdername'}
                                                    label={t('stakeholdername')}
                                                    value={rowData?.stakeholder?.stakeholdername}
                                                    disabled
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                                <MSCDateLabelField name="invdate"
                                                    label={t('invdate')}
                                                    value={moment(rowData?.invdate).format('YYYY-MM-DD')}
                                                    disabled={getViewModeEx === 2 ? false : true} />
                                            </Grid>
                                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                                <AutoLabelField name="stakeholder.stakeholdercode"
                                                    label={t('stakeholdercode')} disabled />
                                            </Grid>
                                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                                <AutoLabelField name="currency" options={GetCurrencies(dataCurrencies)} disabled label={t('currency')} />
                                            </Grid>
                                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                                <AutoLabelField name="stakeholder.taxno" disabled label={t('taxno')} />
                                            </Grid>
                                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                                <AutoLabelField name="stakeholder.shadbook.address" disabled label={t('address')} />
                                            </Grid>
                                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                                <AutoLabelField name="referencedocno" label={t('ReferenceNo')}
                                                    disabled={getViewModeEx === 2 ? false : true} />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                <Card >
                                    <CardContent>
                                        <Typography variant={'h6'}>{t('invoiceds')}</Typography>
                                        <ErrorField name={'invoiceds'} />
                                        <Grid item xs={12} sm={12} lg={12} md={12}>
                                            <MSCTableField
                                                name="invoiceds"
                                                addIcon={null}
                                                columns={['', `${t('itemtype')}`, `${t('itemcode')}`, `${t('unitprice')}`,
                                                    `${t('quantity')}`, `${t('discountamount')}`, `${t('vatcode')}`, `${t('vatamount')}`,
                                                    `${t('sctcode')}`, `${t('sctamount')}`, `${t('netamount')}`, `${t('explanation')}`, '']}
                                                disabled={getViewModeEx === 2 ? false : true}
                                            >
                                                <GetItem name={'$'} getViewModeEx={getViewModeEx} />
                                            </MSCTableField>
                                            <div style={{ width: isMobile() ? '80%' : '40%', float: "right" }}>
                                                <div >
                                                    <div style={{ textAlign: "left", width: '45%', float: 'left' }} >
                                                        <p style={{ marginBottom: '10%' }}>{t('SubTotal')}</p>
                                                        <p style={{ marginBottom: '8%' }}>{t('TotalDiscount')}</p>
                                                        <p style={{ marginBottom: '8%' }}>{t('vatcode')}</p>
                                                        <p style={{ marginBottom: '8%' }}>{t('sctcode')}</p>
                                                        <p style={{ marginBottom: '8%' }}>{t('gTotal')}</p>
                                                    </div>
                                                    <div style={{ textAlign: "right", width: '45%', float: 'right' }} >
                                                        <p>{MSCCurrencyFormatter(subTotal)}</p>
                                                        <div style={{
                                                            marginBottom: '10%', overflow: "hidden",
                                                            width: '100%',
                                                        }}>
                                                        </div>
                                                        <p style={{ marginBottom: '8%' }}>{MSCCurrencyFormatter(discountAmount)}</p>
                                                        <p style={{ marginBottom: '8%' }}>{MSCCurrencyFormatter(vatamount)}</p>
                                                        <p style={{ marginBottom: '8%' }}>{MSCCurrencyFormatter(sctamount)}</p>
                                                        <p style={{ marginBottom: '8%' }}>{MSCCurrencyFormatter(gTotalCalculation())}</p>
                                                    </div>
                                                </div>
                                            </div>

                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                <Card >
                                    <CardContent>
                                        <Typography variant={'h6'}>{t('explanation')}</Typography>
                                        <ErrorField name={'explanation'} />
                                        <AutoLabelField name={'explanation'} label={t('explanation')} disabled={getViewModeEx === 2 ? false : true} />
                                    </CardContent>
                                </Card>
                            </Grid>
                            {
                                getViewModeEx === 3 && selectedData?.invoicetype === "SA" ?
                                    <Grid item xs={12} sm={12} lg={12} md={12}>
                                        <Card >
                                            <CardContent>
                                                <Typography variant={'h6'} style={{ marginBottom: '2%' }}>{t('collectionhistory')}</Typography>
                                                <MSCTableField
                                                    name="acAccountdocumenths"
                                                    columns={[t('docdate'), t('accdocno'), t('amountlc'), t('currencylc')]}
                                                    disabled={true}
                                                    addIcon={null}
                                                >
                                                    <MSCListItemField name="$">
                                                        <GetMovementHistory dataCurrencies={dataCurrencies} />
                                                    </MSCListItemField>
                                                </MSCTableField>
                                                <Typography style={{ float: 'right', padding: '2%' }} variant='subtitle1'
                                                    fontWeight={'bold'}>{t('TotalCollectionAmount')} : {MSCCurrencyFormatter(totalCollectionAmount,rowData?.currency)}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    : null}
                        </Grid>
                    </div>
                }
            />
            <ConfirmModal
                handleClose={() => { setShowDeleteModal(false) }}
                showModal={showDeleteModal}
                onYesButtonClick={() => onDeleteModalButtonClick(selectedData?.invoiceno)}
            />
        </AutoForm>
    );
}

export default SalesExtradite; 