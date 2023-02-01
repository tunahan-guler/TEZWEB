import { useTranslation } from 'react-i18next';
import MSCToolbar, { ViewMode } from '../../../@mscComponnent/CRUDPage/MSCToolbar'
import { AutoForm, ErrorField, HiddenField } from 'uniforms-material';
import { bridge as schema } from './uniforms/PaymentTermsSchema';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getViewModeFunc, getViewMode, changeViewMode } from '../../store/mscToolbar/mscToolbarSlice'
import { GetRowAndColumn, MSCMessage } from '../../../@mscComponnent/Global/GlobalFunc'
import { AddOrUpdateEnum, useAddOrUpdatePaymentTermsMutation, useDeleteAcPaymentTermMutation, useGetAcPaymentTermsLazyQuery, useGetAcPaymentTermsQuery } from '../../../generated/graphql';
import { MSCReactTable } from '../../../@mscComponnent/MSCReactTable/MSCReactTable';
import AutoLabelField from '../../../@mscComponnent/UniformsComponnents/AutoLabelField';
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import FuseLoading from '../../../@fuse/core/FuseLoading';
import ConfirmModal from '../../../@mscComponnent/Modal/ConfirmModal';
import MaterialUiGridComp from '../../../@mscComponnent/MaterialuiGrid/MaterialUiGridComp';
import MSCTextField from '../../../@mscComponnent/MSCInput/MSCTextField'
import MSCButton from '../../../@mscComponnent/Buttons/MSCButton'
import MSCFilterInputs from '../../../@mscComponnent/MSCInput/MSCFilterInputs';

function PaymentTerms() {
    const { t } = useTranslation();
    const getViewModeFuncEx = useSelector(getViewModeFunc);
    const dispatch = useDispatch();
    const [addOrUpdate, setAddOrUpdate] = useState(AddOrUpdateEnum.Add);
    const [rowData, setRowData] = useState({});
    const [getAcPaymentTermsLazyQuery, { data, loading, error, refetch }] = useGetAcPaymentTermsLazyQuery();
    const [searchText, setSearchText] = useState('')
    const [filterGlobal, setFilterGlobal] = useState();
    const [selectedData, setSelectedData] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const getViewModeEx = useSelector(getViewMode); // 18042022 
    const [filterParams, setFilterParams] = useState({
        paymentTermCode: { filterType: "", parameter: "" },
        paymentTermDesc: { filterType: "", parameter: "" },
    })

    useEffect(() => {
        console.log('SearchTextExample', searchText)
        filterGlobal?.setGlobalFilter(searchText)
    }, [searchText]);

    useEffect(() => {
        if (getViewModeEx === 1) {
            setRowData({});
        }
    }, [getViewModeEx])

    const visibleColumns = ['paymentterm', 'paymenttermdesc', 'daycount', 'active']
    let gridData = GetRowAndColumn(data?.acPaymentTermsWithFilter, visibleColumns);

    const dataRow = React.useMemo(
        () => gridData.rows,
        [gridData?.rows?.length, data]
    )

    const [addOrUpdatePaymentTermsMutation, { data: dataMutation, loading: loadingAddOrUpdatePaymentTerms }] = useAddOrUpdatePaymentTermsMutation();
    const [deleteAcPaymentTermMutation, { data: deleteMutationData }] = useDeleteAcPaymentTermMutation();
    const AddOrUpdate = (model, addOrUpdateStatus) => {
        addOrUpdatePaymentTermsMutation({
            variables: {
                addOrUpdate: addOrUpdateStatus,
                AcPaymenttermInput: model
            }
        }).then(res => {
            if (res.data.addOrUpdatePaymentTerm.resultType === "SUC") {
                MSCMessage(dispatch, 'success', "Kaydedildi");
                setRowData({});
                setSelectedData({});
                getViewModeFuncEx(ViewMode.Read);
                dispatch(changeViewMode(ViewMode.Read))
                refetch();
            }
        })
            .catch(err => console.log(err, "err"))
    }

    const UpdateButtonClick = (prmRowData, addOrUpdateStatus) => {
        setAddOrUpdate(addOrUpdateStatus); // kayıt modu belirleme
        getViewModeFuncEx(ViewMode.Update)

    };

    if (loading || loadingAddOrUpdatePaymentTerms) {
        return <FuseLoading />
    }

    const onDeleteButtonClick = () => {
        setShowDeleteModal(true);
    }

    const onDeleteModalButtonClick = (paymentterm) => {
        deleteAcPaymentTermMutation({
            variables: {
                prmPaymentTerm: paymentterm
            }
        })
            .then(res => {
                if (res.data.deleteAcPaymentTerm.resultType === "SUC") {
                    MSCMessage(dispatch, 'success', "Kaydedildi");
                    setRowData({});
                    setSelectedData({});
                    getViewModeFuncEx(ViewMode.Read);
                    dispatch(changeViewMode(ViewMode.Read))
                    refetch();
                } else {
                    MSCMessage(dispatch, 'error', 'Hata Oluştu')
                }
            })
            .catch(err => console.log(err, "err"))
    }

    const GetAcPaymentTermsWithFilter = () => {
        getAcPaymentTermsLazyQuery({
            variables: {
                paymentTermCode:{ filterType: filterParams.paymentTermCode.filterType, parameter: filterParams.paymentTermCode.parameter },
                paymentTermDesc:{ filterType: filterParams.paymentTermDesc.filterType, parameter: filterParams.paymentTermDesc.parameter },
            }
        })
        setFilterParams({
            paymentTermCode:{ filterType: "", parameter: "" },
            paymentTermDesc:{ filterType: "", parameter: "" },
        })
    }

    return (

        <AutoForm
            schema={schema}
            model={getViewModeEx === 2 ? { ...rowData } : selectedData}
            onChangeModel={(model) => {
                setRowData(model);
                console.log(model, "model");
            }}
            onSubmit={model => {
                if (!model.daycount) {
                    model = Object.assign(model, { daycount: 0 })
                }
                AddOrUpdate(model, addOrUpdate);
                console.log(model, "submitted model")
            }}  >
            <MSCToolbar
                onAddButtonClick={e => setAddOrUpdate(AddOrUpdateEnum.Add)}
                filterSearch={setSearchText}
                queryList={GetAcPaymentTermsWithFilter}
                SubmitComponnent={
                    getViewModeEx === 3 ?
                        <MSCButton
                            title={"Delete"}
                            onClick={onDeleteButtonClick}
                        /> : null}
                headerName={t('PaymentTerms')}
                updateButtonDisabled={selectedData ? ((Object.keys(selectedData)?.length > 0 ? false : true)) : true}
                onUpdateButtonClick={() => {
                    UpdateButtonClick(selectedData, AddOrUpdateEnum.Update);
                }}
                ReadComponnent={
                    <div style={{ width: '100%' }}>
                        <MSCReactTable
                            selection
                            columns={[
                                { accessor: "paymentterm", Header: t('paymenttermcode') },
                                { accessor: "paymenttermdesc", Header: t('paymenttermdesc') },
                                { accessor: "daycount", Header: t('daycount') },
                                {
                                    accessor: (row) => {
                                        if (row.active === true) {
                                            return <CheckIcon />
                                        }
                                        else {
                                            return <ClearIcon />
                                        }
                                    }, Header: t('active')
                                },
                            ]}
                            data={dataRow}
                            SelectRowData={(e) => { setSelectedData(e) }}
                            onRowClicked={e => { console.log(e, "e") }}
                            globalFilterTable={(preGlobalFilteredRows, setGlobalFilter, globalFilter) => {
                                setFilterGlobal({ ...filterGlobal, setGlobalFilter })
                            }}
                        />
                    </div>
                }
                SearchComponent={
                    <MaterialUiGridComp
                        children={[
                            <MSCFilterInputs label={t('paymenttermcode')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, paymentTermCode:{...filterParams.paymentTermCode, parameter:e.target.value}})} 
                            onFilterTypeChange={(e) => setFilterParams({ ...filterParams, paymentTermCode:{...filterParams.paymentTermCode, filterType:e.target.value}})}/>,
                            <MSCFilterInputs label={t('paymenttermdesc')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, paymentTermDesc:{...filterParams.paymentTermDesc, parameter:e.target.value}})} 
                            onFilterTypeChange={(e) => setFilterParams({ ...filterParams, paymentTermDesc:{...filterParams.paymentTermDesc, filterType:e.target.value}})}/>,
                        ]}
                    />
                }
                CreateOrUpdateComponnent={
                    <div>
                        <ErrorField name="paymentterm" errorMessage={t('PaymentTermCodeIsRequired')} />
                        <AutoLabelField name="paymentterm" label={t('paymenttermcode')} itemProps={{ inputProps: { maxLength: 4 } }}
                            disabled={getViewModeEx === 2 ? false : true} />
                        <AutoLabelField name="paymenttermdesc" label={t('paymenttermdesc')} itemProps={{ inputProps: { maxLength: 50 } }} />
                        <AutoLabelField name="paymenttermtype" label={t('paymenttermtype')} options={[{ label: t('Cash'), value: 'C' },
                        { label: t('term'), value: 'T' }]} />
                        <HiddenField name="maindate" value={"1"} />
                        <AutoLabelField name="daycount" label={t('daycount')} />
                        <HiddenField name="fixedday" value={1} />
                        <AutoLabelField name="active" label={t('active')} />
                    </div>
                }
            />
            <ConfirmModal
                handleClose={() => { setShowDeleteModal(false) }}
                showModal={showDeleteModal}
                onYesButtonClick={() => onDeleteModalButtonClick(selectedData?.paymentterm)}
            />
        </AutoForm>
    );
}

export default PaymentTerms; 