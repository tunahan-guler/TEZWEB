import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import MSCToolbar, { ViewMode } from '../../../@mscComponnent/CRUDPage/MSCToolbar'
import {
    AutoForm,
} from 'uniforms-material';
import AutoLabelField from '../../../@mscComponnent/UniformsComponnents/AutoLabelField';
import { bridge as schema } from './uniforms/ExpenseCategory-js-Schema';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getViewModeFunc, getViewMode, changeViewMode } from '../../store/mscToolbar/mscToolbarSlice'
import { GetRowAndColumn, MSCMessage } from '../../../@mscComponnent/Global/GlobalFunc'
import { AddOrUpdateEnum, useAddOrUpdateExpenseCategoryMutation, useDeleteExpenseCategoryMutation, useGetExpenseCategoryLazyQuery, useGetExpenseCategoryQuery } from '../../../generated/graphql';
import { MSCReactTable } from '../../../@mscComponnent/MSCReactTable/MSCReactTable';
import FuseLoading from '../../../@fuse/core/FuseLoading'
import ConfirmModal from '../../../@mscComponnent/Modal/ConfirmModal';
import MaterialUiGridComp from '../../../@mscComponnent/MaterialuiGrid/MaterialUiGridComp';
import MSCTextField from '../../../@mscComponnent/MSCInput/MSCTextField'
import MSCButton from '../../../@mscComponnent/Buttons/MSCButton';
import MSCFilterInputs from '../../../@mscComponnent/MSCInput/MSCFilterInputs';

function ExpensesCategory() {
    const [getExpenseCategoryLazyQuery, { data, loading, error, refetch }] = useGetExpenseCategoryLazyQuery({ fetchPolicy: 'cache-and-network' });
    const visibleColumns = ['expensecategoryid', 'expensecategorydesc']
    let gridData = GetRowAndColumn(data?.expensecategory, visibleColumns);
    const [deleteExpenseCategoryMutation, { data: deleteMutationData }] = useDeleteExpenseCategoryMutation();
    const [rowData, setRowData] = useState({});
    const getViewModeEx = useSelector(getViewMode); // 18042022 
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [expenseCategoryDesc, setExpenseCategoryDesc] = useState({
        filterType:"", parameter:""
    });

    const dataRow = React.useMemo(
        () => gridData.rows,
        [gridData?.rows?.length, data]
    )
    const [searchText, setSearchText] = useState('')
    const [filterGlobal, setFilterGlobal] = useState()
    useEffect(() => {
        filterGlobal?.setGlobalFilter(searchText)
    }, [searchText])

    const [selectedData, setSelectedData] = useState({});
    const { t } = useTranslation();
    const getViewModeFuncEx = useSelector(getViewModeFunc);
    const dispatch = useDispatch();
    const [addOrUpdateExpenseCategoryMutation, { data: ExpenseCategoryData, loading: ExpenseCategoryLoading }] = useAddOrUpdateExpenseCategoryMutation();
    const [addOrUpdate, setAddOrUpdate] = useState(AddOrUpdateEnum.Add)

    const AddOrUpdate = (model, addOrUpdateStatus) => {
        addOrUpdateExpenseCategoryMutation({
            variables: {
                addOrUpdate: addOrUpdateStatus,
                prmExpenseCategory: model
            }
        }).then(res => {
            if (res.data.addOrUpdateExpenseCategory.resultType === "SUC") {
                MSCMessage(dispatch, 'success', "Kaydedildi.")
                getViewModeFuncEx(ViewMode.Read);
                dispatch(changeViewMode(ViewMode.Read))
                setSelectedData({});
                setRowData({});
                refetch();
            } else {
                MSCMessage(dispatch, 'error', "Hata Oluştu.");
            }
        })
            .catch(err => console.log(err, "err"))
    }

    if (loading) {
        return <FuseLoading />
    }

    const UpdateButtonClick = (prmRowData, addOrUpdateStatus) => {
        setAddOrUpdate(addOrUpdateStatus); // kayıt modu belirleme
        getViewModeFuncEx(ViewMode.Update)
        dispatch(changeViewMode(ViewMode.Update))
    };

    const onDeleteButtonClick = () => {
        setShowDeleteModal(true);
    }

    const onDeleteModalButtonClick = (expensecategoryid) => {
        deleteExpenseCategoryMutation({
            variables: {
                prmExpenseCategoryId: expensecategoryid
            }
        })
            .then(res => {
                console.log(res, "es");
                if (res.data.deleteExpenseCategory.resultType === "SUC") {
                    MSCMessage(dispatch, 'success', "Kaydedildi.");
                    refetch();
                    setRowData({});
                    setSelectedData({});
                    getViewModeFuncEx(ViewMode.Read);
                    dispatch(changeViewMode(ViewMode.Read))
                } else {
                    MSCMessage(dispatch, 'error', "Hata Oluştu.");
                }
            })
            .catch(err => console.log(err, "err"))
    }

    const GetExpenseCategoryDesc = () => {
        console.log({
            variables: {
                expenseCategoryDesc:{filterType:expenseCategoryDesc.filterType, parameter:expenseCategoryDesc.parameter}
            }
        })
        getExpenseCategoryLazyQuery({
            variables: {
                expenseCategoryDesc:{filterType:expenseCategoryDesc.filterType, parameter:expenseCategoryDesc.parameter}
            }
        })
        setExpenseCategoryDesc({
            filterType:"",
            parameter:""
        });
    }

    return (

        <AutoForm
            schema={schema}
            model={(getViewModeEx === 2) ? rowData : selectedData}
            onChangeModel={(model) => {
                setRowData(model);
            }}
            onSubmit={model => {
                AddOrUpdate(model, addOrUpdate);

            }} >
            <MSCToolbar
                onAddButtonClick={() => setAddOrUpdate(AddOrUpdateEnum.Add)}
                filterSearch={setSearchText}
                queryList={GetExpenseCategoryDesc}
                SubmitComponnent={
                    getViewModeEx === 3 ?
                        <MSCButton title={'Delete'}
                            onClick={() => { onDeleteButtonClick() }}
                        /> : null}
                onUpdateButtonClick={() => UpdateButtonClick(selectedData, AddOrUpdateEnum.Update)}
                updateButtonDisabled={selectedData ? ((Object.keys(selectedData)?.length > 0 ? false : true)) : true}
                headerName={t('ExpensesCategory')}
                ReadComponnent={
                    <div style={{ width: '100%' }}>
                        <MSCReactTable
                            selection
                            columns={[
                                { accessor: 'expensecategorydesc', Header: t('expensecategorydesc') },

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
                            <MSCFilterInputs label={t('expensecategorydesc')} fullWidth onChange={(e) => setExpenseCategoryDesc({...expenseCategoryDesc, parameter:e.target.value})} 
                            onFilterTypeChange={(e) => setExpenseCategoryDesc({...expenseCategoryDesc, filterType:e.target.value})}/>,
                        ]}
                    />
                }
                CreateOrUpdateComponnent={
                    <div>
                        <AutoLabelField name="expensecategorydesc" />
                    </div>
                }
            />
            <ConfirmModal
                handleClose={() => { setShowDeleteModal(false) }}
                showModal={showDeleteModal}
                onYesButtonClick={() => onDeleteModalButtonClick(selectedData?.expensecategoryid)}
            />
        </AutoForm>
    );
}

export default ExpensesCategory; 