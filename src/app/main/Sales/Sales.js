import { useTranslation } from 'react-i18next';
import MSCToolbar, { ViewMode } from '../../../@mscComponnent/CRUDPage/MSCToolbar'
import { AutoForm, HiddenField, ErrorField } from 'uniforms-material';
import { bridge as schema } from './uniforms/SalesSchema';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { changeViewMode, getViewMode, getViewModeFunc } from '../../store/mscToolbar/mscToolbarSlice'
import { showMessage } from '../../store/fuse/messageSlice'
import { GetCurrencies, GetRowAndColumn, isMobile, MSCCurrencyFormatter, MSCMessage } from '../../../@mscComponnent/Global/GlobalFunc'
import {
    AddOrUpdateEnum, useAddOrUpdateInvoiceHMutation, useGetTaxesLazyQuery, useGetAcAccountDocumentHLazyQuery,
    useGetInvoiceHByInvoiceNoLazyQuery, useGetCurrenciesQuery, useDeleteInvoicehMutation, useGetInvoicehWithFilterLazyQuery
} from '../../../generated/graphql';
import GetItem from './SubComponents/GetItem';
import { Card, CardContent, Grid, Paper, Stack, Typography } from '@mui/material';
import { Button, IconButton } from '@material-ui/core';
import StakeholderSelectionModal from '../../../@mscComponnent/Modal/StakeholderSelectionModal';
import moment from 'moment';
import AddIcon from '@mui/icons-material/Add'
import PaymentInfoModal from './SubComponents/PaymentInfoModal';
import MSCTableField from '../../../@mscComponnent/UniformsComponnents/MSCTableField'
import MSCListItemField from '../../../@mscComponnent/UniformsComponnents/MSCTableRowField'
import GetPaymentPlanLine from './SubComponents/GetPaymentPlanLine';
import GetMovementHistory from './SubComponents/GetMovementHistory';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser'
import SalesCollectionModal from './SubComponents/SalesCollectionModal';
import { MSCReactTable } from '../../../@mscComponnent/MSCReactTable/MSCReactTable';
import AutoLabelField from '../../../@mscComponnent/UniformsComponnents/AutoLabelField';
import TextLabelField from '../../../@mscComponnent/UniformsComponnents/TextLabelField';
import FuseLoading from '../../../@fuse/core/FuseLoading'
import NewStakeholderModal from '../../../@mscComponnent/Modal/NewStakeholderModal';
import ConfirmModal from '../../../@mscComponnent/Modal/ConfirmModal';
import MSCDateLabelField from '../../../@mscComponnent/UniformsComponnents/MSCDateLabelField'
import MaterialUiGridComp from '../../../@mscComponnent/MaterialuiGrid/MaterialUiGridComp';
import MSCTextField from '../../../@mscComponnent/MSCInput/MSCTextField';
import Loading from '../../../@mscComponnent/Loading'
import MSCButton from '../../../@mscComponnent/Buttons/MSCButton'
import StakeholderSelectionDialog from '../../../@mscComponnent/Modal/StakeholderSelectionDialog';

const period = moment().format("YYYY-MM").replace('-', '');
const jsonVal = {
    exchangerate: 1,
    baseamount: 0,
    paidamount: 0,
    changetime: moment(),
    // changeuser: user.data.email,
    companyid: 1,
    currency: 'TRY',
    createtime: moment(),
    // createuser: user.data.email,
    deleted: false,
    documentno: "",
    eiNo: "",
    eiScenario: "",
    eiSendingtime: moment(),
    eiSendinguser: "",
    eiStatus: "P",
    eiType: "A",
    eiUuid: "",
    exceptioncode: "",
    invdate: moment(),
    invoicedoctype: "SA",
    invoiceno: 0,
    invoicetype: "SA",
    invtime: moment(),
    maturitydate: moment(),
    paymentterm: null,
    plantid: 1,
    referencedocno: "",
}

function Sales() {
    const { t } = useTranslation();
    const getViewModeFuncEx = useSelector(getViewModeFunc);
    const dispatch = useDispatch();
    const [addOrUpdate, setAddOrUpdate] = useState(AddOrUpdateEnum.Add)
    const [rowData, setRowData] = useState({});
    const user = useSelector(({ auth }) => auth.user)
    const [selectedData, setSelectedData] = useState({});
    const [getInvoicehWithFilterLazyQuery, { data, loading, error, refetch }] = useGetInvoicehWithFilterLazyQuery();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [newStakeholderModal, setNewStakeholderModal] = useState(false);
    const getViewModeEx = useSelector(getViewMode); // 18042022 
    const [deleteInvoicehMutation, { data: deleteMutationData }] = useDeleteInvoicehMutation();
    const [showStakeholderModal, setShowStakeholderModal] = useState(false);
    const [selectedStakeholder, setSelectedStakeholder] = useState();
    const [paymentInfoModal, setPaymentInfoModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [getTaxesLazyQuery, { data: dataTaxes }] = useGetTaxesLazyQuery();
    const [showSalesCollectionModal, setShowSalesCollectionModal] = useState(false);
    const [searchText, setSearchText] = useState('')
    const [filterGlobal, setFilterGlobal] = useState();
    const ref_autoForm = useRef();
    const [filterParams, setFilterParams] = useState({
        invoiceno: 0,
        eino: "",
        starttime: null,
        endtime: null
    })
    let paid = 0;
    const [totalPaymentPlanLineAmount, setTotalPaymentPlanLineAmount] = useState(0);
    const { data: dataCurrencies, loading: loadingCurrencies } = useGetCurrenciesQuery();
    const [dataAcAccountDocumenth, setDataAcAccountDocumenth] = useState(null);
    const [getAcAccountDocumentHLazyQuery, { data: dataAcAccountDocH, loading: loadingAcAccountDocH }] = useGetAcAccountDocumentHLazyQuery({
        onCompleted: res => setDataAcAccountDocumenth(res?.acAccountdocumenths)
    });
    const [getInvoiceHByInvoiceNoLazyQuery, { data: invoiceHByInvoiceNo, loading: loadingInvoiceHByInvoiceNo }] = useGetInvoiceHByInvoiceNoLazyQuery();

    const acJSON = [{
        accdocno: "0",//Prosedürden gelecek
        accdoctype: 3,
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

    if (getViewModeEx === 3 && rowData) {
        for (let i = 0; i < rowData?.acAccountdocumenths?.length; i++) {
            paid += rowData?.acAccountdocumenths[i]?.amountlc;
        }
    }
    useEffect(() => {
        if (getViewModeEx === 3 && selectedData?.invoiceno) {
            getAcAccountDocumentHLazyQuery({
                variables: {
                    prmInvoiceNo: selectedData?.invoiceno,
                    prmDocType: 1,
                }
            });
        }
        else if (getViewModeEx === 1) {
            setRowData({});
        }
        paid = 0;
        setTotalPaymentPlanLineAmount(0);
    }, [selectedData, getViewModeEx]);

    useEffect(() => {
        if (getViewModeEx === 1) {
            setSelectedData({});
        }
    }, [getViewModeEx])

    const handleCloseNewStakeholderModal = () => {
        setNewStakeholderModal(false);
    }

    useEffect(() => {
        filterGlobal?.setGlobalFilter(searchText)
    }, [searchText])

    const handleClosePaymentInfoModal = () => {
        setPaymentInfoModal(false);
    }

    const handleCloseSalesCollectionModal = () => {
        setShowSalesCollectionModal(false);
    }

    useEffect(() => {
        getTaxesLazyQuery()
    }, [selectedItem])

    let subTotal = 0
    let discountAmount = 0
    let vatamount = 0
    let sctamount = 0

    const gTotalCalculation = () => {
        let gTotalAmount = 0;
        gTotalAmount = (subTotal - discountAmount + sctamount + vatamount);
        return parseFloat(gTotalAmount);
    }

    // Ara Toplam
    for (let i = 0; i < rowData?.invoiceds?.length; i++) {
        if (rowData?.invoiceds[i]?.netamount)
            subTotal += rowData?.invoiceds[i]?.unitprice * rowData?.invoiceds[i]?.quantity
    }
    for (let i = 0; i < rowData?.invoiceds?.length; i++) {
        if (rowData?.invoiceds[i]?.discountamount) {
            discountAmount += rowData?.invoiceds[i]?.discountamount
        }
    }
    for (let i = 0; i < rowData?.invoiceds?.length; i++) {
        if (rowData?.invoiceds[i]?.vatamount) {
            vatamount += rowData?.invoiceds[i]?.vatamount
        }
    }
    for (let i = 0; i < rowData?.invoiceds?.length; i++) {
        if (rowData?.invoiceds[i]?.sctamount) {
            sctamount += rowData?.invoiceds[i]?.sctamount;
        }
    }

    // üst dizine onchange ile veri atmak için kullanıldı.

    useEffect(() => {
        if (dataAcAccountDocumenth && getViewModeEx === 3) {
            ref_autoForm.current.change('acAccountdocumenths', dataAcAccountDocumenth);
        }
    }, [dataAcAccountDocumenth, getViewModeEx])

    const handleCloseStakeholderModal = () => {
        setShowStakeholderModal(false);
    }
    const visibleColumns = ['invoiceno', 'eiNo', "invoicetype", "stakeholdercode",
        "stakeholdername", "invdate", "gtotalamount", "paidamount"]

    const [addOrUpdateInvoiceHMutation, { data: dataMutation, error: ErrorMutation, loading: loadingMutation }] = useAddOrUpdateInvoiceHMutation();
    let gridData = GetRowAndColumn(data?.invoicehWithFilter, visibleColumns);

    const dataRow = React.useMemo(
        () => gridData.rows,
        [gridData?.rows?.length, data]
    )

    useEffect(() => {
        if (loadingAcAccountDocH || loadingInvoiceHByInvoiceNo || loadingMutation) {
            Loading.show();
        } else {
            Loading.hide();
        }
    }, [loadingAcAccountDocH, loadingInvoiceHByInvoiceNo || loadingMutation])

    const AddOrUpdate = (model, addOrUpdateStatus) => {
        addOrUpdateInvoiceHMutation({
            variables: {
                addOrUpdate: addOrUpdateStatus,
                prmInvoiceH: model
            }
        }).then(res => {
            console.log(res, "res");
            if (res.data.addOrUpdateInvoiceH.resultType === "SUC") {
                MSCMessage(dispatch, 'success', "Kaydedildi.")
                model.stakeholder = selectedStakeholder.stakeholder;
                setRowData({});
                setSelectedData({});
                getViewModeFuncEx(ViewMode.Update);
                dispatch(changeViewMode(ViewMode.Update))
                setAddOrUpdate(AddOrUpdateEnum.Update);
                // setShowSalesCollectionModal(true);
            } else {
                MSCMessage(dispatch, 'error', "Hata Oluştu")
            }
        }).catch(err => MSCMessage(dispatch, 'error', "Bilinmeyen bir hata oluştu."))
    }

    useEffect(() => {
        if (rowData.stakeholder)
            setSelectedStakeholder(rowData?.stakeholder);
    }, [rowData?.stakeholder])

    useEffect(() => {
        if (dataMutation?.addOrUpdateInvoiceH?.resultType === "SUC") {
            getInvoiceHByInvoiceNoLazyQuery({
                variables: {
                    prmInvoiceNo: dataMutation?.addOrUpdateInvoiceH?.data?.invoiceno
                }
            })
        }
    }, [dataMutation]);

    useEffect(() => {
        setSelectedData(invoiceHByInvoiceNo?.invoiceH[0])
    }, [invoiceHByInvoiceNo]);

    useEffect(() => {
        getViewModeFuncEx(ViewMode.Read);
        dispatch(changeViewMode(ViewMode.Read))
    }, [])

    const UpdateButtonClick = (prmRowData, addOrUpdateStatus) => {
        setAddOrUpdate(addOrUpdateStatus); // kayıt modu belirleme
        getViewModeFuncEx(ViewMode.Update)
        const state = prmRowData;
        delete state?.acAccountdocumenths;
        setSelectedData(state);
    };

    if (loading) {
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
                console.log(res, "res");
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

    const GetInvoicehWithFilter = () => {
        getInvoicehWithFilterLazyQuery({
            variables: {
                prmEino: filterParams.eino,
                prmInvoiceno: parseInt(filterParams.invoiceno),
                prmInvoicetype: "SA",
                prmEndTime: filterParams.endtime,
                prmStartTime: filterParams.starttime,
                prmInvoicetype2: ""
            }
        })
        setFilterParams({
            eino: "",
            endtime: null,
            invoiceno: 0,
            starttime: null
        })
    }

    return (
        <AutoForm
            ref={ref_autoForm}
            schema={schema}
            model={addOrUpdate === "ADD" ? jsonVal : selectedData}
            onChangeModel={(model) => {
                setRowData(model);
                console.log(model,"model");
                if (model?.invoicepaymentplan?.invoicepaymentplanlines) {
                    model = Object.assign(model, { invoicepaymentplanlines: model?.invoicepaymentplan?.invoicepaymentplanlines });
                }
                if (model?.invoicepaymentplanlines?.length > 0) {
                    let tA = 0;
                    model.invoicepaymentplanlines.map(val => tA += val.amount);
                    setTotalPaymentPlanLineAmount(tA);
                }
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
                delete model.stakeholder
                delete model?.invoicepaymentplan?.invoicepaymentplanlines
                if (model?.invoiceds) {
                    for (let i = 0; i < model?.invoiceds?.length; i++) {
                        delete model?.invoiceds[i]?.stockcontrol;
                    }
                }
                if (getViewModeEx === 2) {
                    acJSON[0] = Object.assign(acJSON[0], {
                        amount: parseFloat(gTotalCalculation()), stakeholderid: selectedStakeholder?.
                            stakeholderid, amountlc: parseFloat(gTotalCalculation())
                    })
                    model = Object.assign(model, { acAccountdocumenths: [...acJSON] });
                }
                console.log('MODELL GELEN', model)
                AddOrUpdate(model, addOrUpdate)
            }} >
            <MSCToolbar
                filterSearch={setSearchText}
                headerName={t('Sales')}
                viewMode={ViewMode.Read}
                queryList={GetInvoicehWithFilter}
                hideSubmitButton={getViewModeEx === 3 && true}
                SubmitComponnent={
                    getViewModeEx === 3 ?
                        <MSCButton title={'Delete'}
                            onClick={() => { onDeleteButtonClick() }}
                        /> : null}
                ReadModeHeaderComponnent={
                    <>
                        <MSCButton title={'Search'} onClick={() => {
                            getViewModeFuncEx(ViewMode.Search)
                            dispatch(changeViewMode(ViewMode.Search))
                        }} />
                        <MSCButton
                            title={'View'}
                            disabled={selectedData ? ((Object.keys(selectedData)?.length > 0 ? false : true)) : true}
                            onClick={() => {
                                dispatch(changeViewMode(ViewMode.Update))
                                UpdateButtonClick(selectedData, AddOrUpdateEnum.Update)
                            }}
                        />
                        <MSCButton title={'Add'} onClick={() => {
                            setSelectedData({});
                            setTimeout(() => {
                                setAddOrUpdate(AddOrUpdateEnum.Add); // kayıt modu belirleme
                                getViewModeFuncEx(ViewMode.Create)
                                dispatch(changeViewMode(ViewMode.Create))
                            },10)
                        }}
                        />
                    </>}
                ReadComponnent={
                    <div style={{ width: '100%' }}>
                        <MSCReactTable
                            selection
                            columns={[
                                { accessor: 'invoiceno', Header: t('invoiceno') },
                                { accessor: 'eiNo', Header: t('eiNo') },
                                { accessor: (row) => { if (row.invoicetype === "SA") return t('SaleInvoice') }, Header: t('invoicetype') },
                                { accessor: (row) => { return row?.stakeholder?.stakeholdercode }, Header: t('stakeholdercode') },
                                { accessor: (row) => { return row?.stakeholder?.stakeholdername }, Header: t('stakeholdername') },
                                { accessor: (row) => { return moment(row?.invdate).format('DD-MM-YYYY') }, Header: t('invdate') },
                                { accessor: (row) => { return MSCCurrencyFormatter(row?.gtotalamount,rowData?.currency) }, Header: t('gtotalamount') },
                                { accessor: (row) => { return MSCCurrencyFormatter(row?.paidamount,rowData?.currency) }, Header: t('collectionAmount') },
                            ]}
                            data={dataRow}
                            SelectRowData={(e) => { setSelectedData(e) }}
                            onRowClicked={e => {
                                DoubleRowClick(e.original, AddOrUpdateEnum.Update)
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
                            <MSCTextField label={t('invoiceno')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, invoiceno: e.target.value })} />,
                            <MSCTextField label={t('eiNo')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, itemname: e.target.value })} />,
                            <MSCTextField type={'date'} label={t('starttime')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, starttime: e.target.value })} />,
                            <MSCTextField type={'date'} label={t('endtime')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, endtime: e.target.value })} />
                        ]}
                    />
                }
                CreateOrUpdateComponnent={
                    <div>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} lg={getViewModeEx === 2 ? 12 : 8} md={getViewModeEx === 2 ? 12 : 8}>
                                <Card>
                                    <CardContent>
                                        <Grid container spacing={1}>
                                            <ErrorField name={'stakeholder'} />
                                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                                {/* Hidden Fields */}
                                                <HiddenField name={'discountamount'} value={discountAmount} />
                                                <HiddenField name={'gtotalamount'} value={gTotalCalculation()} />
                                                <HiddenField name={'createuser'} value={user.data.displayName} />
                                                <HiddenField name={'changeuser'} value={user.data.displayName} />
                                                {/* {getViewModeEx === 3 ? <AddAcAccountToModel /> : null} */}
                                                <TextLabelField
                                                    label={t('stakeholdername')}
                                                    name={'stakeholder.stakeholdername'}
                                                    value={rowData?.stakeholder?.stakeholdername ? rowData?.stakeholder?.stakeholdername
                                                        : null}
                                                    // onChange={(e) => onChange({ ...value, 'stakeholder.stakeholdername': e })}
                                                    disabled={getViewModeEx === 2 ? false : true}
                                                    onNewButtonClick={() => setNewStakeholderModal(true)}
                                                    folderIconDisabled={getViewModeEx === 2 ? false : true}
                                                    newButton={(getViewModeEx === 2 && !rowData?.stakeholder) ? true : false}
                                                    onFolderIconClick={() => {
                                                        setShowStakeholderModal(true)
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                                <MSCDateLabelField name={'invdate'} value={moment(rowData.invdate).format('YYYY-MM-DD')} />
                                            </Grid>
                                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                                <AutoLabelField name='stakeholder.stakeholdercode' disabled label={t('stakeholdercode')} />
                                                <HiddenField name="stakeholderid" value={selectedStakeholder?.stakeholderid} />
                                                <HiddenField name="shadbookid" value={selectedStakeholder?.shadbook?.shadbookid}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                                <AutoLabelField name={'currency'} options={GetCurrencies(dataCurrencies)} disabled label={t('currency')} />
                                            </Grid>
                                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                                <AutoLabelField name='stakeholder.taxno' disabled label={t('taxno')}
                                                    itemProps={{ value: rowData?.stakeholder?.taxno ? rowData?.stakeholder?.taxno : '' }} />
                                            </Grid>
                                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                                <AutoLabelField name='stakeholder.shadbook.address' disabled label={t('address')} />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            {getViewModeEx === 3 ?
                                <Grid item xs={12} sm={12} lg={4} md={4}>
                                    <Card variant="outlined" >
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="h6">
                                                {t("InvoiceSummary")}
                                            </Typography>
                                            <div>
                                                <Paper>
                                                    <Grid container wrap="nowrap" spacing={1}>
                                                        <Grid item xs zeroMinWidth>
                                                            <Typography variant="h6" gutterBottom color={"error"} style={{ textAlign: 'center' }}>{t('Remaining')} : {MSCCurrencyFormatter((selectedData?.gtotalamount - paid),rowData?.currency)}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Paper>
                                            </div>
                                            <Stack style={{ width: '100%', flexDirection: 'column', display: 'flex', marginTop: '10%' }} spacing={2}>
                                                <Button variant={'contained'} color={'info'} disabled={selectedData?.gtotalamount - paid > 0 ? false : true}
                                                    onClick={() => { setShowSalesCollectionModal(true) }}
                                                    startIcon={<AddIcon />}>{t('AddCollection')}</Button>
                                                {/* <Button variant={'contained'} color={'success'}
                                                    startIcon={<OpenInBrowserIcon />}>{t('SendToGIB')}</Button>
                                                <Button variant={'contained'} color={'success'}
                                                    startIcon={<OpenInBrowserIcon />}>{t('print')}</Button> */}
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                : null}
                            <Grid item xs={12} sm={12} lg={getViewModeEx === 2 || selectedData?.invoicepaymentplanlines?.length === 0 ? 12 : 8}
                                md={getViewModeEx === 2 || selectedData?.invoicepaymentplanlines?.length === 0 ? 12 : 8}>
                                <Card >
                                    <CardContent>
                                        <Typography variant={'h6'}>{t('invoiceds')}</Typography>
                                        <ErrorField name={'invoiceds'} />
                                        <Grid item xs={12} sm={12} lg={12} md={12}>
                                            <MSCTableField
                                                name="invoiceds"
                                                disabled={getViewModeEx === 2 ? false : true}
                                                columns={['', `${t('itemtype')}`, `${t('itemcode')}`, `${t('unitprice')}`,
                                                    `${t('quantity')}`, `${t('discountamount')}`, `${t('vatcode')}`, `${t('vatamount')}`,
                                                    `${t('sctcode')}`, `${t('sctamount')}`, `${t('netamount')}`, `${t('explanation')}`, '']}
                                            >
                                                <GetItem
                                                    name={'$'}
                                                    setSelectedItem={setSelectedItem}
                                                    selectedItem={selectedItem}
                                                    getViewModeEx={getViewModeEx}
                                                    dataTaxes={dataTaxes?.taxes} />
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
                                                        <p>{MSCCurrencyFormatter(subTotal, selectedItem?.currency)}</p>
                                                        <div style={{
                                                            marginBottom: '10%', overflow: "hidden",
                                                            width: '100%',
                                                        }}>
                                                        </div>
                                                        <p style={{ marginBottom: '8%' }}>{MSCCurrencyFormatter(discountAmount, selectedItem?.currency)}</p>
                                                        <p style={{ marginBottom: '8%' }}>{MSCCurrencyFormatter(vatamount, selectedItem?.currency)}</p>
                                                        <p style={{ marginBottom: '8%' }}>{MSCCurrencyFormatter(sctamount, selectedItem?.currency)}</p>
                                                        <p style={{ marginBottom: '8%' }}>{MSCCurrencyFormatter(gTotalCalculation(), selectedItem?.currency)}</p>
                                                    </div>
                                                </div>
                                            </div>

                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            {getViewModeEx === 3 && selectedData?.invoicepaymentplanlines?.length > 0 ?
                                <Grid item xs={12} sm={12} lg={4} md={4} mt={3}>
                                    <Card variant="outlined" >
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="h6">
                                                {t("paymentinformation")}
                                            </Typography>
                                            <MSCReactTable
                                                filter={false}
                                                columns={[
                                                    { accessor: (rowdata) => { return moment(rowdata.paymentdate).format('DD-MM-YYYY') }, Header: t('paymentdate') },
                                                    { accessor: (rowdata) => { return MSCCurrencyFormatter(rowdata?.amount, rowdata?.currency) }, Header: t('amount') }
                                                ]}
                                                data={selectedData?.invoicepaymentplanlines}
                                            />
                                        </CardContent>
                                    </Card>
                                </Grid>
                                : null}
                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                <Card >
                                    <CardContent>
                                        <Typography variant={'h6'}>{t('explanation')}</Typography>
                                        <AutoLabelField name={'explanation'} label={t('explanation')} disabled={getViewModeEx === 2 ? false : true} />
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                <Card >
                                    <CardContent>{
                                        getViewModeEx === 2 ?
                                            <>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Typography variant={'h6'}>{t('paymentinformation')}</Typography>
                                                    <IconButton onClick={() => {
                                                        if (gTotalCalculation() - totalPaymentPlanLineAmount > 0) {
                                                            setPaymentInfoModal(true)
                                                        } else {
                                                            dispatch(
                                                                showMessage({
                                                                    message: 'Toplam tutar ve ödeme tutarı eşit olduğundan ' +
                                                                        'daha fazla ödeme ekleyemezsiniz.',//text or html
                                                                    autoHideDuration: 6000,//ms
                                                                    anchorOrigin: {
                                                                        vertical: 'top',//top bottom
                                                                        horizontal: 'right'//left center right
                                                                    },
                                                                    variant: 'warning'//success error info warning null
                                                                }))
                                                        }
                                                    }}
                                                    ><AddIcon /></IconButton>
                                                </div>
                                                <MSCTableField
                                                    name="invoicepaymentplanlines"
                                                    columns={[t('paymentdate'), t('currency'), t('amount')]}
                                                    disabled={true}
                                                    addIcon={null}
                                                >
                                                    <GetPaymentPlanLine name={'$'} dataCurrencies={dataCurrencies} />
                                                </MSCTableField>
                                            </>
                                            : <>
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
                                            </>
                                    }
                                    </CardContent>
                                </Card>
                            </Grid>
                            <StakeholderSelectionDialog
                                name={'stakeholder'}
                                showModal={showStakeholderModal}
                                handleClose={handleCloseStakeholderModal}
                                stakeholdertype="C"
                            />
                            <PaymentInfoModal
                                name={'invoicepaymentplan'}
                                showModal={paymentInfoModal}
                                handleClose={handleClosePaymentInfoModal}
                                gTotalCalculation={gTotalCalculation()}
                                dataCurrencies={dataCurrencies}
                            />
                            <SalesCollectionModal
                                showModal={showSalesCollectionModal}
                                handleClose={handleCloseSalesCollectionModal}
                                selectedStakeholder={selectedStakeholder}
                                invoiceH={rowData}
                                balance={selectedData?.gtotalamount - paid}
                                dataCurrencies={dataCurrencies}
                                refetch={refetch}
                            />
                            <NewStakeholderModal
                                showModal={newStakeholderModal}
                                handleClose={handleCloseNewStakeholderModal}
                                dataCurrencies={dataCurrencies}
                                type={'C'}
                            />
                            <ConfirmModal
                                handleClose={() => { setShowDeleteModal(false) }}
                                showModal={showDeleteModal}
                                onYesButtonClick={() => onDeleteModalButtonClick(selectedData?.invoiceno)}
                            />
                        </Grid>
                    </div>
                }
            />
        </AutoForm>
    );
}

export default Sales;   