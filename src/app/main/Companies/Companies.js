import { useTranslation } from 'react-i18next';
import MSCToolbar, { ViewMode } from '../../../@mscComponnent/CRUDPage/MSCToolbar'
import { AutoForm, ErrorField, HiddenField, } from 'uniforms-material';
import { bridge as schema } from './uniforms/CompaniesSchema';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getViewModeFunc, getViewMode, changeViewMode } from '../../store/mscToolbar/mscToolbarSlice'
import { GetRowAndColumn, MSCMessage } from '../../../@mscComponnent/Global/GlobalFunc'
import { AddOrUpdateEnum, useGetCompaniesQuery, useAddOrUpdateCompanyMutation, useDeleteCompanyMutation } from '../../../generated/graphql';
import { MSCReactTable } from '../../../@mscComponnent/MSCReactTable/MSCReactTable';
import AutoLabelField from '../../../@mscComponnent/UniformsComponnents/AutoLabelField';
import FuseLoading from '../../../@fuse/core/FuseLoading';
import { Button, Grid } from '@mui/material';
import ConfirmModal from '../../../@mscComponnent/Modal/ConfirmModal';
import MSCButton from '../../../@mscComponnent/Buttons/MSCButton'

function Companies() {
    const { t } = useTranslation();
    const getViewModeFuncEx = useSelector(getViewModeFunc);
    const dispatch = useDispatch();
    const getViewModeEx = useSelector(getViewMode); // 18042022 
    const [addOrUpdate, setAddOrUpdate] = useState(AddOrUpdateEnum.Add)
    const [rowData, setRowData] = useState({})
    const { data, loading, error, refetch } = useGetCompaniesQuery();
    const [selectedData, setSelectedData] = useState({});
    const [searchText, setSearchText] = useState('')
    const [filterGlobal, setFilterGlobal] = useState();
    const [deleteCompanyMutation, { data: deleteMutationData }] = useDeleteCompanyMutation();
    const [addOrUpdateCompanyMutation, { data: dataMutation }] = useAddOrUpdateCompanyMutation();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const visibleColumns = ['tillcode', 'tillname', 'currency']
    let gridData = GetRowAndColumn(data?.companies, visibleColumns);

    const dataRow = React.useMemo(
        () => gridData.rows,
        [gridData?.rows?.length, data]
    )

    useEffect(() => {
        filterGlobal?.setGlobalFilter(searchText)
    }, [searchText]);

    useEffect(() => {
        if (getViewModeEx === 1) {
            setRowData({});
        }
    }, [getViewModeEx])

    const AddOrUpdate = (model, addOrUpdateStatus) => {
        addOrUpdateCompanyMutation({
            variables: {
                addOrUpdate: addOrUpdateStatus,
                prmCompany: model
            }
        }).then(res => {
            console.log(res, "res");
            if (res?.data?.addOrUpdateCompany?.resultType === "SUC") {
               MSCMessage(dispatch,'success',"Kaydedildi");
                setRowData({});
                setSelectedData({});
                getViewModeFuncEx(ViewMode.Read)
                dispatch(changeViewMode(ViewMode.Read))
                refetch();
            }else{
                MSCMessage(dispatch,'error',"Hata Oluştu.");
            }
        })
    }


    const UpdateButtonClick = (prmRowData, addOrUpdateStatus) => {
        setAddOrUpdate(addOrUpdateStatus); // kayıt modu belirleme
        setRowData(prmRowData); // isteğe bağlı yönetme şekli
        getViewModeFuncEx(ViewMode.Update);
    };

    if (loading) {
        return <FuseLoading />
    }

    const onDeleteButtonClick = () => {
        setShowDeleteModal(true);
    }

    const onDeleteModalButtonClick = (companyid) => {
        deleteCompanyMutation({
            variables: {
                prmCompanyId: companyid
            }
        })
            .then(res => {
                if (res.data.deleteCompany.resultType === "SUC") {
                   MSCMessage(dispatch, 'success', "Kaydedildi.")
                    refetch();
                    setRowData({});
                    setSelectedData({});
                    getViewModeFuncEx(ViewMode.Read);
                    dispatch(changeViewMode(ViewMode.Read))
                    refetch();
                }else{
                    MSCMessage(dispatch, 'error', "Hata Oluştu.")
                }
            })
    }

    return (

        <AutoForm
            schema={schema}
            model={(addOrUpdate === "ADD") ? rowData : selectedData}
            onChangeModel={(model) => {
                setRowData(model)
                console.log(model, "model");
            }}
            onSubmit={model => {
                AddOrUpdate(model, addOrUpdate);
                console.log(model, "submittedmodel");
            }} >
            <MSCToolbar
                filterSearch={setSearchText}
                onAddButtonClick={() => { setAddOrUpdate(AddOrUpdateEnum.Add) }}
                SubmitComponnent={
                    getViewModeEx === 3 ?
                    <MSCButton title={'Delete'}
                    onClick={() => { onDeleteButtonClick() }}
                  /> : null}
                headerName={t('Companies')}
                updateButtonDisabled={selectedData ? ((Object.keys(selectedData)?.length > 0 ? false : true)) : true}
                onUpdateButtonClick={() => {
                    UpdateButtonClick(selectedData, AddOrUpdateEnum.Update);
                }}
                ReadComponnent={
                    <div style={{ width: '100%' }}>
                        <MSCReactTable
                            selection
                            columns={[
                                { accessor: 'companycode', Header: t('companycode') },
                                { accessor: 'companyname', Header: t('companyname') },
                                { accessor: 'taxno', Header: t('taxno') },
                                { accessor: 'taxoffice', Header: t('taxoffice') },
                                { accessor: 'telno', Header: t('telno') }
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
                CreateOrUpdateComponnent={
                    <div>
                        <Grid container spacing={1}>
                            <Grid item xs={3} sm={3} lg={3} md={3} >
                                <div>Resim Alanı</div>
                            </Grid>
                            <Grid item xs={9} sm={9} lg={9} md={9} >
                                {getViewModeEx === 2 ?
                                    <>
                                        <HiddenField name={'companyid'} value={0} />
                                        <HiddenField name={'currency'} value={""} />
                                        <HiddenField name={'address'} value={""} />
                                        <HiddenField name={'mersisno'} value={""} />
                                        <HiddenField name={'taxno'} value={""} />
                                        <HiddenField name={'taxoffice'} value={""} />
                                        <HiddenField name={'website'} value={""} />
                                        <HiddenField name={'email'} value={""} />
                                        <HiddenField name={'postcode'} value={""} />
                                        <HiddenField name={'chartaccount'} value={""} />
                                        <HiddenField name={'traderegisterno'} value={""} />
                                        <HiddenField name={'telno'} value={""} />
                                        <HiddenField name={'faxno'} value={""} />
                                        <HiddenField name={'signature'} value={""} />
                                    </>
                                    : null}
                                <AutoLabelField name={'companycode'} />
                                <AutoLabelField name={'companyname'} />
                                <AutoLabelField name={'country'} />
                                <AutoLabelField name={'city'} />
                            </Grid>
                        </Grid>
                    </div>
                }
            />
            <ConfirmModal
                handleClose={() => { setShowDeleteModal(false) }}
                showModal={showDeleteModal}
                onYesButtonClick={() => onDeleteModalButtonClick(selectedData?.companyid)}
            />
        </AutoForm>
    );
}

export default Companies; 