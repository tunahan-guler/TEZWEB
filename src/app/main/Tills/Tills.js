import { useTranslation } from 'react-i18next';
import MSCToolbar, { ViewMode } from '../../../@mscComponnent/CRUDPage/MSCToolbar'
import { AutoForm, ErrorField, HiddenField } from 'uniforms-material';
import { bridge as schema } from './uniforms/TillsSchema';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getViewModeFunc, getViewMode, changeViewMode } from '../../store/mscToolbar/mscToolbarSlice'
import { GetCurrencies, GetRowAndColumn, MSCMessage } from '../../../@mscComponnent/Global/GlobalFunc'
import { AddOrUpdateEnum, useAddOrUpdateAcTillMutation, useGetCurrenciesQuery, useDeleteAcTillsMutation, useGetAcTillsLazyQuery } from '../../../generated/graphql';
import { MSCReactTable } from '../../../@mscComponnent/MSCReactTable/MSCReactTable';
import AutoLabelField from '../../../@mscComponnent/UniformsComponnents/AutoLabelField';
import FuseLoading from '../../../@fuse/core/FuseLoading';
import ConfirmModal from '../../../@mscComponnent/Modal/ConfirmModal'
import MaterialUiGridComp from '../../../@mscComponnent/MaterialuiGrid/MaterialUiGridComp';
import MSCTextField from '../../../@mscComponnent/MSCInput/MSCTextField';
import MSCButton from '../../../@mscComponnent/Buttons/MSCButton'
import MSCFilterInputs from '../../../@mscComponnent/MSCInput/MSCFilterInputs';

function Tills() {
    const { t } = useTranslation();
    const getViewModeFuncEx = useSelector(getViewModeFunc);
    const dispatch = useDispatch();
    const [addOrUpdate, setAddOrUpdate] = useState(AddOrUpdateEnum.Add)
    const getViewModeEx = useSelector(getViewMode); // 18042022 
    const [rowData, setRowData] = useState({})
    const [getAcTillsLazyQuery, { data, loading, error, refetch }] = useGetAcTillsLazyQuery();
    const [selectedData, setSelectedData] = useState({});
    const [searchText, setSearchText] = useState('')
    const [filterGlobal, setFilterGlobal] = useState();
    const [addOrUpdateAcTillMutation, { data: dataMutation, loading: loadingAddOrUpdateAcTill }] = useAddOrUpdateAcTillMutation();
    const [deleteAcTillsMutation, { data: deleteMutationData }] = useDeleteAcTillsMutation();
    const { data: dataCurrencies, loading: loadingCurrencies } = useGetCurrenciesQuery();
    const [filterParams, setFilterParams] = useState({
        tillCode: { filterType: "", parameter: "" },
        tillName: { filterType: "", parameter: "" },
    })
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const visibleColumns = ['tillcode', 'tillname', 'currency']
    let gridData = GetRowAndColumn(data?.acTillsWithFilter, visibleColumns);

    const dataRow = React.useMemo(
        () => gridData.rows,
        [gridData?.rows?.length, data]
    )

    useEffect(() => {
        if (getViewModeEx === 1) {
            setRowData({});
        }
    }, [getViewModeEx])

    useEffect(() => {
        console.log('SearchTextExample', searchText)
        filterGlobal?.setGlobalFilter(searchText)
    }, [searchText]);

    const AddOrUpdate = (model, addOrUpdateStatus) => {
        addOrUpdateAcTillMutation({
            variables: {
                addOrUpdate: addOrUpdateStatus,
                prmAcTill: model
            }
        }).then(res => {
            console.log(res, "res");
            if (res?.data?.addOrUpdateTill?.resultType === "SUC") {
                MSCMessage(dispatch, 'success', 'Kaydedildi')
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
        getViewModeFuncEx(ViewMode.Update);
    };

    if (loading || loadingAddOrUpdateAcTill || loadingCurrencies) {
        return <FuseLoading />
    }

    const onDeleteButtonClick = () => {
        setShowDeleteModal(true);
    }

    const onDeleteModalButtonClick = (plantid, tillcode) => {
        deleteAcTillsMutation({
            variables: {
                prmPlantId: plantid,
                prmAcTillCode: tillcode
            }
        })
            .then(res => {
                if (res.data.deleteAcTills.resultType === "SUC") {
                    MSCMessage(dispatch, 'success', "Kaydedildi.")
                    refetch();
                    setRowData({});
                    setSelectedData({});
                    getViewModeFuncEx(ViewMode.Read);
                    dispatch(changeViewMode(ViewMode.Read))
                    refetch();
                }
                else {
                    MSCMessage(dispatch, 'error', "Hata Oluştu.")
                }
            })
            .catch(err => console.log(err, "err"))
    }

    const GetAcTillsWithFilter = () => {
        getAcTillsLazyQuery({
            variables: {
                tillCode: { filterType: filterParams.tillCode.filterType, parameter: filterParams.tillCode.parameter },
                tillName: { filterType: filterParams.tillName.filterType, parameter: filterParams.tillName.filterType },
            }
        })

        setFilterParams({
            tillCode: { filterType: "", parameter: "" },
            tillName: { filterType: "", parameter: "" },
        })
    }

    return (

        <AutoForm
            schema={schema}
            model={(getViewModeEx === 2) ? { ...rowData, currency: 'TRY', plantid: 1 } : selectedData}
            onChangeModel={(model) => {
                setRowData(model)
            }}
            onSubmit={model => {
                AddOrUpdate(model, addOrUpdate);
                console.log(model, "submittedmodel");
            }} >
            <MSCToolbar
                onAddButtonClick={() => { setAddOrUpdate(AddOrUpdateEnum.Add) }}
                viewMode={ViewMode.Read}
                filterSearch={setSearchText}
                queryList={GetAcTillsWithFilter}
                SubmitComponnent={
                    getViewModeEx === 3 ?
                        <MSCButton
                            title={"Delete"}
                            onClick={() => { onDeleteButtonClick() }}
                        /> : null}
                headerName={t('Tills')}
                updateButtonDisabled={selectedData ? ((Object.keys(selectedData)?.length > 0 ? false : true)) : true}
                onUpdateButtonClick={() => {
                    UpdateButtonClick(selectedData, AddOrUpdateEnum.Update);
                }}
                ReadComponnent={
                    <div style={{ width: '100%' }}>
                        <MSCReactTable
                            selection
                            columns={[
                                { accessor: 'tillcode', Header: t('tillcode') },
                                { accessor: 'tillname', Header: t('tillname') },
                                { accessor: 'currency', Header: t('currency') },
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
                            <MSCFilterInputs label={t('tillcode')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, tillCode: { ...filterParams.tillCode, parameter: e.target.value } })}
                                onFilterTypeChange={(e) => setFilterParams({ ...filterParams, tillCode: { ...filterParams.tillCode, filterType: e.target.value } })} />,
                            <MSCFilterInputs label={t('tillname')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, tillName: { ...filterParams.tillName, parameter: e.target.value } })}
                                onFilterTypeChange={(e) => setFilterParams({ ...filterParams, tillName: { ...filterParams.tillName, filterType: e.target.value } })} />,
                        ]}
                    />
                }
                CreateOrUpdateComponnent={
                    <div>
                        <HiddenField name="plantid" />
                        <ErrorField name="tillcode" errorMessage={t('TillCodeIsRequired')} />
                        <AutoLabelField name="tillcode" label={t('tillcode')} disabled={getViewModeEx === 2 ? false : true} />
                        <AutoLabelField name="tillname" label={t('tillname')} />
                        <AutoLabelField name="currency" options={GetCurrencies(dataCurrencies)} label={t('currency')} />
                        <AutoLabelField name="tstat" label={t('status')} options={[{ label: t('Active'), value: 'A' },
                        { label: t('Inactive'), value: 'I' }]} />
                    </div>
                }
            />
            <ConfirmModal
                handleClose={() => { setShowDeleteModal(false) }}
                showModal={showDeleteModal}
                onYesButtonClick={() => onDeleteModalButtonClick(selectedData?.plantid, selectedData?.tillcode)}
            />
        </AutoForm>
    );
}

export default Tills; 