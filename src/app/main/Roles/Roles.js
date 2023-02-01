import { useTranslation } from 'react-i18next';
import MSCToolbar, { ViewMode } from '../../../@mscComponnent/CRUDPage/MSCToolbar'
import { AutoForm, ErrorField, HiddenField, } from 'uniforms-material';
import { bridge as schema } from './uniforms/RolesSchema';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getViewModeFunc } from '../../store/mscToolbar/mscToolbarSlice'
import { showMessage } from '../../store/fuse/messageSlice'
import { GetCurrencies, GetRowAndColumn } from '../../../@mscComponnent/Global/GlobalFunc'
import { AddOrUpdateEnum, useAddOrUpdateCompanyMutation, useGetModuleListQuery, useGetRoleQuery } from '../../../generated/graphql';
import { MSCReactTable } from '../../../@mscComponnent/MSCReactTable/MSCReactTable';
import FuseLoading from '../../../@fuse/core/FuseLoading';
import moment from 'moment';
import AutoLabelField from '../../../@mscComponnent/UniformsComponnents/AutoLabelField';

function Roles() {
    const { t } = useTranslation();
    const getViewModeFuncEx = useSelector(getViewModeFunc);
    const dispatch = useDispatch();
    const [addOrUpdate, setAddOrUpdate] = useState(AddOrUpdateEnum.Add)
    const [rowData, setRowData] = useState({})
    const user = useSelector(({ auth }) => auth.user);
    const { data, loading, error, refetch } = useGetRoleQuery({
        variables: {
            prmSubscriptionId: user.data.subscriptionId
        }
    });
    const [selectedData, setSelectedData] = useState({});
    const [searchText, setSearchText] = useState('')
    const [filterGlobal, setFilterGlobal] = useState();
    const [addOrUpdateCompanyMutation, { data: dataMutation }] = useAddOrUpdateCompanyMutation();
    const visibleColumns = ['roleCode', 'authObject', 'createtime']
    let gridData = GetRowAndColumn(data?.role, visibleColumns);
    const { data: dataModuleList } = useGetModuleListQuery();

    const dataRow = React.useMemo(
        () => gridData.rows,
        [gridData?.rows?.length, data]
    )

    useEffect(() => {
        filterGlobal?.setGlobalFilter(searchText)
    }, [searchText]);

    const AddOrUpdate = (model, addOrUpdateStatus) => {
        addOrUpdateCompanyMutation({
            variables: {
                addOrUpdate: addOrUpdateStatus,
                prmCompany: model
            }
        }).then(res => {
            console.log(res, "res");
            if (res?.data?.addOrUpdateCompany?.resultType === "SUC") {
                dispatch(
                    showMessage({
                        message: 'Kaydedildi?',//text or html
                        autoHideDuration: 6000,//ms
                        anchorOrigin: {
                            vertical: 'top',//top bottom
                            horizontal: 'right'//left center right
                        },
                        variant: 'success'//success error info warning null
                    }))
                setRowData({});
                setSelectedData({});
                getViewModeFuncEx(ViewMode.Read)
                refetch();
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
                headerName={t('Roles')}
                updateButtonDisabled={selectedData ? ((Object.keys(selectedData)?.length > 0 ? false : true)) : true}
                onUpdateButtonClick={() => {
                    UpdateButtonClick(selectedData, AddOrUpdateEnum.Update);
                }}
                ReadComponnent={
                    <div style={{ width: '100%' }}>
                        <MSCReactTable
                            selection
                            columns={[
                                { accessor: 'roleCode', Header: t('rolecode') },
                                { accessor: 'authObject', Header: t('rolename') },
                                {
                                    accessor: (row) => { return moment(row.createtime).format('DD-MM-YYYY') },
                                    Header: t('createtime')
                                },
                                { accessor: 'createuser', Header: t('createuser') },
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
                        <AutoLabelField name={'roleCode'} label={t('rolecode')} />
                        <AutoLabelField name={'authObject'} label={t('rolename')} />
                    </div>
                }
            />
        </AutoForm>
    );
}

export default Roles; 