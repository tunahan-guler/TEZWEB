import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import MSCToolbar, { ViewMode } from '../../../@mscComponnent/CRUDPage/MSCToolbar'
import { AutoForm } from 'uniforms-material';
import { bridge as schema } from './uniforms/StockTransactionsSchema';
import { useState } from 'react';
import { GetRowAndColumn, GetTransType } from '../../../@mscComponnent/Global/GlobalFunc'
import { useGetCtTransCodesQuery, useGetTranshistsLazyQuery } from '../../../generated/graphql';
import { MSCReactTable } from '../../../@mscComponnent/MSCReactTable/MSCReactTable';
import FuseLoading from '../../../@fuse/core/FuseLoading'
import { Button } from '@material-ui/core';
import MaterialUiGridComp from '../../../@mscComponnent/MaterialuiGrid/MaterialUiGridComp';
import MSCTextField from '../../../@mscComponnent/MSCInput/MSCTextField';
import MSCLookup from '../../../@mscComponnent/MSCInput/MSCLookup';
import { useDispatch, useSelector } from 'react-redux';
import { changeViewMode, getViewModeFunc } from '../../store/mscToolbar/mscToolbarSlice';
import MSCButton from '../../../@mscComponnent/Buttons/MSCButton';
import MSCFilterInputs from '../../../@mscComponnent/MSCInput/MSCFilterInputs';

function StockTransactions() {
    const [getTranshistsLazyQuery, { data, loading, error, refetch }] = useGetTranshistsLazyQuery();
    const { data: dataTransCode, loading: loadingTransCode } = useGetCtTransCodesQuery();
    const [searchText, setSearchText] = useState('');
    const getViewModeFuncEx = useSelector(getViewModeFunc);
    const [filterGlobal, setFilterGlobal] = useState();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    let gridData = GetRowAndColumn(data?.transhists, []);
    const [filterParams, setFilterParams] = useState({
        batchNo:{filterType:"", parameter:""},
        itemCode:{filterType:"", parameter:""},
        matDocNo:{filterType:"", parameter:""},
        serialNo:{filterType:"", parameter:""},
        stakeholderName:{filterType:"", parameter:""},
        transCode:""
    })
    const dataRow = React.useMemo(
        () => gridData.rows,
        [gridData?.rows?.length, data]
    )

    useEffect(() => {
        filterGlobal?.setGlobalFilter(searchText)
    }, [searchText])

    if (loading || loadingTransCode) {
        return <FuseLoading />
    }

    const GetTranshists = () => {
        console.log({
            variables: {
                batchNo:{filterType:filterParams.batchNo.filterType, parameter:filterParams.batchNo.parameter},
                itemCode:{filterType:filterParams.itemCode.filterType, parameter:filterParams.itemCode.parameter},
                matDocNo:{filterType:filterParams.matDocNo.filterType, parameter:filterParams.matDocNo.parameter},
                serialNo:{filterType:filterParams.serialNo.filterType, parameter:filterParams.serialNo.parameter},
                stakeholderName:{filterType:filterParams.stakeholderName.filterType, parameter:filterParams.stakeholderName.parameter},
                transCode:filterParams.transCode
            }
        })
        getTranshistsLazyQuery({
            variables: {
                batchNo:{filterType:filterParams.batchNo.filterType, parameter:filterParams.batchNo.parameter},
                itemCode:{filterType:filterParams.itemCode.filterType, parameter:filterParams.itemCode.parameter},
                matDocNo:{filterType:filterParams.matDocNo.filterType, parameter:filterParams.matDocNo.parameter},
                serialNo:{filterType:filterParams.serialNo.filterType, parameter:filterParams.serialNo.parameter},
                stakeholderName:{filterType:filterParams.stakeholderName.filterType, parameter:filterParams.stakeholderName.parameter},
                transCode:filterParams.transCode
            }
        })
        setFilterParams({
            batchNo:{filterType:"", parameter:""},
            itemCode:{filterType:"", parameter:""},
            matDocNo:{filterType:"", parameter:""},
            serialNo:{filterType:"", parameter:""},
            stakeholderName:{filterType:"", parameter:""},
            transCode:""
        })
    }

    return (

        <AutoForm schema={schema}>
            <MSCToolbar
                headerName={t('StockTransactions')}
                filterSearch={setSearchText}
                queryList={GetTranshists}
                ReadModeHeaderComponnent={
                    <MSCButton title={'Search'} onClick={() => {
                        getViewModeFuncEx(ViewMode.Search)
                        dispatch(changeViewMode(ViewMode.Search))
                    }} />
                }
                ReadComponnent={
                    <div style={{ width: '100%' }}>
                        <MSCReactTable
                            columns={[
                                { accessor: 'matdocno', Header: t('matdocno') },
                                { accessor: (row) => { return row?.ctTransCode?.transDesc }, Header: t('transaction') },
                                {
                                    accessor: (row) => {
                                        if (row?.stakeholder?.stakeholdername) {
                                            return row?.stakeholder?.stakeholdername
                                        }
                                        else {
                                            return row?.stakeholderid
                                        }
                                    }, Header: t('stakeholdername')
                                },
                                { accessor: 'itemcode', Header: t('itemcode') },
                                { accessor: 'serialno', Header: t('serialno') },
                                { accessor: 'batchno', Header: t('batchno') },
                                { accessor: 'transqty', Header: t('quantity') },
                            ]}
                            data={dataRow}
                            globalFilterTable={(preGlobalFilteredRows, setGlobalFilter, globalFilter) => {
                                setFilterGlobal({ ...filterGlobal, setGlobalFilter })
                            }}
                        />
                    </div>
                }
                SearchComponent={
                    <MaterialUiGridComp
                        children={[
                            <MSCFilterInputs label={t('matdocno')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, matDocNo:{...filterParams.matDocNo, parameter:e.target.value}})} 
                            onFilterTypeChange={(e) => setFilterParams({ ...filterParams, matDocNo:{...filterParams.matDocNo, filterType:e.target.value}})}/>,
                            <MSCLookup options={GetTransType(dataTransCode)} label={t('transaction')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, transCode: e.target.value })} />,
                            <MSCFilterInputs label={t('itemcode')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, itemCode:{...filterParams.itemCode, parameter:e.target.value}})} 
                            onFilterTypeChange={(e) => setFilterParams({ ...filterParams, itemCode:{...filterParams.itemCode, filterType:e.target.value}})}/>,
                            <MSCFilterInputs label={t('stakeholdername')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, stakeholderName:{...filterParams.stakeholderName, parameter:e.target.value}})} 
                            onFilterTypeChange={(e) => setFilterParams({ ...filterParams, stakeholderName:{...filterParams.stakeholderName, filterType:e.target.value}})}/>,
                            <MSCFilterInputs label={t('serialno')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, serialNo:{...filterParams.serialNo, parameter:e.target.value}})} 
                            onFilterTypeChange={(e) => setFilterParams({ ...filterParams, serialNo:{...filterParams.serialNo, filterType:e.target.value}})}/>,
                            <MSCFilterInputs label={t('batchno')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, batchNo:{...filterParams.batchNo, parameter:e.target.value}})} 
                            onFilterTypeChange={(e) => setFilterParams({ ...filterParams, batchNo:{...filterParams.batchNo, filterType:e.target.value}})}/>
                        ]}
                    />
                }
            />
        </AutoForm>
    );
}

export default StockTransactions; 