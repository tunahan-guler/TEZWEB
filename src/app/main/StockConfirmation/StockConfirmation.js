import { useTranslation } from 'react-i18next';
import MSCToolbar, { ViewMode } from '../../../@mscComponnent/CRUDPage/MSCToolbar'
import {
  AutoField,
  AutoForm,
  HiddenField,
} from 'uniforms-material';
import { bridge as schema } from '../StockShipping/uniforms/StockTransferSchema';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getViewModeFunc, getViewMode, changeViewMode } from '../../store/mscToolbar/mscToolbarSlice'
import { AddOrUpdateEnum, useAddOrUpdateStockTransferHMutation, useGetStockTransferHsLazyQuery } from '../../../generated/graphql';
import AutoLabelField from '../../../@mscComponnent/UniformsComponnents/AutoLabelField';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import MSCTableField from '../../../@mscComponnent/UniformsComponnents/MSCTableField'
import GetStockTransferIs from './SubComponents/GetStockTransferIs';
import moment from 'moment';
import { showMessage } from '../../store/fuse/messageSlice'
import { MSCReactTable } from '../../../@mscComponnent/MSCReactTable/MSCReactTable';
import { GetRowAndColumn, MSCMessage } from '../../../@mscComponnent/Global/GlobalFunc'
import FuseLoading from '../../../@fuse/core/FuseLoading'
import MaterialUiGridComp from '../../../@mscComponnent/MaterialuiGrid/MaterialUiGridComp';
import MSCTextField from '../../../@mscComponnent/MSCInput/MSCTextField';
import MSCButton from '../../../@mscComponnent/Buttons/MSCButton';

function StockConfirmation() {
  const { t } = useTranslation();
  const getViewModeFuncEx = useSelector(getViewModeFunc);
  const dispatch = useDispatch();
  const [addOrUpdate, setAddOrUpdate] = useState(AddOrUpdateEnum.Add);
  const [rowData, setRowData] = useState({});
  const [addOrUpdateStockTransferH, { loading: loadingMutation }] = useAddOrUpdateStockTransferHMutation();
  const [searchText, setSearchText] = useState('')
  const [filterGlobal, setFilterGlobal] = useState();
  const [selectedData, setSelectedData] = useState({});
  const user = useSelector(({ auth }) => auth.user)
  const getViewModeEx = useSelector(getViewMode); // 18042022 
  const [filterParams, setFilterParams] = useState({
    companyname: "",
    subscriptionids: "",
    enddate: null,
    startdate: null
  })
  const [getStockTransferhsLazyQuery, { data, loading, error, refetch }] = useGetStockTransferHsLazyQuery();

  useEffect(() => {
    filterGlobal?.setGlobalFilter(searchText)
  }, [searchText]);

  const visibleColumns = ['subscriptionsidS', 'companyName', 'sendtime', 'tstat', 'explanationS']
  let gridData = GetRowAndColumn(data?.stocktransferhs, visibleColumns);

  const dataRow = React.useMemo(
    () => gridData.rows,
    [gridData?.rows?.length, data]
  )
  const AddOrUpdate = (model, addOrUpdateStatus) => {
    addOrUpdateStockTransferH({
      variables: {
        addOrUpdate: addOrUpdateStatus,
        prmStockTransferh: model
      }
    }).then(res => {
      console.log(res, "res");
      if (res.data.addOrUpdateStocktransferh.resultType === "SUC") {
        MSCMessage(dispatch, 'success', "Kaydedildi.")
        getViewModeFuncEx(ViewMode.Read)
        dispatch(changeViewMode(ViewMode.Read))
        refetch();
      } else {
        MSCMessage(dispatch, 'error', res.data.addOrUpdateStocktransferh.messageText);
      }
    })
      .catch(err => console.log(err, "err"))
  }

  const UpdateButtonClick = (prmRowData, addOrUpdateStatus) => {
    setSelectedData({ ...prmRowData, accepttime: new Date() });
    setAddOrUpdate(addOrUpdateStatus);
    getViewModeFuncEx(ViewMode.Update)
    dispatch(changeViewMode(ViewMode.Update))
  };

  if (loading) {
    return <FuseLoading />
  }

  const GetStockTransferhs = () => {
    getStockTransferhsLazyQuery({
      variables: {
        prmCompanyName: filterParams.companyname,
        prmSubscriptionIdR: user.data.subscriptionId,
        prmSubscriptionIdS: filterParams.subscriptionids,
        prmEndDate: filterParams.enddate,
        prmStartDate: filterParams.startdate
      }
    })
    setFilterParams({
      companyname: "",
      enddate: null,
      startdate: null,
      subscriptionids: ""
    })
  }

  return (
    <AutoForm
      schema={schema}
      model={{ ...selectedData }}
      onChangeModel={(model) => {
        setRowData(model);
      }}
      onSubmit={model => {
        delete model.subscription;
        if (model?.stocktransferis) {
          for (let i = 0; i < model?.stocktransferis?.length; i++) {
            delete model?.stocktransferis[i]?.__typename;
          }
        }
        console.log(model, "submitted");
        AddOrUpdate(model, addOrUpdate);
      }}  >
      <MSCToolbar
        filterSearch={setSearchText}
        headerName={t('StockConfirmation')}
        viewMode={ViewMode.Read}
        queryList={GetStockTransferhs}
        ReadModeHeaderComponnent={<>
          <MSCButton title={'Search'} onClick={() => {
            getViewModeFuncEx(ViewMode.Search)
            dispatch(changeViewMode(ViewMode.Search))
          }} />
          <MSCButton title={'Accept'}
            disabled={selectedData ? ((Object.keys(selectedData)?.length > 0 ? false : true)) : true}
            onClick={() => UpdateButtonClick(selectedData, AddOrUpdateEnum.Update)}
          />
        </>}
        ReadComponnent={
          <MSCReactTable
            selection
            columns={[
              { accessor: 'subscriptionsidS', Header: t('senderCode') },
              { accessor: 'companyName', Header: t('sender') },
              { accessor: (row) => { return moment(row.sendtime).format('DD-MM-YYYY HH:mm:ss') }, Header: t('sendTime') },
              { accessor: (row) => { if (row.tstat === "P") { return t('Pending') } }, Header: t('status') },
              { accessor: 'explanationS', Header: t('explanation') },
            ]}
            data={dataRow}
            SelectRowData={(e) => { setSelectedData(e) }}
            onRowClicked={e => {
              console.log(e.original, "eoriginal")
              DoubleRowClick(e.original, AddOrUpdateEnum.Update)
            }}
            globalFilterTable={(preGlobalFilteredRows, setGlobalFilter, globalFilter) => {
              setFilterGlobal({ ...filterGlobal, setGlobalFilter })
            }}
          />}
        SearchComponent={
          <MaterialUiGridComp
            children={[
              <MSCTextField label={t('invoiceno')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, invoiceno: e.target.value })} />,
              <MSCTextField label={t('eiNo')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, itemname: e.target.value })} />,
              <MSCTextField type={'date'} label={t('starttime')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, starttime: e.target.value })} />,
              <MSCTextField type={'date'} label={t('endtime')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, endtime: e.target.value })} />
            ]}
          />
        }
        CreateOrUpdateComponnent={
          <div>
            <HiddenField name="tstat" value={"C"} />
            <HiddenField name="emailR" value={user.data.email} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} lg={12} md={12}>
                <Card>
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={12} lg={6} md={6}>
                        <AutoLabelField name={'subscriptionsidS'} label={t('senderCode')} disabled />
                      </Grid>
                      <Grid item xs={12} sm={12} lg={6} md={6}>
                        <AutoLabelField name="subscription.companyName" disabled label={'sender'} />
                      </Grid>
                      <Grid item xs={12} sm={12} lg={6} md={6}>
                        <AutoLabelField name="sendtime" label={t('sendTime')} disabled itemProps={{
                          value: moment(selectedData?.sendtime).
                            format('DD-MM-YYYY')
                        }} />
                      </Grid>
                      <Grid item xs={12} sm={12} lg={12} md={12}>
                        <Grid container
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                          spacing={2}
                          style={{ padding: '2px' }}
                        >
                          <Grid item xs={2} sm={2} lg={2} md={2}>
                            <Typography mt={2}>
                              {t('senderexplanation')}
                            </Typography>
                          </Grid>
                          <Grid item xs={10} sm={10} lg={10} md={10}>
                            <AutoField size="small" label="" name={"explanationS"} disabled style={{ backgroundColor: '#E0E0E0' }} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} lg={12} md={12}>
                <Card >
                  <CardContent>
                    <Typography variant="h6">{t('stocks')}</Typography>
                    <MSCTableField
                      name="stocktransferis"
                      columns={[t('itemcode'), t('serialno'), t('batchno'), t('transqty'), t('unit'), t('Accept/Reject'), t('recipientexplanation')]}
                      disabled={true}
                    >
                      <GetStockTransferIs name={'$'} getViewModeEx={getViewModeEx} />
                    </MSCTableField>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} lg={12} md={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{t('recipientexplanation')}</Typography>
                    <AutoLabelField name={'explanationR'} label={t('recipientexplanation')} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        }
      />
    </AutoForm>
  );
}

export default StockConfirmation; 