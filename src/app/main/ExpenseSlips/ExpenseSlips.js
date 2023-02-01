import { useTranslation } from 'react-i18next';
import MSCToolbar, { ViewMode } from '../../../@mscComponnent/CRUDPage/MSCToolbar'
import { AutoForm, HiddenField, ErrorField } from 'uniforms-material';
import { bridge as schema } from '../../../@mscComponnent/UniformsSchema/InvoiceHSchema';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getViewModeFunc, changeViewMode, getViewMode } from '../../store/mscToolbar/mscToolbarSlice'
import { showMessage } from '../../store/fuse/messageSlice'
import { GetCurrencies, GetRowAndColumn, MSCCurrencyFormatter } from '../../../@mscComponnent/Global/GlobalFunc'
import {
    AddOrUpdateEnum, useAddOrUpdateInvoiceHMutation, useGetInvoiceHQuery, useGetTaxesLazyQuery,
    useGetCurrenciesQuery, useGetAllStakeholdersLazyQuery, useGetExpensesQuery
} from '../../../generated/graphql';
import { Card, CardContent, Grid } from '@mui/material';
import { Button } from '@material-ui/core';
import moment from 'moment';
import { MSCReactTable } from '../../../@mscComponnent/MSCReactTable/MSCReactTable';
import AutoLabelField from '../../../@mscComponnent/UniformsComponnents/AutoLabelField';
import DateLabelField from '../../../@mscComponnent/UniformsComponnents/DateLabelField';
import TextLabelField from '../../../@mscComponnent/UniformsComponnents/TextLabelField';
import FuseLoading from '../../../@fuse/core/FuseLoading'
import StakeholderSelectionModal from '../../../@mscComponnent/Modal/StakeholderSelectionModal';
import MSCRadio from '../../../@mscComponnent/MSCInput/MSCRadio';
import GetItem from './SubComponents/GetItem';
import GetPaymentPlan from './SubComponents/GetPaymentPlan';

const period = moment().format("YYYY-MM").replace('-', '');
const jsonVal = {
    exchangerate: 1,
    paidamount: 0,
    changetime: moment().format(),
    // changeuser: user.data.displayName,
    companyid: 1,
    currency: 'TRY',
    documentno: "",
    createtime:moment().format(),
    // createuser: user.data.displayName,
    deleted: false,
    eiNo: "",
    eiScenario: "A",
    eiSendingtime: moment().format(),
    eiSendinguser: "",
    eiStatus: "P",
    eiType: "A",
    eiUuid: "",
    discountamount: 0,
    exceptioncode: "",
    invdate: moment().format(),
    invoicedoctype: "ES",
    invoiceno: 0,
    invoicetype: "ES",
    invtime: moment().format(),
    maturitydate: moment().format(),
    paymentterm: null,
    plantid: 1,
    referencedocno: "",
    invoiceds: [{
        unit: 'ad',
        vatcode: '',
        sctamount: 0,
        pctamount: 0,
        sctcode: '',
        pctcode: '',
        unitprice: 0,
        quantity: 1,
        netamount: 0,
        seqno: 1,
        invoiceno: 0,
        companyid: 1,
        plantid: 1,
    }],
    invoicepaymentplanlines: [
        {
            paymentdate: moment().format(),
            invoiceno: 0,
            currency: "TRY",
            paidamount: 0,
            paymentplanid: 0
        }
    ],
}

function ExpenseSlips() {
    const user = useSelector(({ auth }) => auth.user)
    const { t } = useTranslation();
    const getViewModeFuncEx = useSelector(getViewModeFunc);
    const dispatch = useDispatch();
    const [addOrUpdate, setAddOrUpdate] = useState(AddOrUpdateEnum.Add);
    const getViewModeEx = useSelector(getViewMode); // 18042022 
    const [rowData, setRowData] = useState({})
    const [selectedData, setSelectedData] = useState({});
    const { data, loading, error } = useGetInvoiceHQuery({ variables: { prmInvoiceType: "ES" } });
    const [showStakeholderModal, setShowStakeholderModal] = useState(false);
    const [selectedStakeholder, setSelectedStakeholder] = useState();
    const [searchText, setSearchText] = useState('')
    const [filterGlobal, setFilterGlobal] = useState();
    const { data: dataExpenses } = useGetExpensesQuery({
        variables:{expenseCategoryId:0, expenseCode:{filterType:"",parameter:""}, expenseName:{filterType:"",parameter:""}}
    });
    const [getStakeholdersLazyQuery, { data: stakeholdersData }] = useGetAllStakeholdersLazyQuery();
    const [addOrUpdateInvoiceHMutation, { data: dataMutation, error: ErrorMutation, loading: loadingMutation }] = useAddOrUpdateInvoiceHMutation();
    const { data: dataCurrencies } = useGetCurrenciesQuery();
    let gridData = GetRowAndColumn(data?.invoiceH, visibleColumns);
    const [paymentSituation, setPaymentSituation] = useState('payable');

    useEffect(() => {
        filterGlobal?.setGlobalFilter(searchText)
    }, [searchText])

    const handleCloseStakeholderModal = () => {
        setShowStakeholderModal(false);
    }
    const visibleColumns = ['invoiceno', 'eiNo', "invoicetype", "stakeholdercode",
        "stakeholdername", "invdate", "gtotalamount", "paidamount"]

    const AddOrUpdate = (model, addOrUpdateStatus) => {
        addOrUpdateInvoiceHMutation({
            variables: {
                addOrUpdate: addOrUpdateStatus,
                prmInvoiceH: model
            }
        }).then(res => {
            console.log(res, "res");
            if (res.data.addOrUpdateInvoiceH.resultType === "SUC") {
                dispatch(
                    showMessage({
                        message: 'Kaydedildi',//text or html
                        autoHideDuration: 6000,//ms
                        anchorOrigin: {
                            vertical: 'top',//top bottom
                            horizontal: 'right'//left center right
                        },
                        variant: 'success'//success error info warning null
                    }));
                getViewModeFuncEx(ViewMode.Update);
                dispatch(changeViewMode(ViewMode.Update));
                setAddOrUpdate(AddOrUpdateEnum.Update);
            }
        })
    }

    const dataRow = React.useMemo(
        () => gridData.rows,
        [gridData?.rows?.length, data]
    )

    const UpdateButtonClick = (prmRowData, addOrUpdateStatus) => {
        setAddOrUpdate(addOrUpdateStatus); // kayıt modu belirleme
        getViewModeFuncEx(ViewMode.Update)
        dispatch(changeViewMode(ViewMode.Update))
        const state = prmRowData;
        delete state?.acAccountdocumenths;
        setSelectedData(state);
    };

    useEffect(() => {
        if (rowData.stakeholder)
            setSelectedStakeholder(rowData?.stakeholder);
    }, [rowData?.stakeholder]);

    if (loading) {
        return <FuseLoading />
    }

    return (
        <AutoForm
            schema={schema}
            model={addOrUpdate === "ADD" ? jsonVal : selectedData}
            onChangeModel={(model) => {
                setRowData(model);
                console.log(model, "modelll");
            }}
            onSubmit={model => {
                if (model.invoiceds) {
                    model = Object.assign(model, { gtotalamount: model.baseamount + model.invoiceds[0].vatamount })
                }
                if (model?.gtotalamount === model?.paidamount) {
                    var acAccountdocumenths = [{
                        companyid: 1,
                        plantid: 1,
                        accdocno: '0',
                        accdoctype: 2,
                        accdocyear: 0,
                        accountclassid: 1,
                        amountlc: model?.gtotalamount,
                        accountcode: model?.stakeholder?.stakeholdercode,
                        amount: model?.gtotalamount,
                        createuser: user.data.displayName,
                        changeuser:user.data.displayName,
                        currency: "TRY",
                        currencylc: "TRY",
                        docdate: new Date(),
                        exchangedate: new Date(),
                        exchangerate: 1,
                        explanation: model?.explanation,
                        stakeholderid: model?.stakeholderid,
                        invoiceno: 0,
                        acAccountdocumentis: [{
                            companyid: 1,
                            accdocno: "0",
                            accdocseq: 1,
                            dcindicator: "C",
                            accdocyear: 0,
                            movementtypeid: 1,
                            // ownercode: props.moduleState.value.sendData.ownerCode,
                            // maturitydate: props.moduleState.value.sendData.maturityDate,
                            amount: model?.gtotalamount,
                            amountlc: model?.gtotalamount,
                            currency: "TRY",
                            explanation: model.explanation,
                            accountclassid: (model?.acAccountdocumenths && model?.acAccountdocumenths?.length > 0) ?
                                model.acAccountdocumenths[0].accountclassid : 1,
                        }]
                    }]
                }
                delete model.stakeholder
                if (acAccountdocumenths && acAccountdocumenths?.length > 0) {
                    model = Object.assign(model, { acAccountdocumenths: acAccountdocumenths })
                }
                AddOrUpdate(model, addOrUpdate)
                console.log('MODELL GELEN', model)
            }} >
            <MSCToolbar
                filterSearch={setSearchText}
                headerName={t('ExpenseSlips')}
                ReadModeHeaderComponnent={
                    <>
                        <Button
                            className="whitespace-nowrap mx-4"
                            variant="contained"
                            color="secondary"
                        >
                            <span className="hidden sm:flex">{t('Search')}</span>
                            <span className="flex sm:hidden">{t('Search')}</span>
                        </Button>
                        <Button
                            className="whitespace-nowrap mx-4"
                            variant="contained"
                            color="secondary"
                            disabled={selectedData ? ((Object.keys(selectedData)?.length > 0 ? false : true)) : true}
                            onClick={() => UpdateButtonClick(selectedData, AddOrUpdateEnum.Update)}
                        >
                            <span className="hidden sm:flex">{t('View')}</span>
                            <span className="flex sm:hidden">{t('View')}</span>
                        </Button>
                        <Button
                            className="whitespace-nowrap mx-4"
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                setAddOrUpdate(AddOrUpdateEnum.Add); // kayıt modu belirleme
                                getViewModeFuncEx(ViewMode.Create);
                                dispatch(changeViewMode(ViewMode.Create));
                            }}
                        >
                            <span className="hidden sm:flex">{t('Add')}</span>
                            <span className="flex sm:hidden">{t('Add')}</span>
                        </Button>
                    </>}
                ReadComponnent={
                    <div style={{ width: '100%' }}>
                        <MSCReactTable
                            selection
                            columns={[
                                { accessor: 'invoiceno', Header: t('invoiceno') },
                                { accessor: (row) => { return row.stakeholder.stakeholdercode }, Header: t('stakeholdercode') },
                                { accessor: (row) => { return row.stakeholder.stakeholdername }, Header: t('stakeholdername') },
                                { accessor: (row) => { return moment(row.invdate).format('DD-MM-YYYY') }, Header: t('invdate') },
                                { accessor: (row) => { return MSCCurrencyFormatter(row.gtotalamount, row?.currency) }, Header: t('gtotalamount') },
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
                CreateOrUpdateComponnent={
                    <div>
                        {/* Hidden Fields */}
                        <HiddenField name="stakeholderid" value={selectedStakeholder?.stakeholderid} />
                        <HiddenField name="shadbookid" value={selectedStakeholder?.shadbook?.shadbookid} />
                        <HiddenField name="createuser" value={user.data.displayName}/>
                        <HiddenField name="changeuser" value={user.data.displayName}/>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Card>
                                    <CardContent>
                                        <Grid container spacing={1}>
                                            <ErrorField name={'stakeholder'} />

                                            {getViewModeEx === 3 ? <ExampleUseEffect /> : null}
                                            <TextLabelField
                                                label={t('stakeholdername')}
                                                name={'stakeholder.stakeholdername'}
                                                value={rowData?.stakeholder?.stakeholdername}
                                                disabled={getViewModeEx === 2 ? false : true}
                                                folderIconDisabled={getViewModeEx === 2 ? false : true}
                                                onFolderIconClick={() => {
                                                    getStakeholdersLazyQuery();
                                                    setShowStakeholderModal(true)
                                                }}
                                            />
                                            <AutoLabelField name="stakeholder.stakeholdercode"
                                                label={t('stakeholdercode')} disabled />
                                            <AutoLabelField name={'explanation'} label={t('explanation')} />
                                            <AutoLabelField label={t('ExpenseCode')} name={'invoiceds.0.itemcode'}
                                                options={dataExpenses?.expenses?.map(val => { return ({ label: val.expensename, value: val.expensecode }) })} />
                                            <AutoLabelField name="currency" options={GetCurrencies(dataCurrencies)} label={t('currency')} disabled />
                                            <AutoLabelField name="baseamount" label={t('totalamount')} />
                                            <AutoLabelField name="invoiceds.0.vatamount" label={t('vatamount')} />
                                            <DateLabelField name="acAccountdocumenths.0.acAccountdocumentis.0.maturitydate"
                                                label={t('invdate')}
                                                value={moment(rowData?.invdate)}
                                                disabled={getViewModeEx === 2 ? false : true} />
                                            <MSCRadio label={t('PaymentSituation')}
                                                value={paymentSituation}
                                                onChange={(e) => setPaymentSituation(e.target.value)}
                                                options={[
                                                    { label: 'Ödendi', value: 'paid' },
                                                    { label: 'Ödenecek', value: 'payable' },
                                                ]} />
                                            {paymentSituation === "payable" ?
                                                <DateLabelField name="invoicepaymentplanlines.0.paymentdate"
                                                    label={t('Ödenecek Tarih')}
                                                    value={moment()}
                                                    disabled={getViewModeEx === 2 ? false : true} />
                                                :
                                                <><AutoLabelField name="acAccountdocumenths.0.acAccountdocumentis.0.ownercode"
                                                    label={t('Ödendiği Hesap')} />
                                                    <DateLabelField name="invoicepaymentplanlines.0.paymentdate"
                                                        label={t('Ödendiği Tarih')}
                                                        value={moment()}
                                                        disabled={getViewModeEx === 2 ? false : true} />
                                                </>}
                                            {/* For the invoiceds */}
                                            <GetItem />
                                            {/* For the paymentplan */}
                                            {paymentSituation === "payable" && rowData?.gtotalamount !== rowData.paidamount ?
                                                <GetPaymentPlan />
                                                : null}
                                            {/* For the paymentplanlines */}
                                            <HiddenField name={'invoicepaymentplanlines.0.amount'} value={rowData?.gtotalamount ?
                                                rowData?.gtotalamount : 0} />
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <StakeholderSelectionModal
                            name={'stakeholder'}
                            showModal={showStakeholderModal}
                            handleClose={handleCloseStakeholderModal}
                            stakeholdersData={stakeholdersData?.stakeholders}
                            setSelectedStakeholder={setSelectedStakeholder}
                        />
                    </div>
                }
            />
        </AutoForm>
    );
}

export default ExpenseSlips; 