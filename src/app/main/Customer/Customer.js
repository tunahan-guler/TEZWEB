import React from 'react';
import { useTranslation } from 'react-i18next';
import MSCToolbar, { ViewMode } from '../../../@mscComponnent/CRUDPage/MSCToolbar'
import { AutoForm, ErrorField, HiddenField } from 'uniforms-material';
import AutoLabelField from '../../../@mscComponnent/UniformsComponnents/AutoLabelField';
import SelectLabelField from '../../../@mscComponnent/UniformsComponnents/SelectLabelField';
import { bridge as schema } from '../../../@mscComponnent/UniformsSchema/StakeholderSchema';
import {
    AddOrUpdateEnum, useAddOrUpdateStakeholderMutation, useDeleteStakeholderMutation, useGetCountriesLazyQuery,
    useGetCurrenciesQuery, useGetCitiesLazyQuery, useGetStakeholdersForAccountStatementLazyQuery
} from '../../../generated/graphql'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getViewModeFunc, getViewMode, changeViewMode } from '../../store/mscToolbar/mscToolbarSlice'
import { GetCountries, GetCurrencies, GetRowAndColumn, MSCMessage, GetCities } from '../../../@mscComponnent/Global/GlobalFunc'
import { Button, Typography } from '@mui/material';
import MSCTableField from '../../../@mscComponnent/UniformsComponnents/MSCTableField';
import { MSCReactTable } from '../../../@mscComponnent/MSCReactTable/MSCReactTable';
import MSCLookup from '../../../@mscComponnent/MSCInput/MSCLookup'
import FuseLoading from '../../../@fuse/core/FuseLoading'
import GetContacts from './SubComponents/GetContacts';
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

function Customer() {
    const visibleColumns = ['stakeholdercode', "stakeholdername", "paymentterm", "taxno", 'risklimit']
    const [getStakeholdersLazyQuery, { data, loading, error, refetch }] = useGetStakeholdersForAccountStatementLazyQuery();
    const [filterParams, setFilterParams] = useState({
        stakeholderCode: { filterType: "", parameter: "" },
        stakeholderName: { filterType: "", parameter: "" },
    })
    const [deleteStakeholderMutation, { data: deleteMutationData }] = useDeleteStakeholderMutation();
    const [customerType, setCustomerType] = useState('I');
    const getViewModeEx = useSelector(getViewMode) // 18042022 
    const { data: dataCurrencies } = useGetCurrenciesQuery();
    const [getCountriesLazyQuery, { data: dataCountries }] = useGetCountriesLazyQuery();
    const [getCitiesLazyQuery, { data: dataCities }] = useGetCitiesLazyQuery();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    let gridData = GetRowAndColumn(data?.stakeholdersForAccountStatement, visibleColumns);

    const dataRow = React.useMemo(
        () => gridData.rows,
        [gridData?.rows?.length, data]
    )

    const [searchText, setSearchText] = useState('')
    const [filterGlobal, setFilterGlobal] = useState()

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
    }, [getViewModeEx]);

    useEffect(() => {
        filterGlobal?.setGlobalFilter(searchText)
    }, [searchText])

    const [selectedData, setSelectedData] = useState({});

    useEffect(() => {
        if (selectedData?.tradetype)
            setCustomerType(selectedData?.tradetype);
    }, [selectedData]);

    const DoubleRowClick = (prmRowData, addOrUpdateStatus) => {
        setAddOrUpdate(addOrUpdateStatus); // kayıt modu belirleme
        getViewModeFuncEx(ViewMode.Update)
        const state = prmRowData;
        setSelectedData(state);
    }

    const { t } = useTranslation();
    const getViewModeFuncEx = useSelector(getViewModeFunc);
    const dispatch = useDispatch();

    const [addOrUpdate, setAddOrUpdate] = useState(AddOrUpdateEnum.Add)
    const [rowData, setRowData] = useState({})

    const [addOrUpdateStakeholderMutation, { data: dataMutation }] = useAddOrUpdateStakeholderMutation();

    const AddOrUpdate = (model, addOrUpdateStatus) => {
        addOrUpdateStakeholderMutation({
            variables: {
                addOrUpdate: addOrUpdateStatus,
                prmStakeholder: model
            }
        }).then(res => {
            console.log(res, "res");
            if (res.data.addOrUpdateStakeholder.resultType === "SUC") {
                MSCMessage(dispatch, 'success', "Kaydedildi")
                setRowData({});
                setSelectedData({});
                getViewModeFuncEx(ViewMode.Read);
                dispatch(changeViewMode(ViewMode.Read))
                refetch();
            } else {
                MSCMessage(dispatch, 'error', "Hata Oluştu.");
            }
        })
            .catch(err => console.log(err, "err"));
    }

    const UpdateButtonClick = (prmRowData, addOrUpdateStatus) => {
        setAddOrUpdate(addOrUpdateStatus); // kayıt modu belirleme
        getViewModeFuncEx(ViewMode.Update)
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
                stakeholderType: "C",
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
            onChangeModel={(model) => {
                setRowData(model);
                console.log('model', model);
            }}
            onSubmit={model => {
                AddOrUpdate(model, addOrUpdate);
                console.log(model, "submiited")
            }} >
            <MSCToolbar
                onAddButtonClick={() => { setAddOrUpdate(AddOrUpdateEnum.Add) }}
                filterSearch={setSearchText}
                queryList={GetStakeholders}
                SubmitComponnent={getViewModeEx === 3 ?
                    <MSCButton title={'Delete'}
                        onClick={() => { onDeleteButtonClick() }}
                    /> : null}
                headerName={t('Customers')}
                updateButtonDisabled={selectedData ? ((Object.keys(selectedData)?.length > 0 ? false : true)) : true}
                onUpdateButtonClick={() => {
                    UpdateButtonClick(selectedData, AddOrUpdateEnum.Update);
                }}
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
                        <ErrorField name={'paymentterm'} errorMessage={t('PaymenttermisRequired')} />
                        <ErrorField name={'shadbook.address'} errorMessage={t('AddressisRequired')} />
                        <ErrorField name={'shadbook.county'} errorMessage={t('CountyisRequired')} />
                        <ErrorField name={'shadbook.phone'} errorMessage={t('PhoneisRequired')} />
                        {
                            getViewModeEx === 2 ?
                                <>
                                    <HiddenField name={'stakeholderid'} value={0} />
                                    <HiddenField name={'stakeholdertype'} value={'C'} />
                                    <HiddenField name={'tradetype'} value={customerType} />
                                    <HiddenField name={'shcategory'} value={0} />
                                    <HiddenField name={'risklimit'} value={0} /></> : null}
                        <MSCLookup options={[{ label: t('Individual'), value: "I" }, { label: t('Corporate'), value: 'C' }]}
                            value={customerType} onChange={(e) => setCustomerType(e.target.value)} />
                        <AutoLabelField name="stakeholdercode" label={t('stakeholdercode')} disabled />
                        <AutoLabelField name="stakeholdername" label={t('stakeholdername')} />
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
                            getViewModeEx === 2 || !selectedData?.shadbook ?
                                <>
                                    <HiddenField name="shadbook.shadbookid" value={0} />
                                    <HiddenField name="shadbook.shadtype" value={customerType} />
                                </>
                                : null}
                        <AutoLabelField name="shadbook.address" label={t('address')} itemProps={{ inputProps: { maxLength: 250 } }} />
                        <AutoLabelField name="shadbook.countrykey" label={t('country')} options={GetCountries(dataCountries)}
                            itemProps={{ inputProps: { maxLength: 2 } }} />
                        <AutoLabelField name="shadbook.city" label={t('city')} options={GetCities(dataCities)} />
                        <AutoLabelField name="shadbook.county" label={t('county')} />
                        <AutoLabelField name="shadbook.postcode" label={t('postcode')} itemProps={{ inputProps: { maxLength: 10 } }} />
                        <AutoLabelField name="shadbook.phone" label={t('phone')} itemProps={{ inputProps: { maxLength: 15 } }} />
                        <AutoLabelField name="shadbook.fax" label={t('fax')} itemProps={{ inputProps: { maxLength: 15 } }} />
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

export default Customer; 