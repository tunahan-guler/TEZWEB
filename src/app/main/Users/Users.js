import { useTranslation } from 'react-i18next';
import MSCToolbar, { ViewMode } from '../../../@mscComponnent/CRUDPage/MSCToolbar'
import { AutoForm, ErrorField, HiddenField, } from 'uniforms-material';
import { bridge as schema } from './uniforms/UsersSchema';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getViewMode, getViewModeFunc, changeViewMode } from '../../store/mscToolbar/mscToolbarSlice'
import { showMessage } from '../../store/fuse/messageSlice'
import { GetRowAndColumn, MSCMessage } from '../../../@mscComponnent/Global/GlobalFunc'
import {
  AddOrUpdateEnum, useGetSubscriptionUsersQuery, useAddOrUpdateSubscriptionUsersMutation,
  useDeleteSubscriptionUsersMutation
} from '../../../generated/graphql';
import { MSCReactTable } from '../../../@mscComponnent/MSCReactTable/MSCReactTable';
import AutoLabelField from '../../../@mscComponnent/UniformsComponnents/AutoLabelField';
import FuseLoading from '../../../@fuse/core/FuseLoading';
import MSCTextField from '../../../@mscComponnent/MSCInput/MSCTextField'
import MSCTableField from '../../../@mscComponnent/UniformsComponnents/MSCTableField';
import GetUserRoles from './SubComponents/GetUserRoles';
import moment from 'moment'
import { Grid } from '@material-ui/core';
import { Button, Icon, IconButton, InputAdornment } from '@mui/material';
import ConfirmModal from '../../../@mscComponnent/Modal/ConfirmModal';
import MSCButton from '../../../@mscComponnent/Buttons/MSCButton';

const dates = {
  createTime: moment(),
  createUser: moment(),
  validTo: moment(),
  validFrom: moment(),
}

function Users() {
  const user = useSelector(({ auth }) => auth.user)
  const { t } = useTranslation();
  const getViewModeEx = useSelector(getViewMode); // 18042022 
  const getViewModeFuncEx = useSelector(getViewModeFunc);
  const dispatch = useDispatch();
  const [addOrUpdate, setAddOrUpdate] = useState(AddOrUpdateEnum.Add)
  const [rowData, setRowData] = useState({})
  const { data, loading, error, refetch } = useGetSubscriptionUsersQuery({
    variables: { prmSubsId: user.data.subscriptionId }
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [searchText, setSearchText] = useState('')
  const [deleteSubscriptionUsersMutation, { data: deleteMutationData }] = useDeleteSubscriptionUsersMutation();
  const [filterGlobal, setFilterGlobal] = useState();
  const [addOrUpdateSubscriptionUsersMutation, { data: dataMutation }] = useAddOrUpdateSubscriptionUsersMutation();
  const visibleColumns = ['tillcode', 'tillname', 'currency']
  const [upassR, setUpassR] = useState('');
  let gridData = GetRowAndColumn(data?.subscriptionUsers, visibleColumns);
  const [showPassword, setShowPassword] = useState(false);

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
    filterGlobal?.setGlobalFilter(searchText)
  }, [searchText]);

  const AddOrUpdate = (model, addOrUpdateStatus) => {
    if (model?.upass === upassR) {
      addOrUpdateSubscriptionUsersMutation({
        variables: {
          addOrUpdate: addOrUpdateStatus,
          prmSubscriptionUser: model
        }
      }).then(res => {
        console.log(res, "res");
        if (res?.data?.addOrUpdateSubscriptionUser?.resultType === "SUC") {
          MSCMessage(dispatch, 'success', "Kaydedildi.")
          setRowData({});
          setSelectedData({});
          getViewModeFuncEx(ViewMode.Read)
          dispatch(changeViewMode(ViewMode.Read))
          refetch();
        } else {
          MSCMessage(dispatch, 'error', "Hata Oluştu.")
        }
      })
    }
    else {
      dispatch(
        showMessage({
          message: 'Şifreler uyuşmamaktadır.',//text or html
          autoHideDuration: 6000,//ms
          anchorOrigin: {
            vertical: 'top',//top bottom
            horizontal: 'right'//left center right
          },
          variant: 'warning'//success error info warning null
        }))
    }
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

  const onDeleteModalButtonClick = (email, subscriptionid) => {
    deleteSubscriptionUsersMutation({
      variables: {
        prmEmail: email,
        prmSubscriptionId: subscriptionid
      }
    })
      .then(res => {
        console.log(res, "res");
        if (res.data.deleteSubscriptionUsers.resultType === "SUC") {
          dispatch(
            showMessage({
              message: 'Kaydedildi',//text or html
              autoHideDuration: 6000,//ms
              anchorOrigin: {
                vertical: 'top',//top bottom
                horizontal: 'right'//left center right
              },
              variant: 'success'//success error info warning null
            }));
          setUpassR('');
          setRowData({});
          setSelectedData({});
          getViewModeFuncEx(ViewMode.Read);
          dispatch(changeViewMode(ViewMode.Read))
          refetch();
        }
      })
  }

  return (

    <AutoForm
      schema={schema}
      model={(getViewModeEx === 2) ? { ...rowData, ...dates } : selectedData}
      onChangeModel={(model) => {
        setRowData(model)
        console.log(model, "model");
      }}
      onSubmit={model => {
        AddOrUpdate(model, addOrUpdate);
        console.log(model, "submittedmodel");
      }} >
      <MSCToolbar
        onAddButtonClick={() => { setAddOrUpdate(AddOrUpdateEnum.Add) }}
        filterSearch={setSearchText}
        headerName={t('Users')}
        updateButtonDisabled={selectedData ? ((Object.keys(selectedData)?.length > 0 ? false : true)) : true}
        onUpdateButtonClick={() => {
          UpdateButtonClick(selectedData, AddOrUpdateEnum.Update);
        }}
        SubmitComponnent={
          getViewModeEx === 3 ?
            <MSCButton title={'Delete'}
              onClick={() => { onDeleteButtonClick() }}
            /> : null}
        ReadComponnent={
          <div style={{ width: '100%' }}>
            <MSCReactTable
              selection
              columns={[
                { accessor: 'email', Header: 'Email' },
                { accessor: 'userDesc', Header: t('userDesc') },
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
            {/* Globalden gelen subid */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} lg={12} md={12}>
                {
                  getViewModeEx === 2 ?
                    <>
                      <HiddenField name={'subscriptionId'} value={'0'} />
                      <HiddenField name={'langType'} value={'TR'} />
                      <HiddenField name={'ustat'} value={''} />
                      {/* <HiddenField name={'validTo'} value={moment().format('YYYY-MM-DD')} /> */}
                      <HiddenField name={'validFrom'} value={moment().format('YYYY-MM-DD')} />
                      {/* <HiddenField name={'createTime'} value={moment().format('YYYY-MM-DD')} /> */}
                      <HiddenField name={'createUser'} value={user.data.displayName} />
                      {/* <HiddenField name={'changeTime'} value={moment().format('YYYY-MM-DD')} /> */}
                      <HiddenField name={'changeUser'} value={user.data.displayName} />
                    </> : null}
                <AutoLabelField name={'email'} label={t('Email')} disabled={addOrUpdate === "ADD" ? false : true} />
                <AutoLabelField name={'userDesc'} />
                <AutoLabelField name={'upass'} itemProps={{
                  type: 'password', InputProps: {
                    className: 'pr-2',
                    type: showPassword ? 'text' : 'password',
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} size="large">
                          <Icon className="text-20" color="action">
                            {showPassword ? 'visibility' : 'visibility_off'}
                          </Icon>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                }} />
                <MSCTextField label={t('upassR')} itemProps={{ type: showPassword ? 'text' : 'password' }} value={upassR}
                  onChange={(e) => setUpassR(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={12} lg={12} md={12}>
                <MSCTableField
                  name="userroles"
                  columns={[t('rolecode'), 'Email']}
                >
                  <GetUserRoles name={'$'} addOrUpdate={addOrUpdate} />
                </MSCTableField>
              </Grid>
            </Grid>
          </div>
        }
      />
      <ConfirmModal
        handleClose={() => { setShowDeleteModal(false) }}
        showModal={showDeleteModal}
        onYesButtonClick={() => onDeleteModalButtonClick(selectedData?.email, selectedData?.subscriptionId)}
      />
    </AutoForm>
  );
}

export default Users; 