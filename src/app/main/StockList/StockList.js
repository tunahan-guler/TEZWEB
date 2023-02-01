import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import MSCToolbar, { ViewMode } from '../../../@mscComponnent/CRUDPage/MSCToolbar'
import { useState } from 'react';
import { useSelector, } from 'react-redux'
import { getViewModeFunc } from '../../store/mscToolbar/mscToolbarSlice'
import { GetRowAndColumn } from '../../../@mscComponnent/Global/GlobalFunc'
import { AddOrUpdateEnum, useGetStocksLazyQuery, useGetStocksQuery } from '../../../generated/graphql';
import { MSCReactTable } from '../../../@mscComponnent/MSCReactTable/MSCReactTable';
import { Button } from '@mui/material';
import MaterialUiGridComp from '../../../@mscComponnent/MaterialuiGrid/MaterialUiGridComp';
import MSCTextField from '../../../@mscComponnent/MSCInput/MSCTextField';
import FuseLoading from '../../../@fuse/core/FuseLoading';
import MSCButton from '../../../@mscComponnent/Buttons/MSCButton';
import MSCFilterInputs from '../../../@mscComponnent/MSCInput/MSCFilterInputs';

function StockList() {
    const [selectedData, setSelectedData] = useState({});
    const { t } = useTranslation();
    const getViewModeFuncEx = useSelector(getViewModeFunc);
    const [searchText, setSearchText] = useState('')
    const [filterGlobal, setFilterGlobal] = useState()
    const visibleColumns = ['itemcode', 'itemname', 'serialno', 'batchno', 'variantid', 'physicalqty', 'unitsale']
    const [getStocksLazyQuery, { data, loading, error }] = useGetStocksLazyQuery();
    const [filterParams, setFilterParams] = useState({
        itemCode: { filterType: '', parameter: "" },
        itemName: { filterType: '', parameter: '' },
        serialNo: { filterType: '', parameter: '' }
    })

    let gridData = GetRowAndColumn(data?.stocks, visibleColumns);

    const dataRow = React.useMemo(
        () => gridData.rows,
        [gridData?.rows?.length, data]
    )

    useEffect(() => {
        filterGlobal?.setGlobalFilter(searchText)
    }, [searchText])

    const GetStocks = () => {
        getStocksLazyQuery({
            variables: {
                itemCode: { filterType: filterParams.itemCode.filterType, parameter: filterParams.itemCode.parameter },
                itemName: { filterType: filterParams.itemName.filterType, parameter: filterParams.itemName.parameter },
                serialNo: { filterType: filterParams.serialNo.filterType, parameter: filterParams.serialNo.parameter }
            }
        })
        setFilterParams({
            itemCode: { filterType: '', parameter: "" },
            itemName: { filterType: '', parameter: '' },
            serialNo: { filterType: '', parameter: '' }
        })
    }

    if (loading) {
        return <FuseLoading />
    }

    return (
        <MSCToolbar
            filterSearch={setSearchText}
            model={selectedData ? selectedData : {}}
            headerName={t('StockList')}
            queryList={GetStocks}
            ReadModeHeaderComponnent={<MSCButton title={'Search'} onClick={() => {
                getViewModeFuncEx(ViewMode.Search)
                dispatch(changeViewMode(ViewMode.Search))
            }} />}
            ReadComponnent={
                <div style={{ width: '100%' }}>
                    <MSCReactTable
                        columns={[
                            { accessor: 'itemcode', Header: t('itemcode') },
                            { accessor: (row) => { return row?.itemcodeNavigation?.itemname }, Header: t('itemname') },
                            { accessor: 'serialno', Header: t('serialno') },
                            { accessor: 'variantid', Header: t('variantid') },
                            { accessor: 'physicalqty', Header: t('physicalqty') },
                            { accessor: (row) => { return row?.itemcodeNavigation?.baseunit }, Header: t('baseunit') },
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
                        <MSCFilterInputs label={t('itemname')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, itemCode: { ...filterParams.itemCode, parameter: e.target.value } })}
                            onFilterTypeChange={(e) => setFilterParams({ ...filterParams, itemCode: { ...filterParams.itemCode, filterType: e.target.value } })} />,
                        <MSCFilterInputs label={t('itemname')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, itemName: { ...filterParams.itemName, parameter: e.target.value } })}
                            onFilterTypeChange={(e) => setFilterParams({ ...filterParams, itemName: { ...filterParams.itemName, filterType: e.target.value } })} />,
                        <MSCFilterInputs label={t('serialno')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, serialNo: { ...filterParams.serialNo, parameter: e.target.value } })}
                            onFilterTypeChange={(e) => setFilterParams({ ...filterParams, serialNo: { ...filterParams.serialNo, filterType: e.target.value } })} />
                    ]}
                />
            }
        />
    );
}

export default StockList; 