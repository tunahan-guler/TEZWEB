import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import MSCToolbar, { ViewMode } from '../../../@mscComponnent/CRUDPage/MSCToolbar'
import { AutoForm } from 'uniforms-material';
import AutoLabelField from '../../../@mscComponnent/UniformsComponnents/AutoLabelField';
import SelectLabelField from '../../../@mscComponnent/UniformsComponnents/SelectLabelField';
import { bridge as schema } from './uniforms/ExpensesSchema';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getViewModeFunc, getViewMode, changeViewMode } from '../../store/mscToolbar/mscToolbarSlice'
import FuseLoading from '../../../@fuse/core/FuseLoading'
import { GetRowAndColumn, MSCMessage } from '../../../@mscComponnent/Global/GlobalFunc'
import {
    AddOrUpdateEnum, useAddOrUpdateExpensesMutation, useGetExpenseCategoryQuery, useDeleteExpenseMutation,
    useGetExpensesLazyQuery
} from '../../../generated/graphql';
import { MSCReactTable } from '../../../@mscComponnent/MSCReactTable/MSCReactTable';
import ConfirmModal from '../../../@mscComponnent/Modal/ConfirmModal';
import MaterialUiGridComp from '../../../@mscComponnent/MaterialuiGrid/MaterialUiGridComp';
import MSCButton from '../../../@mscComponnent/Buttons/MSCButton';
import MSCFilterInputs from '../../../@mscComponnent/MSCInput/MSCFilterInputs';
import MSCLookup from '../../../@mscComponnent/MSCInput/MSCLookup';

function Expenses() {
    const { t } = useTranslation();
    const [addOrUpdateExpensesMutation, { data: ExpensesData, loading: ExpensesLoading }] = useAddOrUpdateExpensesMutation();
    const { data: DataExpenseCategory, loading: LoadingExpenseCategory, refetch } = useGetExpenseCategoryQuery({
        variables: {
            expenseCategoryDesc:{filterType:"", parameter:""}
        }
    });
    const getViewModeFuncEx = useSelector(getViewModeFunc);
    const dispatch = useDispatch();
    const [addOrUpdate, setAddOrUpdate] = useState(AddOrUpdateEnum.Add)
    const [rowData, setRowData] = useState({})
    const [deleteExpenseMutation, { data: deleteMutationData }] = useDeleteExpenseMutation();
    const [getExpensesLazyQuery, { data, loading, error, refetch: refetchExpenses }] = useGetExpensesLazyQuery({ fetchPolicy: 'cache-and-network' });
    const [filterParams, setFilterParams] = useState({
        expenseCategoryId: 0,
        expenseCode: { filterType: "", parameter: "" },
        expenseName: { filterType: "", parameter: "" }
    })
    const visibleColumns = ['expensecode', 'expensename', 'expensecategoryid']
    let gridData = GetRowAndColumn(data?.expenses, visibleColumns);
    const getViewModeEx = useSelector(getViewMode); // 18042022
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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

    const AddOrUpdate = (model, addOrUpdateStatus) => {
        addOrUpdateExpensesMutation({
            variables: {
                addOrUpdate: addOrUpdateStatus,
                prmExpense: model
            }
        }).then(res => {
            console.log(res, "res");
            if (res.data.addOrUpdateExpense.resultType === "SUC") {
                MSCMessage(dispatch, 'success', "Kaydedildi.");
                getViewModeFuncEx(ViewMode.Read);
                dispatch(changeViewMode(ViewMode.Read))
                setSelectedData({});
                setRowData({});
                refetchExpenses();
            } else {
                MSCMessage(dispatch, 'error', "Hata Oluştu.")
            }
        })
            .catch(err => console.log(err, "err"))
    }

    const UpdateButtonClick = (prmRowData, addOrUpdateStatus) => {
        setAddOrUpdate(addOrUpdateStatus); // kayıt modu belirleme
        getViewModeFuncEx(ViewMode.Update);
        dispatch(changeViewMode(ViewMode.Update))
        const state = prmRowData;
        delete state.expensecategory;
        setSelectedData(state);
    };

    const onDeleteButtonClick = () => {
        setShowDeleteModal(true);
    }

    const onDeleteModalButtonClick = (expensecode) => {
        deleteExpenseMutation({
            variables: {
                prmExpenseCode: expensecode
            }
        })
            .then(res => {
                if (res.data.deleteExpense.resultType === "SUC") {
                    MSCMessage(dispatch, 'success', "Kaydedildi.")
                    refetchExpenses();
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

    if (loading) {
        return <FuseLoading />
    }

    const GetExpenses = () => {
        getExpensesLazyQuery({
            variables: {
                expenseCategoryId: filterParams.expenseCategoryId,
                expenseCode: { filterType: "contains", parameter: filterParams.expenseCode.parameter },
                expenseName: { filterType: filterParams.expenseName.filterType, parameter: filterParams.expenseName.parameter }
            }
        })
        setFilterParams({
            expenseCategoryId: 0,
            expenseCode: { filterType: "", parameter: "" },
            expenseName: { filterType: "", parameter: "" }
        })
    }

    return (

        <AutoForm
            schema={schema}
            model={(getViewModeEx === 2) ? rowData : selectedData}
            onSubmit={model => {
                setRowData(model);
                console.log(model, "submiited");
                AddOrUpdate(model, addOrUpdate);

            }} >
            <MSCToolbar
                filterSearch={setSearchText}
                onUpdateButtonClick={() => UpdateButtonClick(selectedData, AddOrUpdateEnum.Update)}
                updateButtonDisabled={selectedData ? ((Object.keys(selectedData)?.length > 0 ? false : true)) : true}
                headerName={t('Expenses')}
                onAddButtonClick={() => setAddOrUpdate(AddOrUpdateEnum.Add)}
                queryList={GetExpenses}
                SubmitComponnent={
                    addOrUpdate === "UPDATE" ?
                        <MSCButton title={'Delete'}
                            onClick={() => { onDeleteButtonClick() }}
                        /> : null}
                ReadComponnent={
                    <div style={{ width: '100%' }}>
                        <MSCReactTable
                            selection
                            columns={[
                                { accessor: 'expensecode', Header: t('expensecode') },
                                { accessor: 'expensename', Header: t('expensename') },
                                { accessor: (row) => { return row?.expensecategory?.expensecategorydesc }, Header: t('expensecategoryid') },

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
                            <MSCFilterInputs label={t('expensecode')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, expenseCode:{...filterParams.expenseCode, parameter:e.target.value}})} 
                            onFilterTypeChange={(e) => setFilterParams({ ...filterParams, expenseCode:{...filterParams.expenseCode, filterType:e.target.value}})}/>,
                            <MSCFilterInputs label={t('expensename')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, expenseName:{...filterParams.expenseName, parameter:e.target.value}})} 
                            onFilterTypeChange={(e) => setFilterParams({ ...filterParams, expenseName:{...filterParams.expenseName, filterType:e.target.value}})}/>,
                            <MSCLookup label={t('expensecategoryid')} options={DataExpenseCategory?.expensecategory.map(val => {
                                return {label:val?.expensecategorydesc, value:val?.expensecategoryid}
                            })} fullWidth onChange={(e) => setFilterParams({...filterParams, expenseCategoryId:e.target.value})}/>,
                        ]}
                    />
                }
                CreateOrUpdateComponnent={
                    <div>

                        <AutoLabelField name="expensecode" disabled={addOrUpdate === "ADD" ? false : true} />
                        <AutoLabelField name="expensename" />
                        <SelectLabelField name={'expensecategoryid'} label={t('expensecategoryid')} options={
                            DataExpenseCategory?.expensecategory ? DataExpenseCategory.expensecategory.map(item => ({ label: item?.expensecategorydesc, value: item?.expensecategoryid })) : []
                        } />
                    </div>
                }
            />
            <ConfirmModal
                handleClose={() => { setShowDeleteModal(false) }}
                showModal={showDeleteModal}
                onYesButtonClick={() => onDeleteModalButtonClick(selectedData.expensecode)}
            />
        </AutoForm>
    );
}

export default Expenses; 