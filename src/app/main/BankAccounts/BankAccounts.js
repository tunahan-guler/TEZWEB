import { useTranslation } from 'react-i18next';
import MSCToolbar, { ViewMode } from '../../../@mscComponnent/CRUDPage/MSCToolbar'
import { AutoForm, ErrorField, HiddenField } from 'uniforms-material';
import { bridge as schema } from './uniforms/BankAccountsSchema';
import { AddOrUpdateEnum, useAddOrUpdateAcBankAccountMutation, useGetCurrenciesQuery, useDeleteAcBankAccountMutation, useGetAcBankAccountsLazyQuery } from '../../../generated/graphql'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getViewModeFunc, getViewMode, changeViewMode } from '../../store/mscToolbar/mscToolbarSlice'
import { GetCurrencies, GetRowAndColumn, MSCMessage } from '../../../@mscComponnent/Global/GlobalFunc'
import { MSCReactTable } from '../../../@mscComponnent/MSCReactTable/MSCReactTable';
import AutoLabelField from '../../../@mscComponnent/UniformsComponnents/AutoLabelField';
import FuseLoading from '../../../@fuse/core/FuseLoading';
import { Button } from '@mui/material';
import ConfirmModal from '../../../@mscComponnent/Modal/ConfirmModal';
import MaterialUiGridComp from '../../../@mscComponnent/MaterialuiGrid/MaterialUiGridComp';
import MSCButton from '../../../@mscComponnent/Buttons/MSCButton'
import MSCFilterInputs from '../../../@mscComponnent/MSCInput/MSCFilterInputs';

function BankAccounts() {
    const { t } = useTranslation();
    const getViewModeFuncEx = useSelector(getViewModeFunc);
    const getViewModeEx = useSelector(getViewMode); // 18042022 
    const dispatch = useDispatch();
    const [getAcBankAccountsLazyQuery, { data, loading, error, refetch }] = useGetAcBankAccountsLazyQuery();
    const [searchText, setSearchText] = useState('')
    const [filterGlobal, setFilterGlobal] = useState();
    const [selectedData, setSelectedData] = useState({});
    const { data: dataCurrencies, loading: loadingCurrencies } = useGetCurrenciesQuery();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [filterParams, setFilterParams] = useState({
        bankAccountCode: { filterType: "", parameter: "" },
        bankAccountName: { filterType: "", parameter: "" },
        bankCode: { filterType: "", parameter: "" }
    })

    useEffect(() => {
        filterGlobal?.setGlobalFilter(searchText)
    }, [searchText]);

    const visibleColumns = ['bankaccountcode', "bankaccountname", "bankcode", "branchcode", "currency"]

    let gridData = GetRowAndColumn(data?.acBankaccountsWithFilterType, visibleColumns);

    const dataRow = React.useMemo(
        () => gridData.rows,
        [gridData?.rows?.length, data]
    )
    const [addOrUpdate, setAddOrUpdate] = useState(AddOrUpdateEnum.Add)
    const [rowData, setRowData] = useState({})
    const [addOrUpdateAcBankAccountMutation, { data: dataMutation, loading: loadingAcBankAccount }] = useAddOrUpdateAcBankAccountMutation();
    const [deleteAcBankAccountMutation, { data: deleteMutationData }] = useDeleteAcBankAccountMutation();

    useEffect(() => {
        if (getViewModeEx === 1) {
            setRowData({});
        }
    }, [getViewModeEx])

    const AddOrUpdate = (model, addOrUpdateStatus) => {
        addOrUpdateAcBankAccountMutation({
            variables: {
                addOrUpdate: addOrUpdateStatus,
                prmAcBankAccount: model
            }
        }).then(res => {
            if (res.data.addOrUpdateAcBankAccount.resultType === "SUC") {
                MSCMessage(dispatch, 'success', "Kaydedildi.");
                setRowData({});
                setSelectedData({});
                getViewModeFuncEx(ViewMode.Read);
                dispatch(changeViewMode(ViewMode.Read))
                refetch();
            } else {
                MSCMessage(dispatch, 'error', res.data.addOrUpdateAcBankAccount.messageText);
            }
        })
            .catch(err => console.log(err, "err"))
    }

    const UpdateButtonClick = (prmRowData, addOrUpdateStatus) => {
        setAddOrUpdate(addOrUpdateStatus); // kayıt modu belirleme
        getViewModeFuncEx(ViewMode.Update)
        // dispatch(changeViewMode(ViewMode.Update))

    };

    if (loading || loadingAcBankAccount || loadingCurrencies) {
        return <FuseLoading />
    }


    const onDeleteButtonClick = () => {
        setShowDeleteModal(true);
    }

    const onDeleteModalButtonClick = (plantid, bankaccountcode) => {
        deleteAcBankAccountMutation({
            variables: {
                prmPlantId: plantid,
                prmAcBankAccountCode: bankaccountcode
            }
        })
            .then(res => {
                if (res.data.deleteAcBankAccount.resultType === "SUC") {
                    MSCMessage(dispatch, 'success', "Kaydedildi.");
                    setRowData({});
                    setSelectedData({});
                    getViewModeFuncEx(ViewMode.Read);
                    dispatch(changeViewMode(ViewMode.Read))
                    refetch();
                } else {
                    MSCMessage(dispatch, 'error', "Hata Oluştu");
                }
            })
            .catch(err => console.log(err, "err"))
    }

    const GetAcBankAccountsWithFilter = () => {
        getAcBankAccountsLazyQuery({
            variables: {
                bankAccountCode: { filterType: filterParams.bankAccountCode.filterType, parameter: filterParams.bankAccountCode.parameter },
                bankAccountName: { filterType: filterParams.bankAccountName.filterType, parameter: filterParams.bankAccountName.parameter },
                bankCode: { filterType: filterParams.bankCode.filterType, parameter: filterParams.bankCode.parameter }
            }
        })
        setFilterParams({
            bankAccountCode: { filterType: "", parameter: "" },
            bankAccountName: { filterType: "", parameter: "" },
            bankCode: { filterType: "", parameter: "" }
        })
    }

    return (

        <AutoForm
            schema={schema}
            model={(getViewModeEx === 2) ? { ...rowData, currency: 'TRY', plantid: 1, bankaccounttypeid: 1 } :
                { ...selectedData }}
            onChangeModel={(model) => {
                setRowData(model);
                console.log(model, "model");
            }}
            onSubmit={model => {
                AddOrUpdate(model, addOrUpdate);
                console.log(model, "submitted model")
            }} >
            <MSCToolbar
                viewMode={ViewMode.Read}
                onAddButtonClick={() => { setAddOrUpdate(AddOrUpdateEnum.Add) }}
                filterSearch={setSearchText}
                headerName={t('BankAccounts')}
                queryList={GetAcBankAccountsWithFilter}
                updateButtonDisabled={selectedData ? ((Object.keys(selectedData)?.length > 0 ? false : true)) : true}
                onUpdateButtonClick={() => {
                    UpdateButtonClick(selectedData, AddOrUpdateEnum.Update);
                }}
                SubmitComponnent={
                    getViewModeEx === 3 ?
                        <MSCButton
                            title={"Delete"}
                            onClick={() => { onDeleteButtonClick() }}
                        /> : null}
                ReadComponnent={
                    <div style={{ width: '100%' }}>
                        <MSCReactTable
                            selection
                            columns={[
                                { accessor: 'bankaccountcode', Header: t('bankaccountcode') },
                                { accessor: 'bankaccountname', Header: t('bankaccountname') },
                                { accessor: 'bankcode', Header: t('bankcode') },
                                { accessor: 'branchcode', Header: t('branchcode') },
                                { accessor: 'currency', Header: t('currency') }
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
                            <MSCFilterInputs label={t('bankaccountcode')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, bankAccountCode: { ...filterParams.bankAccountCode, parameter: e.target.value } })}
                                onFilterTypeChange={(e) => setFilterParams({ ...filterParams, bankAccountCode: { ...filterParams.bankAccountCode, filterType: e.target.value } })} />,
                            <MSCFilterInputs label={t('bankaccountname')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, bankAccountName: { ...filterParams.bankAccountName, parameter: e.target.value } })}
                                onFilterTypeChange={(e) => setFilterParams({ ...filterParams, bankAccountName: { ...filterParams.bankAccountName, filterType: e.target.value } })} />,
                            <MSCFilterInputs label={t('bankcode')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, bankCode: { ...filterParams.bankCode, parameter: e.target.value } })}
                                onFilterTypeChange={(e) => setFilterParams({ ...filterParams, bankCode: { ...filterParams.bankCode, filterType: e.target.value } })} />,
                        ]}
                    />
                }
                CreateOrUpdateComponnent={
                    <div>
                        <ErrorField name="plantid" />
                        <HiddenField name="plantid" />
                        <ErrorField name="bankaccountcode" errorMessage={t('BankAccountCodeIsRequired')} />
                        <AutoLabelField name="bankaccountcode" label={t('bankaccountcode')}
                            disabled={getViewModeEx === 2 ? false : true} />
                        <AutoLabelField name="bankaccountname" label={t('bankaccountname')} />
                        <AutoLabelField name="bankcode" label={t('bankcode')} />
                        <AutoLabelField name="branchcode" label={t('branchcode')} itemProps={{ inputProps: { maxLength: 6 } }} />
                        <HiddenField name="bankaccounttypeid" value={1} />
                        <AutoLabelField name="creditcard" label={t('creditcard')} />
                        <AutoLabelField name="currency" options={GetCurrencies(dataCurrencies)} label={t('currency')} />
                        <AutoLabelField name="accountno" label={t('accountno')} />
                        <AutoLabelField name="ibanno" label={t('ibanno')} />
                        <HiddenField name="bastat" value={'A'} />
                    </div>
                }
            />
            <ConfirmModal
                handleClose={() => { setShowDeleteModal(false) }}
                showModal={showDeleteModal}
                onYesButtonClick={() => onDeleteModalButtonClick(selectedData?.plantid, selectedData?.bankaccountcode)}
            />
        </AutoForm>
    );
}

export default BankAccounts; 