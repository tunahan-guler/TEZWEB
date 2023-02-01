import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { connectField } from 'uniforms';
import { useGetStakeholdersForAccountStatementLazyQuery } from '../../generated/graphql';
import { GetRowAndColumn } from '../Global/GlobalFunc';
import MaterialUiGridComp from '../MaterialuiGrid/MaterialUiGridComp';
import MSCTextField from '../MSCInput/MSCTextField';
import { MSCReactTable } from '../MSCReactTable/MSCReactTable';
import MSCDialogWithDrawer from './MSCDialogWithDrawer'

const StakeholderSelectionDialog = (props) => {
    const { t } = useTranslation();
    const visibleColumns = ['stakeholdercode', 'stakeholdername', 'taxno'];
    const [getStakeholders, { data, loading, error }] = useGetStakeholdersForAccountStatementLazyQuery();
    const [filterParams, setFilterParams] = useState({
        stakeholderCode: { filterType: "", parameter: "" },
        stakeholderName: { filterType: "", parameter: "" },
        stakeholderType: ""
    })
    let gridData = GetRowAndColumn(data?.stakeholdersForAccountStatement, visibleColumns);

    const GetStakeholders = () => {
        getStakeholders({
            variables: {
                stakeholderCode: { filterType: filterParams.stakeholderCode.filterType, parameter: filterParams.stakeholderCode.parameter },
                stakeholderName: { filterType: filterParams.stakeholderName.filterType, parameter: filterParams.stakeholderName.parameter },
                stakeholderType: props.stakeholdertype
            }
        })
        setFilterParams({
            stakeholderCode: { filterType: "", parameter: "" },
            stakeholderName: { filterType: "", parameter: "" },
            stakeholderType: ""
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
                    SelectRowData={(rowData) => {
                        if (rowData) {
                            props.onChange({ ...props.value, ...rowData })
                            props.handleClose();
                        }
                    }}
                />
                // : <div style={{ position: 'absolute', top: '50%', left: '50%' }}>{t('NODATA')}</div>
            }
            drawerChildren={<MaterialUiGridComp
                children={[
                    <MSCTextField label={props.stakeholdertype === "C" ? t('stakeholdercode') : t('suppliercode')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, stakeholdercode: e.target.value })} />,
                    <MSCTextField label={props.stakeholdertype === "C" ? t('stakeholdername') : t('suppliername')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, stakeholdername: e.target.value })} />,
                ]}
            />}
            onFilterButtonClick={GetStakeholders}
            loading={loading}
        />
    )
}

export default connectField(StakeholderSelectionDialog)