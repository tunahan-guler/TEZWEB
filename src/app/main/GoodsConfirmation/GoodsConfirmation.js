import { useTranslation } from 'react-i18next';
import MSCToolbar, { ViewMode } from '../../../@mscComponnent/CRUDPage/MSCToolbar'
import { AutoForm, HiddenField } from 'uniforms-material';
import { bridge as schema } from './uniforms/GoodsConfirmationSchema';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { changeViewMode, getViewMode, getViewModeFunc } from '../../store/mscToolbar/mscToolbarSlice'
import { AddOrUpdateEnum, useAddOrUpdateGoodsReceivinghMutateMutation, useGetGoodsReceivinghLazyQuery, useGetGoodsReceivinghQuery } from '../../../generated/graphql';
import AutoLabelField from '../../../@mscComponnent/UniformsComponnents/AutoLabelField';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import MSCTableField from '../../../@mscComponnent/UniformsComponnents/MSCTableField'
import moment from 'moment';
import { MSCReactTable } from '../../../@mscComponnent/MSCReactTable/MSCReactTable';
import { GetRowAndColumn, MSCMessage } from '../../../@mscComponnent/Global/GlobalFunc'
import GetGoodsReceivingIs from './SubComponents/GetGoodsReceivingIs';
import FuseLoading from '../../../@fuse/core/FuseLoading'
import MaterialUiGridComp from '../../../@mscComponnent/MaterialuiGrid/MaterialUiGridComp';
import MSCTextField from '../../../@mscComponnent/MSCInput/MSCTextField';
import MSCButton from '../../../@mscComponnent/Buttons/MSCButton';

function GoodsConfirmation() {
  const { t } = useTranslation();
  const getViewModeFuncEx = useSelector(getViewModeFunc);
  const dispatch = useDispatch();
  const [addOrUpdate, setAddOrUpdate] = useState(AddOrUpdateEnum.Add);
  const [rowData, setRowData] = useState({});
  const getViewModeEx = useSelector(getViewMode); // 18042022 
  const [addOrUpdateGoodsReceivinghMutateMutation, { loading: loadingMutation }] = useAddOrUpdateGoodsReceivinghMutateMutation();
  const [searchText, setSearchText] = useState('')
  const [filterGlobal, setFilterGlobal] = useState();
  const [selectedData, setSelectedData] = useState({});
  const user = useSelector(({ auth }) => auth.user);;
  const [filterParams, setFilterParams] = useState({
    deliverynoteno: 0,
    startdate: null,
    enddate: null,
  });
  const [getGoodsReceivingLazyQuery, { data, loading, refetch }] = useGetGoodsReceivinghLazyQuery();

  useEffect(() => {
    filterGlobal?.setGlobalFilter(searchText)
  }, [searchText]);

  const visibleColumns = ['subscriptionsidR', 'companyName', 'sendtime', 'rstat', 'explanationR']
  let gridData = GetRowAndColumn(data?.goodsreceivinghs, visibleColumns);

  const dataRow = React.useMemo(
    () => gridData.rows,
    [gridData?.rows?.length, data]
  )

  const AddOrUpdate = (model, addOrUpdateStatus) => {
    addOrUpdateGoodsReceivinghMutateMutation({
      variables: {
        addOrUpdate: addOrUpdateStatus,
        prmGoodsReceivingh: model
      }
    }).then(res => {
      console.log(res, "res");
      if (res.data.addOrUpdateStockGoodsReceivingh.resultType === "SUC") {
        MSCMessage(dispatch, 'success', "Kaydedildi.")
        getViewModeFuncEx(ViewMode.Read)
        dispatch(changeViewMode(ViewMode.Read))
        refetch();
      } else {
        MSCMessage(dispatch, 'error', "Hata Oluştu.");
      }
    })
      .catch(err => console.log(err, "err"))
  }

  const UpdateButtonClick = (prmRowData, addOrUpdateStatus) => {
    setSelectedData({ ...prmRowData, receivingtime: new Date() });
    setAddOrUpdate(addOrUpdateStatus);
    getViewModeFuncEx(ViewMode.Update)
    dispatch(changeViewMode(ViewMode.Update))
  };

  if (loading || loadingMutation) {
    return <FuseLoading />
  }

  const GetGoodsReceiving = () => {
    getGoodsReceivingLazyQuery({
      variables: {
        prmSubscriptionIdR: user.data.subscriptionId,
        prmDeliveryNoteNo: filterParams.deliverynoteno,
        prmEndDate: filterParams.enddate,
        prmStartDate: filterParams.startdate
      }
    })
    setFilterParams({
      deliverynoteno: 0,
      enddate: null,
      startdate: null
    })
  }

  return (
    <AutoForm
      schema={schema}
      model={{ ...selectedData }}
      onChangeModel={(model) => {
        setRowData(model);
        console.log(model, "modell")
      }}
      onSubmit={model => {
        delete model.subscription;
        if (model?.goodsreceivingis) {
          for (let i = 0; i < model?.goodsreceivingis?.length; i++) {
            delete model?.goodsreceivingis[i]?.__typename;
          }
        }
        console.log(model, "submitted");
        AddOrUpdate(model, addOrUpdate);
      }}  >
      <MSCToolbar
        filterSearch={setSearchText}
        headerName={t('GoodsConfirmation')}
        viewMode={ViewMode.Read}
        queryList={GetGoodsReceiving}
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
        ReadComponnent={<MSCReactTable
          selection
          columns={[
            { accessor: 'deliverynoteno', Header: t('deliverynoteno') },
            { accessor: (row) => { return moment(row.shipmenttime).format('DD-MM-YYYY HH:MM') }, Header: t('shipmenttime') },
            { accessor: (row) => { if (row.rstat === "P") { return t('Pending') } }, Header: t('status') },
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
              <MSCTextField label={t('deliverynoteno')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, deliverynoteno: e.target.value })} />,
              <MSCTextField type={'date'} label={t('starttime')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, startdate: e.target.value })} />,
              <MSCTextField type={'date'} label={t('endtime')} fullWidth onChange={(e) => setFilterParams({ ...filterParams, enddate: e.target.value })} />
            ]}
          />
        }
        CreateOrUpdateComponnent={
          <div>
            {/* HiddenFields */}
            <HiddenField name="subscriptionsidR" value={rowData?.subscription?.subscriptionsId} />
            {/* Globalden gelecek reduxtan */}
            {/* <HiddenField name="shipmenttime" value={moment().format("HH:MM")} /> */}
            <HiddenField name="rstat" value={"C"} />
            {/* <HiddenField name="receivingtime" value={moment().format("HH:MM")} /> */}
            <HiddenField name="emailR" value={user.data.email} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} lg={12} md={12}>
                <Card>
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={12} lg={6} md={6}>
                        <AutoLabelField name={'deliverynoteno'} label={t('deliverynoteno')} disabled />
                      </Grid>
                      <Grid item xs={12} sm={12} lg={6} md={6}>
                        <AutoLabelField name="shipmenttime" label={t('shipmenttime')} disabled
                          itemProps={{ value: moment(rowData.shipmenttime).format('DD-MM-YYYY') }} />
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
                      name="goodsreceivingis"
                      columns={[t('itemcode'), t('serialno'), t('batchno'), t('transqty'), t('unit'), t('Accept/Reject'), t('explanation')]}
                      disabled={true}
                    >
                      <GetGoodsReceivingIs name={'$'} getViewModeEx={getViewModeEx} />
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

export default GoodsConfirmation; 