import React from 'react';
import { useTranslation } from 'react-i18next';
import MSCToolbar, { ViewMode } from '../../../@mscComponnent/CRUDPage/MSCToolbar'
import { AutoForm, ListDelField, HiddenField, ErrorField } from 'uniforms-material';
import AutoLabelField from '../../../@mscComponnent/UniformsComponnents/AutoLabelField';
import SelectLabelField from '../../../@mscComponnent/UniformsComponnents/SelectLabelField';
import { bridge as schema } from '../../../@mscComponnent/UniformsSchema/StakeholderSchema';
import {
    AddOrUpdateEnum, useAddOrUpdateStakeholderMutation, useGetCurrenciesQuery, useDeleteStakeholderMutation,
    useGetCitiesLazyQuery, useGetCountriesLazyQuery, useGetStakeholdersForAccountStatementLazyQuery
} from '../../../generated/graphql'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getViewModeFunc, changeViewMode, getViewMode } from '../../store/mscToolbar/mscToolbarSlice'
import { GetCities, GetCountries, GetCurrencies, GetRowAndColumn, MSCMessage } from '../../../@mscComponnent/Global/GlobalFunc'
import { Button, Typography } from '@mui/material';
import { MSCReactTable } from '../../../@mscComponnent/MSCReactTable/MSCReactTable';
import MSCTableField from '../../../@mscComponnent/UniformsComponnents/MSCTableField';
import FuseLoading from '../../../@fuse/core/FuseLoading'
import MSCLookup from '../../../@mscComponnent/MSCInput/MSCLookup'
import GetContacts from '../Customer/SubComponents/GetContacts';
import ConfirmModal from '../../../@mscComponnent/Modal/ConfirmModal';
import MaterialUiGridComp from '../../../@mscComponnent/MaterialuiGrid/MaterialUiGridComp';
import MSCTextField from '../../../@mscComponnent/MSCInput/MSCTextField'
import MSCButton from '../../../@mscComponnent/Buttons/MSCButton'
import MSCFilterInputs from '../../../@mscComponnent/MSCInput/MSCFilterInputs';

const StakeholderJSON = {
    currency: "TRY",
    shadbook: {
        countrykey: 'TR'
    }
}

function Supplier() {
    const { t } = useTranslation();
    const getViewModeFuncEx = useSelector(getViewModeFunc);
    const dispatch = useDispatch();
    const [deleteStakeholderMutation, { data: deleteMutationData }] = useDeleteStakeholderMutation();
    const getViewModeEx = useSelector(getViewMode); // 18042022 
    const [searchText, setSearchText] = useState('')
    const [filterGlobal, setFilterGlobal] = useState()
    const { data: dataCurrencies } = useGetCurrenciesQuery();
    const [selectedData, setSelectedData] = useState({});
    const [addOrUpdate, setAddOrUpdate] = useState(AddOrUpdateEnum.Add)
    const [rowData, setRowData] = useState({})
    const [addOrUpdateStakeholderMutation, { data: dataMutation }] = useAddOrUpdateStakeholderMutation();
    const [customerType, setCustomerType] = useState('I');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [getCountriesLazyQuery, { data: dataCountries }] = useGetCountriesLazyQuery();
    const [getCitiesLazyQuery, { data: dataCities }] = useGetCitiesLazyQuery();
    const [getStakeholdersLazyQuery, { data, loading, error, refetch }] = useGetStakeholdersForAccountStatementLazyQuery();
    const [filterParams, setFilterParams] = useState({
        stakeholderCode: { filterType: "", parameter: "" },
        stakeholderName: { filterType: "", parameter: "" },
    })
    const visibleColumns = ['stakeholdercode', "stakeholdername", "paymentterm", "taxno", 'risklimit']
    let gridData = GetRowAndColumn(data?.stakeholdersForAccountStatement, visibleColumns);

    useEffect(() => {
        if (selectedData?.tradetype)
            setCustomerType(selectedData?.tradetype);
    }, [selectedData])

    const dataRow = React.useMemo(
        () => gridData.rows,
        [gridData?.rows?.length, data]
    )

    useEffect(() => {
        if (getViewModeEx === 1) {
            setRowData({});
        }
        else if (getViewModeEx === 2 || getViewModeEx === 3) {
            getCountriesLazyQuery().then(() => {
                getCitiesLazyQuery({
                    variables: {
                        prmCountryKey: "TR"
                    }
                })
            })
        }
    }, [getViewModeEx])

    useEffect(() => {
        filterGlobal?.setGlobalFilter(searchText)
    }, [searchText])

    const DoubleRowClick = (prmRowData, addOrUpdateStatus) => {
        setAddOrUpdate(addOrUpdateStatus); // kayıt modu belirleme
        getViewModeFuncEx(ViewMode.Update)
    }

    const AddOrUpdate = (model, addOrUpdateStatus) => {
        addOrUpdateStakeholderMutation({
            variables: {
                addOrUpdate: addOrUpdateStatus,
                prmStakeholder: model
            }
        }).then(res => {
            console.log(res, "res");
            if (res.data.addOrUpdateStakeholder.resultType === "SUC") {
                MSCMessage(dispatch, 'success', "Kaydedildi.")
                getViewModeFuncEx(ViewMode.Read);
                dispatch(changeViewMode(ViewMode.Read))
                setSelectedData({});
                setRowData({});
                refetch();
            } else {
                MSCMessage(dispatch, 'error', "Hata Oluştu")
            }
        })
            .catch(err => console.log(err, "err"))
    }

    const UpdateButtonClick = (prmRowData, addOrUpdateStatus) => {
        setAddOrUpdate(addOrUpdateStatus); // kayıt modu belirleme
        getViewModeFuncEx(ViewMode.Update);
        const state = prmRowData;
        if (state.shadbook === null) {
            delete state.shadbook;
        }
        setSelectedData(state);
    };

    if (loading) {
        return <FuseLoading />
    }

    const onDeleteButtonClick = () => {
        setShowDeleteModal(true);
    }

    const onDeleteModalButtonClick = (stakeholderid) => {
        deleteStakeholderMutation({
            variables: {
                prmStakeholderId: stakeholderid
            }
        })
            .then(res => {
                if (res.data.deleteStakeholder.resultType === "SUC") {
                    MSCMessage(dispatch, 'success', "Kaydedildi")
                    setRowData({});
                    setSelectedData({});
                    getViewModeFuncEx(ViewMode.Read);
                    dispatch(changeViewMode(ViewMode.Read))
                    refetch();
                } else {
                    MSCMessage(dispatch, 'error', "Hata Oluştu")
                }
            })
            .catch(err => console.log(err, "err"))
    }

    const GetStakeholders = () => {
        getStakeholdersLazyQuery({
            variables: {
                stakeholderCode: { filterType: filterParams.stakeholderCode.filterType, parameter: filterParams.stakeholderCode.parameter },
                stakeholderName: { filterType: filterParams.stakeholderName.filterType, parameter: filterParams.stakeholderName.parameter },
                stakeholderType: "V",
            }
        })
        setFilterParams({
            stakeholderCode: { filterType: "", parameter: "" },
            stakeholderName: { filterType: "", parameter: "" },
        })
    }

    return (

        <AutoForm
            schema={schema}
            model={addOrUpdate === "ADD" ? StakeholderJSON : selectedData}
            onChangeModel={(model) => { setRowData(model) }}
            onSubmit={model => {
                AddOrUpdate(model, addOrUpdate)
            }} >
            <MSCToolbar
                onAddButtonClick={() => { setAddOrUpdate(AddOrUpdateEnum.Add) }}
                filterSearch={setSearchText}
                headerName={t('Suppliers')}
                queryList={GetStakeholders}
                updateButtonDisabled={selectedData ? ((Object.keys(selectedData)?.length > 0 ? false : true)) : true}
                onUpdateButtonClick={() => {
                    UpdateButtonClick(selectedData, AddOrUpdateEnum.Update);
                }}
                SubmitComponnent={getViewModeEx === 3 ?
                    <MSCButton title={'Delete'}
                        onClick={() => { onDeleteButtonClick() }}
                    /> : null}
                ReadComponnent={
                    <div style={{ width: '100%' }}>
                        <MSCReactTable
                            selection
                            columns={[
                                { accessor: 'stakeholdercode', Header: t('stakeholdercode') },
                                { accessor: 'stakeholdername', Header: t('stakeholdername') },
                                { accessor: 'paymentterm', Header: t('paymentterm') },
                                { accessor: 'taxno', Header: t('taxno') },
                                { accessor: 'risklimit', Header: t('risklimit') },
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
                            <MSCFilterInputs label={t('stakeholdercode')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, stakeholderCode: { ...filterParams.stakeholderCode, parameter: e.target.value } })}
                                onFilterTypeChange={(e) => setFilterParams({ ...filterParams, stakeholderCode: { ...filterParams.stakeholderCode, filterType: e.target.value } })} />,
                            <MSCFilterInputs label={t('stakeholdername')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, stakeholderName: { ...filterParams.stakeholderName, parameter: e.target.value } })}
                                onFilterTypeChange={(e) => setFilterParams({ ...filterParams, stakeholderName: { ...filterParams.stakeholderName, filterType: e.target.value } })} />,
                        ]}
                    />
                }
                CreateOrUpdateComponnent={
                    <div>
                        {
                            getViewModeEx === 2 ?
                                <>
                                    <HiddenField name={'stakeholderid'} value={0} />
                                    <HiddenField name={'stakeholdertype'} value={'V'} />
                                    <HiddenField name={'tradetype'} value={'V'} />
                                    <HiddenField name={'shcategory'} value={0} />
                                    <HiddenField name={'risklimit'} value={0} /> </> : null}
                        <ErrorField name={'paymentterm'} errorMessage={t('PaymenttermisRequired')} />
                        <ErrorField name={'shadbook.address'} errorMessage={t('AddressisRequired')} />
                        <ErrorField name={'shadbook.county'} errorMessage={t('CountyisRequired')} />
                        <ErrorField name={'shadbook.phone'} errorMessage={t('PhoneisRequired')} />
                        <MSCLookup options={[{ label: t('Individual'), value: "I" }, { label: t('Corporate'), value: 'C' }]}
                            value={customerType} onChange={(e) => setCustomerType(e.target.value)} />
                        <AutoLabelField name="stakeholdercode" label={t('suppliercode')} />
                        <AutoLabelField name="stakeholdername" label={t('suppliername')} />
                        {
                            customerType === "I" ?
                                <>
                                    <AutoLabelField name="iname" label={t('iname')} />
                                    <AutoLabelField name="isurname" label={t('isurname')} />
                                    <AutoLabelField name="identityno" label={t('identityno')} itemProps={{ inputProps: { maxLength: 11 } }} />

                                </> : <>
                                    <AutoLabelField name="taxoffice" label={t('taxoffice')} />
                                    <AutoLabelField name="taxno" label={t('taxno')} />
                                </>
                        }
                        <SelectLabelField name="currency" options={GetCurrencies(dataCurrencies)} label={t('currency')} />
                        <AutoLabelField name="paymentterm" label={t('paymentterm')} />
                        <Typography style={{ fontWeight: 'bolder' }} mt={'1%'}>{t('address')}</Typography>
                        {
                            getViewModeEx === 2 ?
                                <>
                                    <HiddenField name="shadbook.shadbookid" value={0} />
                                    <HiddenField name="shadbook.shadtype" value={customerType} /> </> : null}
                        <AutoLabelField name="shadbook.address" label={t('address')} />
                        <AutoLabelField name="shadbook.countrykey" label={t('country')} options={GetCountries(dataCountries)} />
                        <AutoLabelField name="shadbook.city" label={t('city')} options={GetCities(dataCities)} />
                        <AutoLabelField name="shadbook.county" label={t('county')} />
                        <AutoLabelField name="shadbook.postcode" label={t('postcode')} />
                        <AutoLabelField name="shadbook.phone" label={t('phone')} />
                        <AutoLabelField name="shadbook.fax" label={t('fax')} />
                        <AutoLabelField name="shadbook.email" label={t('Email')} />
                        <Typography style={{ fontWeight: 'bolder' }} mt={'1%'}>{t('contactinformation')}</Typography>
                        <MSCTableField
                            name="stakeholdercontacts"
                            columns={[`${t('contactname')}`, `${t('contactemail')}`, `${t('contactmobile')}`,
                            `${t('contactphone')}`, `${t('contactrole')}`, `${t('contactnotes')}`, '']}
                        >
                            <GetContacts name={'$'} />
                        </MSCTableField>
                    </div>
                }
            />
            <ConfirmModal
                handleClose={() => { setShowDeleteModal(false) }}
                showModal={showDeleteModal}
                onYesButtonClick={() => onDeleteModalButtonClick(selectedData?.stakeholderid)}
            />
        </AutoForm>
    );
}

export default Supplier; 