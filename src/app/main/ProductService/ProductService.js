import { useTranslation } from 'react-i18next';
import MSCToolbar, { ViewMode } from '../../../@mscComponnent/CRUDPage/MSCToolbar';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { getViewModeFunc } from '../../store/mscToolbar/mscToolbarSlice'
import { GetRowAndColumn, GetUnits, GetItemTypes } from '../../../@mscComponnent/Global/GlobalFunc'
import { AddOrUpdateEnum, useGetUnitsLazyQuery, useGetItemTypesQuery, useGetItemMastersWithFilterTypeLazyQuery } from '../../../generated/graphql';
import { Grid } from '@mui/material';
import { bridge as schema } from './uniforms/ItemMasterSchema';
import { MSCReactTable } from '../../../@mscComponnent/MSCReactTable/MSCReactTable';
import { AutoForm } from 'uniforms';
import FuseLoading from '../../../@fuse/core/FuseLoading';
import AutoLabelField from '../../../@mscComponnent/UniformsComponnents/AutoLabelField';
import SelectColumnFilter from '../../../@mscComponnent/MSCReactTable/SelectColumnFilter';
import MSCLookup from '../../../@mscComponnent/MSCInput/MSCLookup';
import MaterialUiGridComp from '../../../@mscComponnent/MaterialuiGrid/MaterialUiGridComp';
import MSCButton from '../../../@mscComponnent/Buttons/MSCButton'
import MSCFilterInputs from '../../../@mscComponnent/MSCInput/MSCFilterInputs'

function ProductService() {
    const { t } = useTranslation();
    const getViewModeFuncEx = useSelector(getViewModeFunc);
    const [searchText, setSearchText] = useState('');
    const [selectedData, setSelectedData] = useState({});
    const [addOrUpdate, setAddOrUpdate] = useState(AddOrUpdateEnum.Add)
    const [filterGlobal, setFilterGlobal] = useState();
    const [filterParams, setFilterParams] = useState({
        itemCode: { filterType: "", parameter: "" },
        itemName: { filterType: "", parameter: "" },
        itemTypeCode: { filterType: "", parameter: "" }
    })
    const [getUnitsLazyQuery, { data: dataUnits, loading: loadingUnits }] = useGetUnitsLazyQuery();
    const { data: dataItemTypes, loading: loadingItemTypes } = useGetItemTypesQuery();

    useEffect(() => {
        filterGlobal?.setGlobalFilter(searchText)
    }, [searchText])

    const [getItemMastersWithFilter, { data, loading, error }] = useGetItemMastersWithFilterTypeLazyQuery();
    // const [getItemMastersWithFilter, { data, loading, error }] = useGetItemMastersWithFilterLazyQuery();

    const visibleColumns = ['itemcode', 'itemname', 'itemtypecode', 'unitsale']
    let gridData = GetRowAndColumn(data?.itemmastersWithFilterType, visibleColumns);

    const dataRow = React.useMemo(
        () => gridData.rows,
        [gridData?.rows?.length, data]
    )

    const UpdateButtonClick = (prmRowData, addOrUpdateStatus) => {
        setAddOrUpdate(addOrUpdateStatus); // kayıt modu belirleme
        getViewModeFuncEx(ViewMode.Update)
    };

    useEffect(() => {
        if (addOrUpdate === "UPDATE") {
            getUnitsLazyQuery()
        }
    }, [addOrUpdate])

    if (loading) {
        return <FuseLoading />
    }

    const GetItemMastersQuery = () => {
        getItemMastersWithFilter({
            variables: {
                itemCode: { filterType: filterParams.itemCode.filterType, parameter: filterParams.itemCode.parameter },
                itemName: { filterType: filterParams.itemName.filterType, parameter: filterParams.itemName.parameter },
                itemTypeCode: { filterType: filterParams.itemTypeCode.filterType, parameter: filterParams.itemTypeCode.parameter }
            }
        });
        setFilterParams({
            itemCode: { filterType: "", parameter: "" },
            itemName: { filterType: "", parameter: "" },
            itemTypeCode: { filterType: "", parameter: "" }
        })
    }

    return (
        <AutoForm
            schema={schema}
            model={selectedData}
            onChangeModel={(model) => {

            }}
            onSubmit={model => {

            }} >
            <MSCToolbar
                filterSearch={setSearchText}
                headerName={t('ProductService')}
                queryList={GetItemMastersQuery}
                ReadModeHeaderComponnent={<>
                    <MSCButton
                        title={'Search'}
                        onClick={() => { getViewModeFuncEx(ViewMode.Search) }}
                    />
                    <MSCButton
                        title={'View'}
                        disabled={selectedData ? ((Object.keys(selectedData)?.length > 0 ? false : true)) : true}
                        onClick={() => UpdateButtonClick(selectedData, AddOrUpdateEnum.Update)}
                    />
                </>}
                ReadComponnent={
                    <div style={{ width: '100%' }}>
                        <MSCReactTable
                            selection
                            columns={[
                                { accessor: 'itemcode', Header: t('itemcode') },
                                { accessor: 'itemname', Header: t('itemname') },
                                {
                                    accessor: (row) => {
                                        if (row.itemtypecode === "M") {
                                            return t('Ürün')
                                        }
                                        else {
                                            return t('Service')
                                        }
                                    },
                                    Header: t('itemtypecode')
                                },
                                { accessor: 'unitsale', Header: t('unitsale'), Filter: SelectColumnFilter },
                            ]}
                            data={dataRow}
                            SelectRowData={(e) => { setSelectedData(e) }}
                            onRowClicked={e => { console.log('RowCliced', e) }}
                            globalFilterTable={(preGlobalFilteredRows, setGlobalFilter, globalFilter) => {
                                setFilterGlobal({ ...filterGlobal, setGlobalFilter })
                            }}
                        />
                    </div>
                }
                SearchComponent={
                    <MaterialUiGridComp
                        children={[
                            <MSCLookup label={t('itemtype')} options={GetItemTypes(dataItemTypes)} fullWidth onChange={(e) => setFilterParams({ ...filterParams, itemTypeCode:{...filterParams.itemTypeCode, parameter:e.target.value}})}/>,
                            <MSCFilterInputs label={t('itemcode')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, itemCode:{...filterParams.itemCode, parameter:e.target.value}})} 
                            onFilterTypeChange={(e) => setFilterParams({ ...filterParams, itemCode:{...filterParams.itemCode, filterType:e.target.value}})}/>,
                            <MSCFilterInputs label={t('itemname')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, itemName:{...filterParams.itemName, parameter:e.target.value}})} 
                            onFilterTypeChange={(e) => setFilterParams({ ...filterParams, itemName:{...filterParams.itemName, filterType:e.target.value}})}/>
                        ]}
                    />
                }
                CreateOrUpdateComponnent={
                    <div>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                <AutoLabelField name="itemcode" label={t('itemcode')} disabled />
                            </Grid>
                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                <AutoLabelField name="itemname" label={t('itemname')} disabled />
                            </Grid>
                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                <AutoLabelField name="itemtypecode" label={t('itemtypecode')} disabled options={GetItemTypes(dataItemTypes)} />
                            </Grid>
                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                <AutoLabelField name="baseunit" label={t('baseunit')} disabled options={GetUnits(dataUnits)} />
                            </Grid>
                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                <AutoLabelField name="unitsale" label={t('unitsale')} disabled options={GetUnits(dataUnits)} />
                            </Grid>
                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                <AutoLabelField name="istat" label={t('status')} disabled />
                            </Grid>
                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                <AutoLabelField name="purchaseprice" label={t('purchaseprice')} disabled />
                            </Grid>
                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                <AutoLabelField name="salesprice" label={t('salesprice')} disabled />

                            </Grid>
                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                <AutoLabelField name="currency" label={t('currency')} disabled />
                            </Grid>
                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                <AutoLabelField name="vatcode" label={t('vatcode')} disabled />
                            </Grid>
                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                <AutoLabelField name="sctcode" label={t('sctcode')} disabled />
                            </Grid>
                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                <AutoLabelField name="pctcode" label={t('pctcode')} disabled />
                            </Grid>
                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                <AutoLabelField name="stockcontrol" label={t('stockcontrol')} options={[{ label: t('Active'), value: 'A' },
                                { label: t('Inactive'), value: 'I' }]} disabled />
                            </Grid>
                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                <AutoLabelField name="minstockqty" label={t('minstockqty')} disabled />
                            </Grid>
                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                <AutoLabelField name="maxstockqty" label={t('maxstockqty')} disabled />
                            </Grid>
                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                <AutoLabelField name="barcodeno" label={t('barcodeno')} disabled />
                            </Grid>
                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                <AutoLabelField name="categoryid" label={t('categoryid')} disabled />
                            </Grid>
                            <Grid item xs={12} sm={12} lg={6} md={6}>
                                <AutoLabelField name="stockmanagement" label={t('stockmanagement')} disabled />
                            </Grid>
                        </Grid>
                    </div>
                }
            />
        </AutoForm>
    );
}

export default ProductService; 