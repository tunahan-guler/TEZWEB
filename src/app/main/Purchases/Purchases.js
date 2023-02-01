import { useTranslation } from 'react-i18next';
import MSCToolbar, { ViewMode } from '../../../@mscComponnent/CRUDPage/MSCToolbar'
import { AutoForm, HiddenField, ErrorField } from 'uniforms-material';
import { bridge as schema } from './uniforms/PurchasesSchema';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { changeViewMode, getViewMode, getViewModeFunc } from '../../store/mscToolbar/mscToolbarSlice'
import { GetCurrencies, GetRowAndColumn, isMobile, MSCCurrencyFormatter, MSCMessage } from '../../../@mscComponnent/Global/GlobalFunc'
import {
    AddOrUpdateEnum, useAddOrUpdateInvoiceHMutation, useGetStakeholdersLazyQuery, useGetTaxesLazyQuery,
    useGetAcAccountDocumentHLazyQuery, useGetInvoiceHByInvoiceNoLazyQuery, useGetCurrenciesQuery, useDeleteInvoicehMutation, useGetInvoicehWithFilterLazyQuery
} from '../../../generated/graphql';
import GetItem from './SubComponents/GetItem';
import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { Button } from '@material-ui/core';
import StakeholderSelectionModal from '../../../@mscComponnent/Modal/StakeholderSelectionModal';
import moment from 'moment';
import MSCTableField from '../../../@mscComponnent/UniformsComponnents/MSCTableField'
import MSCListItemField from '../../../@mscComponnent/UniformsComponnents/MSCTableRowField'
import { MSCReactTable } from '../../../@mscComponnent/MSCReactTable/MSCReactTable';
import AutoLabelField from '../../../@mscComponnent/UniformsComponnents/AutoLabelField';
import AddIcon from '@mui/icons-material/Add'
import TextLabelField from '../../../@mscComponnent/UniformsComponnents/TextLabelField';
import GetMovementHistory from '../Sales/SubComponents/GetMovementHistory'
import SalesCollectionModal from '../Sales/SubComponents/SalesCollectionModal';
import FuseLoading from '../../../@fuse/core/FuseLoading'
import NewStakeholderModal from '../../../@mscComponnent/Modal/NewStakeholderModal';
import ConfirmModal from '../../../@mscComponnent/Modal/ConfirmModal';
import MSCDateLabelField from '../../../@mscComponnent/UniformsComponnents/MSCDateLabelField';
import MaterialUiGridComp from '../../../@mscComponnent/MaterialuiGrid/MaterialUiGridComp';
import MSCTextField from '../../../@mscComponnent/MSCInput/MSCTextField';
import Loading from '../../../@mscComponnent/Loading'
import MSCButton from '../../../@mscComponnent/Buttons/MSCButton';
import StakeholderSelectionDialog from '../../../@mscComponnent/Modal/StakeholderSelectionDialog';

const period = moment().format("YYYY-MM").replace('-', '');
const jsonVal = {
    exchangerate: 1,
    baseamount: 0,
    paidamount: 0,
    changetime: moment(),
    // changeuser: "Tunahan",
    companyid: 1,
    currency: 'TRY',
    createtime: moment(),
    // createuser: "Tunahan",
    deleted: false,
    eiNo: "",
    eiScenario: "",
    eiSendingtime: moment(),
    eiSendinguser: "",
    eiStatus: "P",
    eiType: "A",
    eiUuid: "",
    discountamount: 0,
    exceptioncode: "",
    invdate: moment(),
    invoicedoctype: "PU",
    invoiceno: 0,
    invoicetype: "PU",
    invtime: moment(),
    maturitydate: moment(),
    paymentterm: null,
    plantid: 1,
    referencedocno: "",
}


function Purchases() {
    const { t } = useTranslation();
    const getViewModeFuncEx = useSelector(getViewModeFunc);
    const [newStakeholderModal, setNewStakeholderModal] = useState(false);
    const dispatch = useDispatch();
    const [addOrUpdate, setAddOrUpdate] = useState(AddOrUpdateEnum.Add)
    const [rowData, setRowData] = useState({})
    const [selectedData, setSelectedData] = useState({});
    const user = useSelector(({ auth }) => auth.user)
    const getViewModeEx = useSelector(getViewMode); // 18042022 
    const [getInvoicehWithFilterLazyQuery, { data, loading, error, refetch }] = useGetInvoicehWithFilterLazyQuery();
    const ref_autoForm = useRef()
    const [filterParams, setFilterParams] = useState({
        invoiceno: 0,
        eino: "",
        starttime: null,
        endtime: null
    })
    const [getAcAccountDocumentHLazyQuery, { data: dataAcAccountDocH, loading: loadingAcAccountDocH }] = useGetAcAccountDocumentHLazyQuery({
        onCompleted: res => setDataAcAccountDocumenth(res?.acAccountdocumenths)
    });
    const [deleteInvoicehMutation, { data: deleteMutationData }] = useDeleteInvoicehMutation();
    const [showStakeholderModal, setShowStakeholderModal] = useState(false);
    const [selectedStakeholder, setSelectedStakeholder] = useState();
    const [selectedItem, setSelectedItem] = useState({});
    const [searchText, setSearchText] = useState('')
    const [filterGlobal, setFilterGlobal] = useState();
    const [getTaxesLazyQuery, { data: dataTaxes }] = useGetTaxesLazyQuery();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [dataAcAccountDocumenth, setDataAcAccountDocumenth] = useState(null);
    const [showSalesCollectionModal, setShowSalesCollectionModal] = useState(false);
    const [getInvoiceHByInvoiceNoLazyQuery, { data: invoiceHByInvoiceNo, loading: loadingInvoiceHByInvoiceNo }] = useGetInvoiceHByInvoiceNoLazyQuery();
    const [getStakeholdersLazyQuery, { data: stakeholdersData, loading: loadingStakeholders }] = useGetStakeholdersLazyQuery();
    const [addOrUpdateInvoiceHMutation, { data: dataMutation, error: ErrorMutation, loading: loadingMutation }] = useAddOrUpdateInvoiceHMutation();
    const { data: dataCurrencies } = useGetCurrenciesQuery();
    let gridData = GetRowAndColumn(data?.invoicehWithFilter, visibleColumns);
    var taxRate;
    let total = 0;
    let paid = 0;

    const acJSON = [{
        accdocno: "0",//Prosedürden gelecek
        accdoctype: 4,
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


    useEffect(() => {
        filterGlobal?.setGlobalFilter(searchText)
    }, [searchText])

    for (let i = 0; i < rowData?.invoiceds?.length; i++) {
        if (!isNaN(rowData?.invoiceds[i]?.netamount))
            total += parseFloat(rowData?.invoiceds[i]?.netamount);
    }
    useEffect(() => {
        if (Object.keys(selectedItem)?.length > 0) {
            getTaxesLazyQuery()
                .then((res) => {
                    taxRate = dataTaxes?.taxes[0]?.taxrate;
                })
        }
    }, [selectedItem]);

    if (getViewModeEx === 3 && rowData) {
        for (let i = 0; i < rowData?.acAccountdocumenths?.length; i++) {
            paid += rowData?.acAccountdocumenths[i]?.amountlc;
        }
    }

    const handleCloseNewStakeholderModal = () => {
        setNewStakeholderModal(false);
    }

    useEffect(() => {
        if (getViewModeEx === 3) {
            getAcAccountDocumentHLazyQuery({
                variables: {
                    prmInvoiceNo: selectedData?.invoiceno,
                    prmDocType: 2
                }
            });
        }
        else if (getViewModeEx === 1) {
            setRowData({});
        }
        paid = 0;
    }, [selectedData, getViewModeEx]);

    const handleCloseSalesCollectionModal = () => {
        setShowSalesCollectionModal(false);
    }

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
    useEffect(() => {
        getViewModeFuncEx(ViewMode.Read);
        dispatch(changeViewMode(ViewMode.Read))
    }, [])

    useEffect(() => {
        if (loadingAcAccountDocH || loadingInvoiceHByInvoiceNo || loadingMutation) {
            Loading.show();
        } else {
            Loading.hide();
        }
    }, [loadingAcAccountDocH, loadingInvoiceHByInvoiceNo, loadingMutation])

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
                setRowData({});
                setSelectedData({});
                getViewModeFuncEx(ViewMode.Update);
                dispatch(changeViewMode(ViewMode.Update))
                setAddOrUpdate(ViewMode.Update);
            } else {
                MSCMessage(dispatch, 'error', "Hata Oluştu")
                setRowData({});
                setSelectedData({});
                getViewModeFuncEx(ViewMode.Read);
                dispatch(changeViewMode(ViewMode.Read))
            }
        })
            .catch(err => MSCMessage(dispatch, 'error', "Bilinmeyen bir hata oluştu."))
    }

    const DoubleRowClick = (prmRowData, addOrUpdateStatus) => {
        setAddOrUpdate(addOrUpdateStatus); // kayıt modu belirleme
        setRowData(prmRowData); // isteğe bağlı yönetme şekli
        getViewModeFuncEx(ViewMode.Update)
    }

    useEffect(() => {
        if (rowData.stakeholder)
            setSelectedStakeholder(rowData?.stakeholder);
    }, [rowData?.stakeholder]);

    const dataRow = React.useMemo(
        () => gridData.rows,
        [gridData?.rows?.length, data]
    )

    const UpdateButtonClick = (prmRowData, addOrUpdateStatus) => {
        setAddOrUpdate(addOrUpdateStatus); // kayıt modu belirleme
        getViewModeFuncEx(ViewMode.Update)
        const state = prmRowData;
        delete state?.acAccountdocumenths;
        setSelectedData(state);
    };

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
                if (res.data.deleteInvoiceh.resultType === "SUC") {
                    MSCMessage(dispatch, 'success', "Kaydedildi.")
                    setRowData({});
                    setSelectedData({});
                    getViewModeFuncEx(ViewMode.Read);
                    dispatch(changeViewMode(ViewMode.Read))
                    refetch();
                } else {
                    MSCMessage(dispatch, 'error', 'Hata Oluştu.');
                }
            })
            .catch(err => console.log(err, "err"))
    }

    const GetInvoicehWithFilter = () => {
        getInvoicehWithFilterLazyQuery({
            variables: {
                prmEino: filterParams.eino,
                prmInvoiceno: parseInt(filterParams.invoiceno),
                prmInvoicetype: "PU",
                prmEndTime: filterParams.endtime,
                prmStartTime: filterParams.starttime
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
            schema={schema}
            model={addOrUpdate === "ADD" ? jsonVal : selectedData}
            ref={ref_autoForm}
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
                delete model.stakeholder
                if (model?.invoiceds) {
                    for (let i = 0; i < model?.invoiceds?.length; i++) {
                        delete model?.invoiceds[i].itemname;
                        delete model?.invoiceds[i]?.stockcontrol;
                    }
                }
                if (getViewModeEx === 2) {
                    acJSON[0] = Object.assign(acJSON[0], {
                        amount: total, stakeholderid: selectedStakeholder?.
                            stakeholderid, amountlc: total
                    })
                    model = Object.assign(model, { acAccountdocumenths: [...acJSON] });
                }
                AddOrUpdate(model, addOrUpdate)
                console.log('MODELL GELEN', model)
            }} >
            <MSCToolbar
                filterSearch={setSearchText}
                headerName={t('PurchaseInvoice')}
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
                            }, 10)
                        }}
                        />
                    </>}
                ReadComponnent={
                    <div style={{ width: '100%' }}>
                        <MSCReactTable
                            selection
                            columns={[
                                { accessor: 'invoiceno', Header: t('invoiceno') },
                                { accessor: 'referencedocno', Header: t('ReferenceNo') },
                                { accessor: (row) => { return row?.stakeholder?.stakeholdercode }, Header: t('suppliercode') },
                                { accessor: (row) => { return row?.stakeholder?.stakeholdername }, Header: t('suppliername') },
                                { accessor: (row) => { return moment(row?.invdate).format('DD-MM-YYYY') }, Header: t('invdate') },
                                { accessor: (row) => { return MSCCurrencyFormatter(row?.gtotalamount, row?.currency) }, Header: t('gtotalamount') },
                                { accessor: (row) => { return MSCCurrencyFormatter(row?.paidamount, row?.currency) }, Header: t('paidamount') },
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
                        {/* HiddenFields */}
                        <HiddenField name={'createuser'} value={user.data.displayName} />
                        <HiddenField name={'changeuser'} value={user.data.displayName} />
                        <Grid container spacing={2}>
                            <Grid item>
                                {getViewModeEx === 3 ?
                                    <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant={'subtitle1'} fontWeight={'bold'}>{t('InvoiceSummary')}</Typography>
                                        <Stack direction={'row'} spacing={5}>
                                            <Typography variant={'h6'} color={'error'} style={{ float: 'right' }}>{t('Remaining')}: {MSCCurrencyFormatter((selectedData?.gtotalamount - paid), rowData?.currency)}</Typography>
                                            <Button startIcon={<AddIcon />} variant={'contained'} color={'info'} disabled={selectedData?.gtotalamount - paid === 0 ? true : false}
                                                onClick={() => setShowSalesCollectionModal(true)}>{t('AddPayment')}</Button>
                                        </Stack>
                                    </div> : null}
                                <Card>
                                    <CardContent>
                                        <Grid container spacing={1}>
                                            <ErrorField name={'stakeholder'} />
                                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                                <HiddenField name={'gtotalamount'} value={parseFloat(total)} />
                                                <TextLabelField
                                                    label={t('suppliername')}
                                                    name={'stakeholder.stakeholdername'}
                                                    value={rowData?.stakeholder?.stakeholdername ? rowData?.stakeholder?.stakeholdername
                                                        : null}
                                                    onNewButtonClick={() => setNewStakeholderModal(true)}
                                                    newButton={(getViewModeEx === 2 && !rowData?.stakeholder) ? true : false}
                                                    onChange={(e) => onChange({ ...value, 'stakeholder.stakeholdername': e })}
                                                    disabled={getViewModeEx === 2 ? false : true}
                                                    folderIconDisabled={getViewModeEx === 2 ? false : true}
                                                    onFolderIconClick={() => {
                                                        getStakeholdersLazyQuery({
                                                            variables: {
                                                                prmStakeholderType: 'V'
                                                            }
                                                        });
                                                        setShowStakeholderModal(true)
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                                <AutoLabelField name={'documentno'} label={t('documentno')}
                                                    disabled={getViewModeEx === 2 ? false : true} />
                                            </Grid>
                                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                                <AutoLabelField name="stakeholder.stakeholdercode"
                                                    label={t('SupplierCode')} disabled />
                                                <HiddenField name="stakeholderid" value={selectedStakeholder?.stakeholderid} />
                                                <HiddenField name="shadbookid" value={selectedStakeholder?.shadbook?.shadbookid}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                                <MSCDateLabelField name="invdate"
                                                    label={t('invdate')}
                                                    value={moment(rowData?.invdate).format('YYYY-MM-DD')}
                                                    disabled={getViewModeEx === 2 ? false : true} />
                                            </Grid>
                                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                                <AutoLabelField name='stakeholder.taxno' disabled label={t('taxno')}
                                                    itemProps={{ value: rowData?.stakeholder?.taxno ? rowData?.stakeholder?.taxno : '' }} />
                                            </Grid>
                                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                                <AutoLabelField name="currency" options={GetCurrencies(dataCurrencies)} label={t('currency')} disabled />
                                            </Grid>
                                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                                <AutoLabelField name="stakeholder.shadbook.address" disabled label={t('address')} />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                <Card >
                                    <CardContent>
                                        <Typography variant="h6">{t('invoiceds')}</Typography>
                                        <ErrorField name={'invoiceds'} />
                                        <MSCTableField
                                            name="invoiceds"
                                            columns={['', `${t('itemtype')}`, `${t('itemcode')}`, `${t('unitprice')}`,
                                                `${t('quantity')}`, `${t('vatcode')}`, `${t('vatamount')}`,
                                                `${t('sctcode')}`, `${t('sctamount')}`, `${t('netamount')}`, `${t('explanation')}`, '']}
                                            disabled={getViewModeEx === 2 ? false : true}
                                        >
                                            <GetItem
                                                name={'$'}
                                                setSelectedItem={setSelectedItem}
                                                dataTaxes={dataTaxes?.taxes}
                                                getViewModeEx={getViewModeEx} />
                                        </MSCTableField>
                                        <div style={{ width: isMobile() ? '50%' : '40%', float: "right" }}>
                                            <div style={{ textAlign: "left", width: '45%', float: 'left' }} >
                                                <p>{t('Total')}</p>
                                            </div>
                                            <div style={{ textAlign: "right", width: '45%', float: 'right' }} >
                                                <p>{MSCCurrencyFormatter(total, selectedItem?.currency)}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                            {getViewModeEx === 3 ?
                                <Grid item xs={12} sm={12} lg={12} md={12}>
                                    <Card >
                                        <CardContent>
                                            <Typography variant={'h6'} style={{ marginBottom: '2%' }}>{t('paymentHistory')}</Typography>
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
                                        </CardContent>
                                    </Card>
                                </Grid> : null}
                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                <Card >
                                    <CardContent>
                                        <Typography variant="h6">{t('explanation')}</Typography>
                                        <AutoLabelField name={'explanation'} label={t('explanation')} disabled={getViewModeEx === 2 ? false : true} />
                                    </CardContent>
                                </Card>
                            </Grid>

                            <StakeholderSelectionDialog
                                name={'stakeholder'}
                                showModal={showStakeholderModal}
                                handleClose={handleCloseStakeholderModal}
                                stakeholdertype="V"
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
                                type={'V'}
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

export default Purchases; 