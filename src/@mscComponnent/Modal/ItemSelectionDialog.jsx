import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { connectField } from 'uniforms';
import { useGetItemMastersWithFilterLazyQuery, useGetItemTypesQuery } from '../../generated/graphql';
import { GetItemTypes, GetRowAndColumn } from '../Global/GlobalFunc';
import MaterialUiGridComp from '../MaterialuiGrid/MaterialUiGridComp';
import MSCLookup from '../MSCInput/MSCLookup';
import MSCTextField from '../MSCInput/MSCTextField';
import { MSCReactTable } from '../MSCReactTable/MSCReactTable';
import MSCDialogWithDrawer from './MSCDialogWithDrawer'

const ItemSelectionDialog = (props) => {
    const { t } = useTranslation();
    const visibleColumns = ['itemcode', 'itemname', 'unitsale', 'baseunit'];
    const { data: dataItemTypes, loading: loadingItemTypes } = useGetItemTypesQuery();
    const [getItemMasters, { data, loading, error }] = useGetItemMastersWithFilterLazyQuery();
    const [filterParams, setFilterParams] = useState({
        itemcode: "",
        itemname: "",
        itemtypecode: ""
    })
    let gridData = GetRowAndColumn(data?.itemmastersWithFilter, visibleColumns);

    const GetItemMaster = () => {
        getItemMasters({
            variables: {
                prmItemCode: filterParams.itemcode,
                prmItemName: filterParams.itemname,
                prmItemTypeCode: filterParams.itemtypecode
            }
        })
        setFilterParams({
            itemcode: "",
            itemname: "",
            itemtypecode: ""
        })
    }

    return (
        <MSCDialogWithDrawer
            openDialog={props.showModal}
            handleCloseDialog={props.handleClose}
            dialogChildren={
                <MSCReactTable
                    selection
                    columns={gridData?.columns}
                    data={gridData?.rows}
                    SelectRowData={props.SelectRowData}
                />}
            drawerChildren={<MaterialUiGridComp
                children={[
                    <MaterialUiGridComp
                        children={[
                            <MSCLookup options={GetItemTypes(dataItemTypes)} label={t('itemtype')}
                                onChange={(e) => setFilterParams({ ...filterParams, itemtypecode: e.target.value })} />,
                            <MSCTextField label={t('itemcode')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, itemcode: e.target.value })} />,
                            <MSCTextField label={t('itemname')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, itemname: e.target.value })} />
                        ]}
                    />
                ]}
            />}
            onFilterButtonClick={GetItemMaster}
            loading={loading}
        />
    )
}

export default connectField(ItemSelectionDialog)